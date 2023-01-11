import styled from 'styled-components';

import { Sheet } from '@/types/sheet';
import React, {useMemo, useState} from 'react';
import {Element} from './element';
import {RendererMode} from '@/types/rendererMode';

const RendererContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: white;
`;

export const Renderer = (props: {
  sheet: Sheet,
  mode: RendererMode,
}) => {
  const { sheet, mode } = props;

  const [renderer, setRenderer] = useState<HTMLDivElement>();

  const registerRef = (element: HTMLDivElement) => {
    setRenderer(element);
  };

  const boundingBox = useMemo(() => {
    if (!renderer) return;

    const nativeBBox = renderer.getBoundingClientRect();
    const ratio = renderer.offsetWidth / nativeBBox.width;

    const bounding = new DOMRect(
      nativeBBox.x * ratio,
      nativeBBox.y * ratio,
      nativeBBox.width * ratio,
      nativeBBox.height * ratio,
    );

    return bounding;
  }, [renderer]);

  return (
    <RendererContainer ref={registerRef}>
      {renderer && boundingBox && sheet.elements.map((element) => (
        <Element
          key={element.id}
          mode={mode}
          element={element}
          boundingBox={boundingBox}
          rendererMode={mode}
        />
      ))}
    </RendererContainer>
  );
};
