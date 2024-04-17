import { BrotherArgs } from "./types";

export const generatePrintUri = (args: BrotherArgs): URL => {
  const searchParams = convertArgsToSearchParams(args);
  return new URL(`brotherwebprint://print?${searchParams.toString()}`);
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
