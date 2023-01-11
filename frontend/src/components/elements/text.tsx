import React, {useState} from 'react';

import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {RendererMode} from '@/types/rendererMode';
import styled from 'styled-components';
import {TextElementInterface} from '@/types/element';

const MenuBarContainer = styled.div`
  position: absolute;
  transform: translateY(calc(-100% - 5px));
  z-index: 1; // Must float above other elements
  width: 300px;
  background: white;
  box-shadow: 1px 1px 7px rgba(0,0,0,0.5);
  padding: 5px;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  margin: 0px 1px;
  width: 25px;
  cursor: pointer;

  i {
    font-size: 18px;
    vertical-align: middle;
  }

  &.is-active {
    background: rgba(0,0,0,0.1);
  }
`;

const MenuBar = (props: {
  editor: Editor
}) => {
  const { editor } = props;

  return (
    <MenuBarContainer>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <i className="ri-bold"></i> 
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <i className="ri-italic"></i> 
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <i className="ri-h-1"></i>
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <i className="ri-h-2"></i>
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <i className="ri-h-3"></i>
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <i className="ri-h-4"></i>
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        <i className="ri-h-5"></i>
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        <i className="ri-h-6"></i>
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <i className={'ri-list-unordered'}></i>
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <i className={'ri-list-ordered'}></i>
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <i className={'ri-page-separator'}></i>
      </MenuButton>
    </MenuBarContainer>
  );
};

const StyledEditorContent = styled(EditorContent)`
  height: 100%;

  > .ProseMirror {
    height: 100%;
    outline: none;
  }
`;

const EditorWithDocuStyling = styled(StyledEditorContent)`
  p {
    margin: 0;
  }
`;

export const TextElement = (props: {
  mode: RendererMode,
  element: TextElementInterface,
}) => {
  const { mode, element } = props;

  const [editMode, setEditMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: element.html,
    editable: true,
  });

  if (!editor) return (
    <>
      Loading...
    </>
  );

  const editorFocus = () => {
    if (mode !== RendererMode.edit) return;

    setEditMode(true);
  };

  const editorBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget?.closest(MenuBarContainer)) return;

    setEditMode(false);
  };

  return (
    <>
      {editMode && <MenuBar editor={editor} />}
      <EditorWithDocuStyling onFocus={editorFocus} onBlur={editorBlur} editor={editor} />
    </>
  );
};

