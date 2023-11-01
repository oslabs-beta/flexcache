const Splitter = require('./splitter');

function getDefaultSettings() {
	return {
		compare: 'lines', // lines|words|chars
		ignoreWhitespace: false,
		ignoreCase: false,
		ignoreAccents: false
	};
}

/**
 * Encodes text into diff-codes to prepare for Myers diff.
 */
class Encoder {
	constructor() {
		this.code = 0;
		this.diff_codes = {};
	}

	encode(text, settings) {
		return new EncodeContext(this, text, settings);
	}

	getCode(line) {
		if (this.diff_codes[line]) {
			return this.diff_codes[line];
		}
		this.code = this.code + 1;
		this.diff_codes[line] = this.code;
		return this.code;
	}
}

/**
 * Encoder context
 */
class EncodeContext {
	constructor(encoder, text, options) {
		let re;
		if (text) {
			if (options.compare === 'chars') {
				// split all chars
				re = '';
			} else if (options.compare === 'words') {
				// split all of the text on spaces
				re = ' ';
			} else { // lines (default)
				re = '\n';
			}
		}

		this.encoder = encoder;
		this._codes = {};
		this._modified = {};
		this._parts = [];

		let count = 0;
		const split = new Splitter(text, re);
		let part;
		while ((part = split.next()) !== null) {
			let line = part.text;
			if (options.ignoreWhitespace) {
				line = line.replace(/\s+/g, '');
			}
			if (options.ignoreCase) {
				line = line.toLowerCase();
			}
			if (options.ignoreAccents) {
				line = line.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			}
			const aCode = encoder.getCode(line);
			this._codes[count] = aCode;
			this._parts.push(part);
			count += 1;
		}
	}

	finish() {
		delete this.encoder;
	}

	get codes() {
		return this._codes;
	}

	get length() {
		return Object.keys(this._codes).length;
	}

	get modified() {
		return this._modified;
	}
}

class Myers {
	static compareLCS(lhsCtx, rhsCtx, callback) {
		let lhsStart = 0;
		let rhsStart = 0;
		let lhsLine = 0;
		let rhsLine = 0;

		while (lhsLine < lhsCtx.length || rhsLine < rhsCtx.length) {
			if ((lhsLine < lhsCtx.length) && (!lhsCtx.modified[lhsLine])
				&& (rhsLine < rhsCtx.length) && (!rhsCtx.modified[rhsLine])) {
				// equal lines
				lhsLine++;
				rhsLine++;
			}
			else {
				// maybe deleted and/or inserted lines
				lhsStart = lhsLine;
				rhsStart = rhsLine;
				while ((lhsLine < lhsCtx.length)
					&& (rhsLine >= rhsCtx.length || lhsCtx.modified[lhsLine])) {
					lhsLine++;
				}
				while ((rhsLine < rhsCtx.length)
					&& (lhsLine >= lhsCtx.length || rhsCtx.modified[rhsLine])) {
					rhsLine++;
				}
				// istanbul ignore else
				if ((lhsStart < lhsLine) || (rhsStart < rhsLine)) {
					const lat = Math.min(lhsStart, (lhsCtx.length) ? lhsCtx.length - 1 : 0);
					const rat = Math.min(rhsStart, (rhsCtx.length) ? rhsCtx.length - 1 : 0);
					const lpart = lhsCtx._parts[Math.min(lhsStart, lhsCtx.length - 1)];
					const rpart = rhsCtx._parts[Math.min(rhsStart, rhsCtx.length - 1)];

					const item = {
						lhs: {
							at: lat,
							del: lhsLine - lhsStart,
							pos: lpart ? lpart.pos : null,
							text: lpart ? lpart.text : null
						},
						rhs: {
							at: rat,
							add: rhsLine - rhsStart,
							pos: rpart ? rpart.pos : null,
							text: rpart ? rpart.text : null
						}
					};
					callback(item);
				}
			}
		}
	}

	static getShortestMiddleSnake(
		lhsCtx, lhsLower, lhsUpper,
		rhsCtx, rhsLower, rhsUpper,
		vectorU, vectorD
	) {
		const max = lhsCtx.length + rhsCtx.length + 1;
		// istanbul ignore next
		if (max === undefined) {
			throw new Error('unexpected state');
		}
		let kdown = lhsLower - rhsLower,
			kup = lhsUpper - rhsUpper,
			delta = (lhsUpper - lhsLower) - (rhsUpper - rhsLower),
			odd = (delta & 1) != 0,
			offset_down = max - kdown,
			offset_up = max - kup,
			maxd = ((lhsUpper - lhsLower + rhsUpper - rhsLower) / 2) + 1,
			ret = {x:0, y:0}, d, k, x, y;

		vectorD[offset_down + kdown + 1] = lhsLower;
		vectorU[offset_up + kup - 1] = lhsUpper;
		for (d = 0; d <= maxd; ++d) {
			for (k = kdown - d; k <= kdown + d; k += 2) {
				if (k === kdown - d) {
					x = vectorD[offset_down + k + 1];//down
				}
				else {
					x = vectorD[offset_down + k - 1] + 1;//right
					if ((k < (kdown + d)) && (vectorD[offset_down + k + 1] >= x)) {
						x = vectorD[offset_down + k + 1];//down
					}
				}
				y = x - k;
				// find the end of the furthest reaching forward D-path in diagonal k.
				while ((x < lhsUpper)
					&& (y < rhsUpper)
					&& (lhsCtx.codes[x] === rhsCtx.codes[y])
				) {
					x++; y++;
				}
				vectorD[ offset_down + k ] = x;
				// overlap ?
				if (odd && (kup - d < k) && (k < kup + d)) {
					if (vectorU[offset_up + k] <= vectorD[offset_down + k]) {
						ret.x = vectorD[offset_down + k];
						ret.y = vectorD[offset_down + k] - k;
						return (ret);
					}
				}
			}
			// Extend the reverse path.
			for (k = kup - d; k <= kup + d; k += 2) {
				// find the only or better starting point
				if (k === kup + d) {
					x = vectorU[offset_up + k - 1]; // up
				} else {
					x = vectorU[offset_up + k + 1] - 1; // left
					if ((k > kup - d) && (vectorU[offset_up + k - 1] < x))
						x = vectorU[offset_up + k - 1]; // up
				}
				y = x - k;
				while ((x > lhsLower)
					&& (y > rhsLower)
					&& (lhsCtx.codes[x - 1] === rhsCtx.codes[y - 1])
				) {
					// diagonal
					x--;
					y--;
				}
				vectorU[offset_up + k] = x;
				// overlap ?
				if (!odd && (kdown - d <= k) && (k <= kdown + d)) {
					if (vectorU[offset_up + k] <= vectorD[offset_down + k]) {
						ret.x = vectorD[offset_down + k];
						ret.y = vectorD[offset_down + k] - k;
						return (ret);
					}
				}
			}
		}
		// should never get to this state
		// istanbul ignore next
		throw new Error('unexpected state');
	}

