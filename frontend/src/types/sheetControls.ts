import {ElementInterface} from './element';

export interface SheetControls {
  updateElement: (element: ElementInterface) => void,
  deleteElement: (element: ElementInterface) => void
}
