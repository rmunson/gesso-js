gesso.js
========
Canvas and canvas context wrapper.  Supplies a chainable api of canvas methods, and command grouping.

## Basic Usage

```
	var gtx=new gesso(document.createElement('canvas'));

	gtx.beginPath()
		.miterLimit(10)
		.line({
			cap: "round",
			join: "miter"
		})
		.shadowColor("transparent")
		.moveTo(0, 0)
		.line({
			to: [20, 20],
			width: 40
		});
```