import { BrotherArgs } from './types';
import { generatePrintUri } from "./uri-generator";

describe("generatePrintUri", () => {
  const generateTestUri = (
    args: Partial<Parameters<typeof generatePrintUri>[0]>
  ) => {
    return generatePrintUri({
      filename: "https://example.com/Simple.lbx",
      size: "https://example.com/26x76.bin",
      ...args,
    } as BrotherArgs);
  };

  test("should return a minimal URL with the correct protocol and template", () => {
    const result = generateTestUri({
      filename: "https://example.com/Simple.lbx",
      size: "https://example.com/26x76.bin",
    });

    expect(result.protocol).toBe("brotherwebprint:");
    expect(result.host).toBe("print");
    expect(result.searchParams.get("filename")).toBe(
      "https://example.com/Simple.lbx"
    );
    expect(result.searchParams.get("size")).toBe(
      "https://example.com/26x76.bin"
    );
    expect(result.toString()).toBe(
      "brotherwebprint://print?filename=https%3A%2F%2Fexample.com%2FSimple.lbx&size=https%3A%2F%2Fexample.com%2F26x76.bin"
    );
  });

  test("should convert truthy boolean arguments to 1", () => {
    const result = generateTestUri({ rotate180: true });
    expect(result.searchParams.get("rotate180")).toBe("1");
  });

  test("should convert falsy boolean arguments to 0", () => {
    const result = generateTestUri({ rotate180: false });
    expect(result.searchParams.get("rotate180")).toBe("0");
  });

  test("should convert number arguments to string", () => {
    const result = generateTestUri({ copies: 2 });
    expect(result.searchParams.get("copies")).toBe("2");
  });

  test("should ignore undefined arguments", () => {
    const result = generateTestUri({ copies: undefined });
    expect(result.searchParams.has("copies")).toBe(false);
  });

  describe("validation", () => {
    describe("filename/fileattach validation", () => {
      test("should throw error when neither filename nor fileattach is provided", () => {
        expect(() => {
          generatePrintUri({
            size: "https://example.com/26x76.bin",
          } as unknown as BrotherArgs);
        }).toThrow("Either 'filename' or 'fileattach' must be provided");
      });

      test("should throw error when both filename and fileattach are provided", () => {
        expect(() => {
          generatePrintUri({
            filename: "https://example.com/Simple.lbx",
            fileattach: "base64data",
            size: "https://example.com/26x76.bin",
          } as unknown as BrotherArgs);
        }).toThrow("Only one of 'filename' or 'fileattach' can be provided, not both");
      });
    });

    describe("size/sizeattach validation", () => {
      test("should throw error when neither size nor sizeattach is provided", () => {
        expect(() => {
          generatePrintUri({
            filename: "https://example.com/Simple.lbx",
          } as unknown as BrotherArgs);
        }).toThrow("Either 'size' or 'sizeattach' must be provided");
      });

      test("should throw error when both size and sizeattach are provided", () => {
        expect(() => {
          generatePrintUri({
            filename: "https://example.com/Simple.lbx",
            size: "https://example.com/26x76.bin",
            sizeattach: "base64data",
          } as unknown as BrotherArgs);
        }).toThrow("Only one of 'size' or 'sizeattach' can be provided, not both");
      });
    });

    describe("valid combinations", () => {
      test("should accept filename + size", () => {
        expect(() => {
          generatePrintUri({
            filename: "https://example.com/Simple.lbx",
            size: "https://example.com/26x76.bin",
          });
        }).not.toThrow();
      });

      test("should accept filename + sizeattach", () => {
        expect(() => {
          generatePrintUri({
            filename: "https://example.com/Simple.lbx",
            sizeattach: "base64EncodedBinData",
          });
        }).not.toThrow();
      });

      test("should accept fileattach + size", () => {
        expect(() => {
          generatePrintUri({
            fileattach: "base64EncodedLbxData",
            size: "https://example.com/26x76.bin",
          });
        }).not.toThrow();
      });

      test("should accept fileattach + sizeattach", () => {
        expect(() => {
          generatePrintUri({
            fileattach: "base64EncodedLbxData",
            sizeattach: "base64EncodedBinData",
          });
        }).not.toThrow();
      });
    });
  });
});
