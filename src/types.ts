/**
 * Base interface for Brother Smooth Print arguments as defined here: https://support.brother.com/g/s/es/dev/en/specific/smooth_print/index.html?c=eu_ot&lang=en&comple=on&redirect=on
 */
export interface BrotherArgsBase {
  /**
   * Single layout template file (.lbx)
   * Required unless fileattach is provided. Exactly one of filename or fileattach must be provided.
   * @example https://example.com/Simple.lbx
   */
  filename?: string;
  /**
   * Media settings file (bin)
   * Required unless sizeattach is provided. Exactly one of size or sizeattach must be provided.
   * @example https://example.com/26x76.bin
   */
  size?: string;

  /**
   * Number of copies to print
   * @example 1
   * @default 1
   */
  copies?: number;
  /**
   * Set one of the following options:
   * threshold (Binary)
   * pattern_dither (Dither)
   * error_difusion (Error Diffusion)
   * @default pattern_dither
   */
  halftone?: "threshold" | "pattern_dither" | "error_diffusion";
  /**
   * Set the brightness between -5 (light) and 5 (dark).
   * @default 0
   */
  rjDensity?: -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * Rotate the printed image 180 degrees.
   * @default false
   */
  rotate180?: boolean;
  /**
   * Automatically peel labels while printing.
   * @default false
   */
  peelMode?: boolean;
  /**
   * Set one of the following options:
   * normal = higher quality, but slower printing.
   * double_speed = lower quality, but faster printing.
   * @default normal
   */
  printQuality?: "normal" | "double_speed";
  /**
   * Set the paper orientation
   * Defaults to the settings in the LBX file.
   * @default landscape
   */
  orientation?: "portrait" | "landscape";
  /**
   * Set one of the print sizes:
   * original = actual print size
   * fit_to_page = adjust to the page size
   * scale = increase or decrease the print ratio
   * fit_to_paper = adjust the paper size
   * @default fit_to_page
   */
  printMode?: "original" | "fit_to_page" | "scale" | "fit_to_paper";
  /**
   * Set a numeric value to scale the print out.
   * Valid when printMode is set to "scale"
   * Set 1 or less for PDF printing
   * @default 1
   */
  scaleValue?: number;
  /**
   * Type an object name you specified for the text in P-touch Editor.
   * (single layout)
   *
   * For "text_object_name" and "barcode_object_name", type the name you assigned to the text
   * or barcode specified in the P-touch Editor layout file.
   * For example, if you want to print a text string with the object name "TEXT",
   * the parameter name must be "text_TEXT".
   */
  text_object_name?: string;
  /**
   * Type an object name you specified for the barcode in P-touch Editor.
   * (single layout)
   *
   * For "text_object_name" and "barcode_object_name", type the name you assigned to the text
   * or barcode specified in the P-touch Editor layout file.
   * For example, if you want to print a text string with the object name "TEXT",
   * the parameter name must be "text_TEXT".
   */
  barcode_object_name?: string;
  /**
   * Type an object name you specified for the image in P-touch Editor.
   * (single layout)
   * Supported format: jpg, jpeg, bmp, png
   */
  image_object_name?: string;
  /**
   * Set the base64 data as a print file to attach to a URL scheme.
   * (single layout)
   * Required unless filename is provided. Exactly one of filename or fileattach must be provided.
   */
  fileattach?: string;
  /**
   * Set the base64 data as a media information file to attach to a URL scheme.
   * Required unless size is provided. Exactly one of size or sizeattach must be provided.
   */
  sizeattach?: string;
  /**
   * Update and save files.
   * @default false
   */
  formatarchiveupdate?: boolean;
  /**
   * Set a value (in pixels) to extend the length of the print area.
   * When "formatarchiveupdate" is set to 1 (=On) and the attached file name is the same as the name of the existing file, newer files will overwrite the existing files.
   * @default false
   */
  forceStretchPrintableArea?: boolean;
}

/**
 * Helper type for file source - exactly one of filename or fileattach
 */
type FileSource = 
  | (Required<Pick<BrotherArgsBase, 'filename'>> & { fileattach?: never })
  | (Required<Pick<BrotherArgsBase, 'fileattach'>> & { filename?: never });

/**
 * Helper type for size source - exactly one of size or sizeattach
 */
type SizeSource = 
  | (Required<Pick<BrotherArgsBase, 'size'>> & { sizeattach?: never })
  | (Required<Pick<BrotherArgsBase, 'sizeattach'>> & { size?: never });

/**
 * Brother Smooth Print arguments with exactly one of filename or fileattach,
 * and exactly one of size or sizeattach.
 * 
 * This type enforces at compile-time that you must provide:
 * - Exactly one file source (filename OR fileattach)
 * - Exactly one size source (size OR sizeattach)
 */
export type BrotherArgs = Omit<BrotherArgsBase, 'filename' | 'fileattach' | 'size' | 'sizeattach'> & 
  FileSource & 
  SizeSource;
