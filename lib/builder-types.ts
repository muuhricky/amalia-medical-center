export type BlockShape = "rounded" | "square" | "circle";
export type BlockSize = "s" | "m" | "l" | "xl";

export interface BuilderBlock {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  shape: BlockShape;
  size: BlockSize;
  /** 100–200 (%) */
  zoom: number;
  /** object-position 0–100 */
  posX: number;
  posY: number;
}

export interface BuilderSection {
  id: string;
  name: string;
  hint: string;
  blocks: BuilderBlock[];
}

export interface BuilderData {
  sections: BuilderSection[];
  updatedAt: string;
}

export const SIZE_COL_SPAN: Record<BlockSize, string> = {
  s: "col-span-1",
  m: "col-span-1 md:col-span-1",
  l: "col-span-1 md:col-span-2",
  xl: "col-span-1 md:col-span-3",
};

export const SHAPE_CLASS: Record<BlockShape, string> = {
  rounded: "rounded-[1.75rem]",
  square: "rounded-md",
  circle: "rounded-full",
};

export function newBlockId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
