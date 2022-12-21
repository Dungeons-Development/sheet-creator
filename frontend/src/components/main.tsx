import { useState } from 'react';
import {ElementType} from '../types/element';
import {Sheet} from '../types/sheet';

import { Renderer } from './renderer';

export const Main = () => {
  // TODO: Load sheet from server
  // TODO: Sheet starters/templates
  const [sheet, setSheet] = useState<Sheet>({
    title: "Untitled",
    elements: [{
      type: ElementType.text,
      coordinates: {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 1
      },
      html: 'asdf',
    }],
  });

  return (
    <div>
      <h2>Sheet Creator</h2>
      <Renderer sheet={sheet} />
    </div>
  );
};
