import styled from 'styled-components';
import {ElementInterface, ElementType} from '@/types/element';
import {useContext, useMemo} from 'react';
import {RendererMode} from '@/types/rendererMode';
import {DragHandle} from './dragHandle';
import {TextElement} from './elements/text';
import {ImageElement} from './elements/image';
import {SheetControlsContext} from '@/contexts/sheetControls';

const ElementControls = styled.div`
  position: absolute;
  display: none;
  height: 20px;
  margin-top: -30px;
`;

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

  &:hover ${ElementControls} {
    display: block;
  }
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

export const Element = (props: {
  mode: RendererMode,
  element: ElementInterface,
  boundingBox: DOMRect,
  rendererMode: RendererMode,
}) => {
  const { mode, element, boundingBox, rendererMode } = props;

  const sheetControls = useContext(SheetControlsContext);

  const elementContent = useMemo(() => {
    switch(element.type) {
      case ElementType.text: {
        return (
          <TextElement element={element} mode={mode} />
        );
      }
      case ElementType.image: {
        return (
          <ImageElement element={element} />
        );
      }
    }
  }, [element]);

  const onElementMove = (vector: DOMPoint) => {
    const newCoordinates = new DOMRect(
      Math.max(element.coordinates.x + (vector.x / boundingBox.width), 0),
      Math.max(element.coordinates.y + (vector.y / boundingBox.height), 0),
      Math.max(Math.min(element.coordinates.width + element.coordinates.x, 1) - element.coordinates.x, 0),
      Math.max(Math.min(element.coordinates.height + element.coordinates.y, 1) - element.coordinates.y, 0),
    );

    // TODO: Do not modify element in place, instead propagate by id
    element.coordinates = newCoordinates;
    sheetControls.updateElement(element);
  };

  const onElementResize = (vector: DOMPoint) => {
    const newCoordinates = new DOMRect(
      Math.max(element.coordinates.x, 0),
      Math.max(element.coordinates.y, 0),
      Math.max(Math.min((element.coordinates.width + (vector.x / boundingBox.width)) + element.coordinates.x, 1) - element.coordinates.x, 0),
      Math.max(Math.min((element.coordinates.height + (vector.y / boundingBox.height)) + element.coordinates.y, 1) - element.coordinates.y, 0),
    );

    // TODO: Do not modify element in place, instead propagate by id
    element.coordinates = newCoordinates;
    sheetControls.updateElement(element);
  };

  const del = () => {
    sheetControls.deleteElement(element);
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
        >
          ✥
        </MoveDragHandle>
      )}

      {rendererMode === RendererMode.edit && (
        <ElementControls className="element-controls">
          <button onClick={del}>Delete</button>
        </ElementControls>
      )}

      <ElementContentContainer>
        {elementContent}
      </ElementContentContainer>

      {rendererMode === RendererMode.edit && (
        <ResizeDragHandle
          onMove={onElementResize}
        >
          X
        </ResizeDragHandle>
      )}
    </ElementContainer>
  );
};

