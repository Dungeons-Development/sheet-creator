import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';
import {AnyElement, ElementType} from '@/types/element';
import {useEffect, useMemo, useState, MouseEvent} from 'react';
import {RendererMode} from '@/types/rendererMode';
import {DragHandle} from './dragHandle';

const ElementContainer = styled.div<{
  top: number,
  left: number,
  width: number,
  height: number,
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  border: 1px dashed lightgrey;
`;

const MoveDragHandle = styled(DragHandle)`
  top: 0;
  left: 0;
  transform: translateX(-100%) translateY(-100%);
`;

const ResizeDragHandle = styled(DragHandle)`
  bottom: 0;
  right: 0;
  transform: translateX(100%) translateY(100%);
`;

const ElementContentContainer = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

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

export const Element = (props: {
  element: AnyElement,
  boundingBox: DOMRect,
  rendererMode: RendererMode,
  onMove: (rect: DOMRect) => void,
}) => {
  const { element, boundingBox, rendererMode, onMove } = props;

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

  const onElementMove = (vector: DOMPoint) => {
    const newCoordinates = new DOMRect(
      Math.max(element.coordinates.x + (vector.x / boundingBox.width), 0),
      Math.max(element.coordinates.y + (vector.y / boundingBox.height), 0),
      Math.min(element.coordinates.width + element.coordinates.x, 1) - element.coordinates.x,
      Math.min(element.coordinates.height + element.coordinates.y, 1) - element.coordinates.y,
    );

    onMove(newCoordinates);
  };

  const onElementResize = (vector: DOMPoint) => {
    const newCoordinates = new DOMRect(
      Math.max(element.coordinates.x, 0),
      Math.max(element.coordinates.y, 0),
      Math.min((element.coordinates.width + (vector.x / boundingBox.width)) + element.coordinates.x, 1) - element.coordinates.x,
      Math.min((element.coordinates.height + (vector.y / boundingBox.height)) + element.coordinates.y, 1) - element.coordinates.y,
    );

    console.log("new coords", newCoordinates);

    onMove(newCoordinates);
  };

  return (
    <ElementContainer
      top={element.coordinates.y * boundingBox.height}
      left={element.coordinates.x * boundingBox.width}
      width={element.coordinates.width * boundingBox.width}
      height={element.coordinates.height * boundingBox.height}
      
    >
      {rendererMode === RendererMode.edit && (
        <MoveDragHandle
          onMove={onElementMove}
        />
      )}

      <ElementContentContainer>
        {elementContent}
      </ElementContentContainer>

      {rendererMode === RendererMode.edit && (
        <ResizeDragHandle
          onMove={onElementResize}
        />
      )}
    </ElementContainer>
  );
};

