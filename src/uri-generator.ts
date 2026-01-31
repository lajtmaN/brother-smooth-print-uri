import { BrotherArgs } from "./types";

/**
 * Type guard to check if filename is present
 */
const hasFilename = (args: BrotherArgs): args is BrotherArgs & { filename: string } => {
  return 'filename' in args && typeof args.filename === 'string';
};

/**
 * Type guard to check if fileattach is present
 */
const hasFileattach = (args: BrotherArgs): args is BrotherArgs & { fileattach: string } => {
  return 'fileattach' in args && typeof args.fileattach === 'string';
};

/**
 * Type guard to check if size is present
 */
const hasSize = (args: BrotherArgs): args is BrotherArgs & { size: string } => {
  return 'size' in args && typeof args.size === 'string';
};

/**
 * Type guard to check if sizeattach is present
 */
const hasSizeattach = (args: BrotherArgs): args is BrotherArgs & { sizeattach: string } => {
  return 'sizeattach' in args && typeof args.sizeattach === 'string';
};

export const generatePrintUri = (args: BrotherArgs): URL => {
  validateArgs(args);
  const searchParams = convertArgsToSearchParams(args);
  return new URL(`brotherwebprint://print?${searchParams.toString()}`);
};

const validateArgs: (args: BrotherArgs) => asserts args is BrotherArgs = (args) => {
  // Validate filename/fileattach using type guards
  const hasFile = hasFilename(args);
  const hasAttach = hasFileattach(args);
  
  if (!hasFile && !hasAttach) {
    throw new Error("Either 'filename' or 'fileattach' must be provided");
  }
  if (hasFile && hasAttach) {
    throw new Error("Only one of 'filename' or 'fileattach' can be provided, not both");
  }
  
  // Validate size/sizeattach using type guards
  const hasSizeParam = hasSize(args);
  const hasSizeAttach = hasSizeattach(args);
  
  if (!hasSizeParam && !hasSizeAttach) {
    throw new Error("Either 'size' or 'sizeattach' must be provided");
  }
  if (hasSizeParam && hasSizeAttach) {
    throw new Error("Only one of 'size' or 'sizeattach' can be provided, not both");
  }
};

const convertArgsToSearchParams = (args: BrotherArgs): URLSearchParams => {
  const searchParams = new URLSearchParams();

  let property: keyof typeof args;
  for (property in args) {
    const value = convertValueToString(args[property]);
    if (value) {
      searchParams.append(property, value);
    }
  }

  return searchParams;
};

const convertValueToString = (
  value: BrotherArgs[keyof BrotherArgs]
): string | null => {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
      return value.toString();
    case "boolean":
      return value ? "1" : "0";
    case "undefined":
      return null;
    default:
      throw new Error(`Unsupported type: ${typeof value}`);
  }
};
