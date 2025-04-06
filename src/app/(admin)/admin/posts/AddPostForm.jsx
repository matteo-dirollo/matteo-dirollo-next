'use client';
import React, { useRef } from 'react';
import {
  addToast,
  Button,
  Input,
} from '@heroui/react';
import { CheckboxContainer, CheckboxControl } from 'formik-chakra-ui';
import { Form, Formik } from 'formik';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import * as Yup from 'yup';
import MyTextInput from '@/components/ui/inputs/MyTextInput';

import EditorBubbles from '@/components/ui/lexicalEditor/plugins/EditorBubbles';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { editorConfig } from '@/components/ui/lexicalEditor/themes/editorConfig';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import TreeViewPlugin from '@/components/ui/lexicalEditor/plugins/TreeViewPlugin';
import ToolbarPlugin from '@/components/ui/lexicalEditor/plugins/ToolbarPlugin';

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import ListMaxIndentLevelPlugin from '@/components/ui/lexicalEditor/plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from '@/components/ui/lexicalEditor/plugins/CodeHighlightPlugin';
import AutoLinkPlugin from '@/components/ui/lexicalEditor/plugins/AutoLinkPlugin';
import Placeholder from '@/components/ui/lexicalEditor/Placeholder';
import '@/components/ui/lexicalEditor/styles.css';
import { TRANSFORMERS } from '@lexical/markdown';
import EmoticonPlugin from '@/components/ui/lexicalEditor/plugins/EmoticonPlugin';

// import {$generateHtmlFromNodes} from '@lexical/html';

import { useDispatch } from 'react-redux';
import { addNewPost, fetchPosts } from '@/app/(public)/projects/postsSlice';
import { FiFile } from 'react-icons/fi';
import ImagesPlugin from '@/components/ui/lexicalEditor/plugins/ImagesPlugin';
import YouTubePlugin from '@/components/ui/lexicalEditor/plugins/YoutubePlugin';
import AutoEmbedPlugin from '@/components/ui/lexicalEditor/plugins/AutoembedPlugin';
import FigmaPlugin from '@/components/ui/lexicalEditor/plugins/FigmaPlugin';
import TwitterPlugin from '@/components/ui/lexicalEditor/plugins/TwitterPlugin';

const AddPostForm = () => {
  const editorInstanceRef = useRef(null);
  const dispatch = useDispatch();

  const toastSuccess = () => {
    addToast({
      title: 'Post added.',
      description: 'You can see it in the blog',
      duration: 3000,
      isClosable: true,
      type: "success"
    });
  };

  const initialValues = {
    title: '',
    editor: {},
    img: null,
    tags: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    img: Yup.mixed().required(),
    tags: Yup.array().min(1),
  });

  const onSavePost = values => {
    if (values) {
      dispatch(addNewPost(values));
      dispatch(fetchPosts());
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSavePost(values);
      toastSuccess();
      setSubmitting(false);
      resetForm();
    } catch (error) {
      throw error;
    }
    // console.log(values.editor)
  };

  return (
    <div className="max-w-full overflow-hidden">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          isValid,
          dirty,
          setFieldValue,
          handleBlur,
          handleReset,
          errors,
        }) => (
          <Form>
            <div>
              <MyTextInput label="Title" name="title" />
            </div>
            <div className="my-8">
              <LexicalComposer initialConfig={editorConfig}>
                <div
                  className="editor-container"
                >
                  <ToolbarPlugin />
                  <div className="editor-inner">
                    <RichTextPlugin
                      contentEditable={
                        <ContentEditable 
                        className="editor-input" 
                        // responsive-editor-input 
                        />
                      }
                      placeholder={<Placeholder />}
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                    <EditorBubbles editorInstanceRef={editorInstanceRef} />
                    <OnChangePlugin
                      onChange={(editorState, editor) => {
                        editorState.read(() => {
                          setFieldValue('editor', editorState);
                        });
                      }}
                    />
                    <HistoryPlugin />
                    <TreeViewPlugin />
                    <AutoEmbedPlugin />
                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                    <YouTubePlugin />
                    <ImagesPlugin />
                    <FigmaPlugin />
                    <TwitterPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <AutoLinkPlugin />
                    <EmoticonPlugin />
                    <ListMaxIndentLevelPlugin maxDepth={7} />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                  </div>
                </div>
              </LexicalComposer>
            </div>
            <br />
            <div>
              <label className="block mb-2">Image</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiFile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target;
                    setFieldValue('img', file.files[0]);
                  }}
                  name="img"
                  label="Image"
                  className="pl-10"
                />
              </div>
            </div>
            <br />
            <CheckboxContainer name="tags" label="Tags">
              <CheckboxControl name="tags" value="Design">
                Design
              </CheckboxControl>
              <CheckboxControl name="tags" value="Art">
                Art
              </CheckboxControl>
              <CheckboxControl name="tags" value="Video">
                Video
              </CheckboxControl>
              <CheckboxControl name="tags" value="Web">
                Web
              </CheckboxControl>
              <CheckboxControl name="tags" value="Digital Art">
                Digital Art
              </CheckboxControl>
              <CheckboxControl name="tags" value="3D">
                3D
              </CheckboxControl>
              <CheckboxControl name="tags" value="Architecture">
                Architecture
              </CheckboxControl>
              <CheckboxControl name="tags" value="Product Design">
                Product Design
              </CheckboxControl>
            </CheckboxContainer>
            <br />
            <div className="flex full-width gap-2">
              <Button
                onPress={() => {
                  handleReset();
                }}
                variant="light"
                className="max-w-[300px] min-w-[150px]"
                color="default"
              >
                Reset
              </Button>
              <Button
                isLoading={isSubmitting}
                isDisabled={!isValid || !dirty || isSubmitting}
                type="submit"
                className="max-w-[300px] min-w-[150px] text-white"
                color="primary"
                variant="solid"
              >
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPostForm;
