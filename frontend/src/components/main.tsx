import { useState } from 'react';
import {Mode} from '@/types/mode';
import {RendererMode} from '@/types/rendererMode';
import styled from 'styled-components';
import {AnyElement, ElementType} from '@/types/element';
import {Sheet} from '@/types/sheet';

import { Renderer } from './renderer';

const EditorContainer = styled.div`
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.6);

  position: absolute;
  top: 60px;
  left: 20px;
  width: 500px;
  height: 700px;
`;

const PreviewContainer = styled.div`
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.6);

  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 500px;
  height: 700px;

  overflow: hidden;

  scale: 0.4;
  transform-origin: bottom right;
`;

export const Main = () => {
  // TODO: Load sheet from server
  // TODO: Sheet starters/templates
  const t = () => {
    const saved = localStorage.getItem('temp');

    return saved ? JSON.parse(saved) : {
      title: "Untitled",
      elements: [{
        type: ElementType.text,
        coordinates: {
          x: 0.1,
          y: 0.1,
          width: 0.2,
          height: 0.2
        },
        html: 'This is some text',
      }],
    };
  };

  const [sheet, setSheet] = useState<Sheet>(t());

  const [mode, setMode] = useState<Mode>(Mode.move);

  const onElementMove = (element: AnyElement, rect: DOMRect) => {
    // Temporary hacks while this isn't connected to a server
    element.coordinates = rect;

    setSheet({
      ...sheet,
    });

    new Promise(() => {
      localStorage.setItem('temp', JSON.stringify(sheet));
    });
  }

  return (
    <div>
      <h2>Sheet Creator</h2>
      <EditorContainer>
        <Renderer sheet={sheet} mode={RendererMode.edit} onElementMove={onElementMove} />
      </EditorContainer>
      <PreviewContainer>
        <Renderer sheet={sheet} mode={RendererMode.view} />
      </PreviewContainer>
    </div>
  );
};
