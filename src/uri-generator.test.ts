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
});
