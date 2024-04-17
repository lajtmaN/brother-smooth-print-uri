# Brother Smooth Print URI Generator

This is a simple URI generator for printing using the Brother Smooth Print app.

Learn more about Brother Smooth Print [here](https://support.brother.com/g/s/es/dev/en/specific/smooth_print/index.html).

## Usage

```typescript
import { generatePrintUri } from "brother-smooth-print-uri";

const uri = generatePrintUri({
  filename: "https://example.com/Simple.lbx",
  size: "https://example.com/26x76.bin",
});
```

See more examples in the tests: [src/uri-generator.test.ts](src/uri-generator.test.ts).

This package only creates the URI, it does not initiate the actual print job.

## Limitations

- It doesn't include all parameters.
- It only supports single layout printing.
- Does not describe which printer series supports what.

Feel free to contribute.
