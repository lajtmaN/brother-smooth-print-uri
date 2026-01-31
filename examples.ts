import { generatePrintUri } from "./src";

// ✅ Valid: filename + size
const example1 = generatePrintUri({
  filename: "https://example.com/Simple.lbx",
  size: "https://example.com/26x76.bin",
});

// ✅ Valid: filename + sizeattach
const example2 = generatePrintUri({
  filename: "https://example.com/Simple.lbx",
  sizeattach: "base64EncodedBinData",
});

// ✅ Valid: fileattach + size
const example3 = generatePrintUri({
  fileattach: "base64EncodedLbxData",
  size: "https://example.com/26x76.bin",
});

// ✅ Valid: fileattach + sizeattach
const example4 = generatePrintUri({
  fileattach: "base64EncodedLbxData",
  sizeattach: "base64EncodedBinData",
  copies: 2,
  rotate180: true,
});

// ❌ TypeScript Error: Cannot provide both filename and fileattach
// @ts-expect-error
const invalid1 = generatePrintUri({
  filename: "https://example.com/Simple.lbx",
  fileattach: "base64data",
  size: "https://example.com/26x76.bin",
});

// ❌ TypeScript Error: Cannot provide both size and sizeattach
// @ts-expect-error
const invalid2 = generatePrintUri({
  filename: "https://example.com/Simple.lbx",
  size: "https://example.com/26x76.bin",
  sizeattach: "base64data",
});

// ❌ TypeScript Error: Must provide either filename or fileattach
// @ts-expect-error
const invalid3 = generatePrintUri({
  size: "https://example.com/26x76.bin",
});

// ❌ TypeScript Error: Must provide either size or sizeattach
// @ts-expect-error
const invalid4 = generatePrintUri({
  filename: "https://example.com/Simple.lbx",
});
