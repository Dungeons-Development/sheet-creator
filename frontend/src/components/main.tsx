import React, { useEffect, useState } from 'react';
import {RendererMode} from '@/types/rendererMode';
import styled from 'styled-components';
import {ElementInterface, ElementType} from '@/types/element';
import {Sheet} from '@/types/sheet';

import { Renderer } from './renderer';
import {SheetControlsContext} from '@/contexts/sheetControls';
import {SheetControls} from '@/types/sheetControls';
import {generateId} from '@/utils/generateId';

const EditorContainer = styled.div`
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.6);

  position: absolute;
  top: 100px;
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

  scale: 0.5;
  transform-origin: bottom right;
`;

const AuthoringToolbar = styled.div`
  width: 500px;
`;

export const Main = () => {
  const [sheet, setSheet] = useState<Sheet>();

  // TODO: Load sheet from server
  // TODO: Sheet starters/templates
  const load = () => {
    new Promise(() => {
      const saved = localStorage.getItem('temp');

      const starterSheet: Sheet = {
        title: 'Untitled',
        elements: [{
          id: generateId(),
          type: ElementType.text,
          coordinates: new DOMRect(
            0.1,
            0.1,
            0.2,
            0.2
          ),
          html: 'This is some text',
        }],
      };

      const loaded: Sheet = saved ? JSON.parse(saved) : starterSheet;

      setSheet(loaded);
    });
  };

  const save = () => {
    new Promise(() => {
      localStorage.setItem('temp', JSON.stringify(sheet));
    });
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    save();
  }, [sheet]);

  if (!sheet) return (
    <div>
      Loading...
    </div>
  );

  const updateElement = (element: ElementInterface) => {
    console.log('element updated', element);
    setSheet({
      ...sheet,
    });
  };

  const deleteElement = (element: ElementInterface) => {
    sheet.elements.splice(sheet.elements.indexOf(element), 1);

    setSheet({
      ...sheet,
    });
  };

  const addText = () => {
    sheet.elements.push({
      id: generateId(),
      type: ElementType.text,
      coordinates: new DOMRect(
        0.1,
        0.1,
        0.2,
        0.2
      ),
      html: 'Textbox',
    });
    setSheet({
      ...sheet,
    });
  };

  const addImage = () => {
    sheet.elements.push({
      id: generateId(),
      type: ElementType.text,
      coordinates: new DOMRect(
        0.1,
        0.1,
        0.2,
        0.2
      ),
      html: 'Textbox',
    });
    setSheet({
      ...sheet,
    });
  };

  const sheetControls: SheetControls = {
    updateElement,
    deleteElement,
  };

  return (
    <SheetControlsContext.Provider value={sheetControls}>
      <h2>Sheet Creator</h2>
      <AuthoringToolbar>
        <button onClick={() => addText()}>Add Text</button>
        <button onClick={() => addImage()}>Add Image</button>
      </AuthoringToolbar>
      <EditorContainer>
        <Renderer sheet={sheet} mode={RendererMode.edit} />
      </EditorContainer>
      <PreviewContainer>
        <Renderer sheet={sheet} mode={RendererMode.view} />
      </PreviewContainer>
    </SheetControlsContext.Provider>
  );
};
