"use client";
import React, { useState, useRef } from "react";
import { fetchPosts, updatePost } from "@/app/(public)/projects/postsSlice";
import {
  addToast,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  FormLabel,
  Image,
  Text,
} from "@heroui/react";
import { CheckboxContainer, CheckboxControl } from "formik-chakra-ui";
import { Form, Formik } from "formik";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import * as Yup from "yup";
import MyTextInput from "@/components/ui/inputs/MyTextInput";

import EditorBubbles from "@/components/ui/lexicalEditor/plugins/EditorBubbles";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { editorConfig } from "@/components/ui/lexicalEditor/themes/editorConfig";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import TreeViewPlugin from "@/components/ui/lexicalEditor/plugins/TreeViewPlugin";
import ToolbarPlugin from "@/components/ui/lexicalEditor/plugins/ToolbarPlugin";

import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import ListMaxIndentLevelPlugin from "@/components/ui/lexicalEditor/plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "@/components/ui/lexicalEditor/plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "@/components/ui/lexicalEditor/plugins/AutoLinkPlugin";
import { FiFile } from "react-icons/fi";
import ImagesPlugin from "@/components/ui/lexicalEditor/plugins/ImagesPlugin";
import YouTubePlugin from "@/components/ui/lexicalEditor/plugins/YoutubePlugin";
import AutoEmbedPlugin from "@/components/ui/lexicalEditor/plugins/AutoembedPlugin";
import FigmaPlugin from "@/components/ui/lexicalEditor/plugins/FigmaPlugin";
import TwitterPlugin from "@/components/ui/lexicalEditor/plugins/TwitterPlugin";
import "@/components/ui/lexicalEditor/styles.css";
import { TRANSFORMERS } from "@lexical/markdown";
import EmoticonPlugin from "@/components/ui/lexicalEditor/plugins/EmoticonPlugin";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import { useDispatch } from "react-redux";
import { closeModal } from "@/components/ui/modals/modalSlice";
// import Projects from '../../../(public)/projects/page';

const ModifyPost = ({ post, setSelectedPost }) => {
  const dispatch = useDispatch();
  const modifiedPost = JSON.parse(post.body);
  const editorBody = JSON.stringify(modifiedPost);

  const editorInstanceRef = useRef(null);

  const [newEditorConfig] = useState({
    ...editorConfig,
    editorState: editorBody,
  });

  const toastSuccess = () => {
    addToast({
      title: "Modifications applied.",
      description: "Check the article in the projects tab",
      duration: 3000,
      isClosable: true,
      type: "success",
    });
  };

  const initialValues = {
    title: post.title || "", // Use post.title as the initial value for the title
    editor: editorBody || null, // Use post.editor as the initial value for the editor
    img: post.imageUrl || null, // Use post.img as the initial value for the img
    tags: post.category || [], // Use post.tags as the initial value for tags
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    img: Yup.mixed().required(),
    tags: Yup.array().min(1),
  });

  const onSavePost = (values) => {
    if (values) {
      dispatch(updatePost({ postId: post.id, updatedData: values }));
      dispatch(fetchPosts());
      setSelectedPost(null);
    }
  };

  const onExit = () => {
    setSelectedPost(null);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSavePost(values);
      toastSuccess();
      setSubmitting(false);
      dispatch(closeModal());
      resetForm();
    } catch (error) {
      throw error;
    }
  };

  if (!post) {
    return <LoadingSpinner />; // or any loading state or message
  }

  return (
    <div className="w-full">
      {/* <Text>{editorState}</Text> */}
      <div className="block w-full">
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
                <div className="w-full">
                  <MyTextInput label="Title" name="title" />
                </div>
                <div className="my-8">
                  <LexicalComposer initialConfig={newEditorConfig}>
                    <div className="editor-container">
                      <ToolbarPlugin />
                      <div className="editor-inner">
                        <RichTextPlugin
                          contentEditable={
                            <ContentEditable className="editor-input" />
                          }
                          ErrorBoundary={LexicalErrorBoundary}
                        />
                        <EditorBubbles editorInstanceRef={editorInstanceRef} />
                        <OnChangePlugin
                          onChange={(editorState, editor) => {
                            editorState.read(() => {
                              setFieldValue("editor", editorState);
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
                  <FormLabel>Image</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiFile} />
                    </InputLeftElement>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target;
                        setFieldValue("img", file.files[0]);
                      }}
                      name="img"
                      label="Image"
                      className="pl-10"
                    />
                  </InputGroup>
                </div>
                <div className="my-2">
                  {initialValues.img && (
                    <img
                      src={post.imageUrl}
                      alt="Preview"
                      className="max-w-full max-h-[100px] w-auto h-auto object-cover block mx-auto border border-gray-300"
                    />
                  )}
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
                <div className="flex flex-col gap-2">
                  <Button
                    onPress={() => {
                      onExit();
                    }}
                    className="max-w-[300px] min-w-[150px] text-black"
                    variant="light"
                  >
                    Exit
                  </Button>
                  <Button
                    onPress={() => {
                      handleReset();
                    }}
                    className="max-w-[300px] min-w-[150px] text-black"
                    variant="light"
                  >
                    Reset
                  </Button>
                  <Button
                    isLoading={isSubmitting}
                    isDisabled={!isValid || !dirty || isSubmitting}
                    type="submit"
                    className="max-w-[300px] min-w-[150px] text-white"
                    variant="solid"
                  >
                    Modify
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModifyPost;
