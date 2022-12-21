export enum ElementType {
  text = 'text',
  image = 'image',
}

export interface ElementCoordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface BaseElement {
  coordinates: ElementCoordinates;
}

export interface ImageElement extends BaseElement {
  type: ElementType.image;
  url: string;
}

export interface TextElement extends BaseElement {
  type: ElementType.text;
  html: string;
}

export type Element = TextElement | ImageElement;