	static getLongestCommonSubsequence(
		lhsCtx, lhsLower, lhsUpper,
		rhsCtx, rhsLower, rhsUpper,
		vectorU = [], vectorD = []
	) {
		// trim off the matching items at the beginning
		while ( (lhsLower < lhsUpper)
			&& (rhsLower < rhsUpper)
			&& (lhsCtx.codes[lhsLower] === rhsCtx.codes[rhsLower]) ) {
			++lhsLower;
			++rhsLower;
		}
		// trim off the matching items at the end
		while ( (lhsLower < lhsUpper)
			&& (rhsLower < rhsUpper)
			&& (lhsCtx.codes[lhsUpper - 1] === rhsCtx.codes[rhsUpper - 1]) ) {
			--lhsUpper;
			--rhsUpper;
		}
		if (lhsLower === lhsUpper) {
			while (rhsLower < rhsUpper) {
				rhsCtx.modified[rhsLower++] = true;
			}
		}
		else if (rhsLower === rhsUpper) {
			while (lhsLower < lhsUpper) {
				lhsCtx.modified[lhsLower++] = true;
			}
		}
		else {
			const { x, y } = Myers.getShortestMiddleSnake(
				lhsCtx, lhsLower, lhsUpper,
				rhsCtx, rhsLower, rhsUpper, 
				vectorU, vectorD);
			Myers.getLongestCommonSubsequence(
				lhsCtx, lhsLower, x, 
				rhsCtx, rhsLower, y,
				vectorU, vectorD);
			Myers.getLongestCommonSubsequence(
				lhsCtx, x, lhsUpper,
				rhsCtx, y, rhsUpper,
				vectorU, vectorD);
		}
	}

	/**
	 * Compare {@code lhs} to {@code rhs}.  Changes are compared from left
	 * to right such that items are deleted from left, or added to right,
	 * or just otherwise changed between them.
	 * 
	 * @param   {string} lhs - The left-hand source text.
	 * @param   {string} rhs - The right-hand source text.
	 * @param   {object} [options={}] - Optional settings.
	 */
	static diff(lhs, rhs, options = {}) {
		const settings = getDefaultSettings();
		const encoder = new Encoder();

		if (lhs === undefined) {
			throw new Error('illegal argument \'lhs\'');
		}
		if (rhs === undefined) {
			throw new Error('illegal argument \'rhs\'');
		}

		Object.assign(settings, options);

		const lhsCtx = encoder.encode(lhs, settings);
		const rhsCtx = encoder.encode(rhs, settings);

		// Myers.LCS(lhsCtx, rhsCtx);

		Myers.getLongestCommonSubsequence(
			lhsCtx,
			0,
			lhsCtx.length,
			rhsCtx,
			0,
			rhsCtx.length
		);

		// compare lhs/rhs codes and build a list of comparisons
		const changes = [];
		const compare = (options.compare === 'chars') ? 0 : 1;

		Myers.compareLCS(lhsCtx, rhsCtx, function _changeItem(item) {
			// add context information
			item.lhs.getPart = (n) => lhsCtx._parts[n];
			item.rhs.getPart = (n) => rhsCtx._parts[n];
			if (compare === 0) {
				item.lhs.length = item.lhs.del;
				item.rhs.length = item.rhs.add;
			} else {
				// words and lines
				item.lhs.length = 0;
				if (item.lhs.del) {
					// get the index of the second-last item being deleted,
					// plus its length, minus the start pos.
					const i = item.lhs.at + item.lhs.del - 1;
					const part = lhsCtx._parts[i];
					item.lhs.length = part.pos + part.text.length
						- lhsCtx._parts[item.lhs.at].pos;
				}

				item.rhs.length = 0;
				if (item.rhs.add) {
					// get the index of the second-last item being added,
					// plus its length, minus the start pos.
					const i = item.rhs.at + item.rhs.add - 1;
					const part = rhsCtx._parts[i];
					item.rhs.length = part.pos + part.text.length
						- rhsCtx._parts[item.rhs.at].pos;
				}
			}
			changes.push(item);
		});

		lhsCtx.finish();
		rhsCtx.finish();

		return changes;
	}
}

module.exports = Myers;
