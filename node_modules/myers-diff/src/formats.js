// NormalFormat
// http://www.gnu.org/software/diffutils/manual/html_node/Example-Normal.html#Example-Normal
function GnuNormalFormat(change) {
	const nf = [];
	const str = [];

	// del add description
	// 0   >0  added count to rhs
	// >0  0   deleted count from lhs
	// >0  >0  changed count lines
	let op;
	if (change.lhs.del === 0 && change.rhs.add > 0) {
		op = 'a';
	}
	else if (change.lhs.del > 0 && change.rhs.add === 0) {
		op = 'd';
	}
	else {
		op = 'c';
	}

	function encodeSide(side, key) {
		// encode side as a start,stop if a range
		str.push(side.at + 1);
		if (side[key] > 1) {
			str.push(',');
			str.push(side[key] + side.at);
		}
	}
	encodeSide(change.lhs, 'del');
	str.push(op);
	encodeSide(change.rhs, 'add');

	nf.push(str.join(''));
	for (let i = change.lhs.at; i < change.lhs.at + change.lhs.del; ++i) {
		nf.push('< ' + change.lhs.getPart(i).text);
	}
	if (change.rhs.add && change.lhs.del) {
		nf.push('---');
	}
	for (let i = change.rhs.at; i < change.rhs.at + change.rhs.add; ++i) {
		nf.push('> ' + change.rhs.getPart(i).text);
	}
	return nf.join('\n');
}

var formats = {
	GnuNormalFormat: function (changes) {
		var i, out = [];
		for (i = 0; i < changes.length; ++i) {
			out.push(GnuNormalFormat(changes[i]));
		}
		return out.join('\n');
	}
}

module.exports = formats;
