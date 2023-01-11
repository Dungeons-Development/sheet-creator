export enum ElementType {
  text = 'text',
  image = 'image',
}

interface BaseElementInterface {
  id: string;
  coordinates: DOMRect;
}

export interface ImageElementInterface extends BaseElementInterface {
  type: ElementType.image;
  url: string;
}

export interface TextElementInterface extends BaseElementInterface {
  type: ElementType.text;
  html: string;
}

export type ElementInterface = TextElementInterface | ImageElementInterface;

