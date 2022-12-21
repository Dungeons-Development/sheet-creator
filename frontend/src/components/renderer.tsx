import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';

import { Sheet } from "../types/sheet";
import {Element, ElementType} from '../types/element';
import {useMemo, useState} from 'react';

const RendererContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ElementContainer = styled.div<{
  top: number,
  left: number,
  right: number,
  bottom: number,
}>``;

const TextElement = (props: {
  html: string,
}) => {
  const { html } = props;

  const sanitizedHtml = sanitizeHtml(html);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
  );
};

const ImageElement = (props: {
  url: string,
}) => {
  const { url } = props;

  return (
    <img src={url} />
  );
};

const Element1 = (props: {
  element: Element,
  boundingBox: DOMRect
}) => {
  const { element, boundingBox } = props;

  const elementContent = useMemo(() => {
    switch(element.type) {
      case ElementType.text: {
        return (
          <TextElement html={element.html} />
        );
      }
      case ElementType.image: {
        return (
          <ImageElement url={element.url} />
        );
      }
    }
  }, [element]);

  return (
    <ElementContainer
      top={element.coordinates.y1}
      left={element.coordinates.x1}
      right={element.coordinates.x2}
      bottom={element.coordinates.y2}
    >
      {elementContent}
    </ElementContainer>
  );
};

export const Renderer = (props: { sheet: Sheet }) => {
  const { sheet } = props;

  const [renderer, setRenderer] = useState<HTMLDivElement>();

  const registerRef = (element: HTMLDivElement) => {
    setRenderer(element);
  };

  return (
    <RendererContainer ref={registerRef}>
      {renderer && sheet.elements.map((element, idx) => (
        <Element1
          key={idx}
          element={element}
          boundingBox={renderer.getBoundingClientRect()}
        />
      ))}
    </RendererContainer>
  );
};
