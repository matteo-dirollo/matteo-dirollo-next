"use client";
import React, { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import EmoticonPlugin from './plugins/EmoticonPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { editorConfig } from './themes/editorConfig';
import ImagesPlugin from './plugins/ImagesPlugin';
import YouTubePlugin from './plugins/YoutubePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

function PlainEditor({ stateInstance }) {
  const revertedJsonString = JSON.stringify(stateInstance);
  const [newEditorConfig] = useState({
    ...editorConfig,
    editable: false,
    editorState: revertedJsonString,
  });

  return (
    <LexicalComposer initialConfig={newEditorConfig}>
      <div className="max-w-full editor-container">
        <div className="readonlyeditor-inner text-gray-700 dark:text-gray-100">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ImagesPlugin />
          <YouTubePlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <EmoticonPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default PlainEditor;
