# Changes

## 2.0.1
* patch: removed superfluous newline from the GNU normal format

## 2.0.0
Major interface change.

* major: changed minimum version to Node.js 10.x
* major: changed main exported interface
* major: no longer building browser bundled source
* major: dropped bower support
* major: added `getPart` to lhs/rhs change items for easier access (than `ctx`).
* major: removed `ctx` from lhs/rhs change items (this is now not part of the public interface).
* minor: added `changed` function for easier comparison
* minor: lhs/rhs items now have `pos`, `text`, and `length`
* chore: updated dependencies
* chore: updated documenation

## 1.x
Initial release.
