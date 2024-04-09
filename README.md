# Brother Smooth Print URI Generator

This is a simple URI generator for printing using the Brother Smooth Print app.

Learn more about Brother Smooth Print [here](https://support.brother.com/g/s/es/dev/en/specific/smooth_print/index.html).

## Usage

```typescript
import { generatePrintUri } from "brother-smooth-print-uri";

const uri = generatePrintUri({
  /* TODO */
});
```

This package only creates the URI, it does not initiate the actual print job.
