export enum ElementType {
  text = 'text',
  image = 'image',
}

interface BaseElement {
  coordinates: DOMRect;
}

export interface ImageElement extends BaseElement {
  type: ElementType.image;
  url: string;
}

export interface TextElement extends BaseElement {
  type: ElementType.text;
  html: string;
}

export type AnyElement = TextElement | ImageElement;

