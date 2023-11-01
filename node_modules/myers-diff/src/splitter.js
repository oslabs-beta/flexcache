/**
 * Text splitter that also returns character position.  Functionally
 * equivalent to string.split, but faster.
 * @param {string} text - The text to split.
 * @param {string} ch - The character on which to split.
 * @returns A splitter that can be used to iteratively call `next()` for
 * each part.
 */
function Splitter(text, ch) {
	let start = 0;
	let pos = ch ? text.indexOf(ch) : 0;
	return {
		/**
		 * Returns the next split.
		 * @returns The text an character index of the split `{ text, pos }`,
		 * or `null` when done.
		 */
		next: function _split() {
			if (text.length === 0) {
				return null;
			} else if (!ch) {
				if (start >= text.length) {
					return null;
				}
				let ptext;
				if (Array.isArray(text)) {
					ptext = text[start];
				} else {
					ptext = text.charAt(start);
				}
				const part = {
					text: ptext,
					pos: start
				};
				start += 1;
				return part;
			} else if (pos < 0) {
				// handle remaining text.  the `start` might be at some
				// position less than `text.length`.  it may also be _exactly_
				// `text.length` if the `text` ends with a double `ch`, e.g.
				// "\n\n", the `start` is set to `pos + 1` below, which is one
				// after the first "\n" of the pair.  it would also be split.
				if (start <= text.length) {
					let ptext;
					if (Array.isArray(text)) {
						ptext = text.slice(start)
					} else {
						ptext = text.substr(start)
					}

					const part = {
						text: ptext,
						pos: start
					};
					pos = -1;
					start = text.length + 1;
					return part;
				} else {
					return null;
				}
			}
			const end = pos - start;
			const word = text.substr(start, end);
			const part = {
				text: word,
				pos: start
			};
			start = pos + 1;
			pos = text.indexOf(ch, start);
			return part;
		}
	}
}

module.exports = Splitter;
