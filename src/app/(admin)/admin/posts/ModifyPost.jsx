"use client";
import React, { useEffect, useRef } from "react";
import { selectedPost } from "@/app/(public)/blog/postsSlice";
import ModalWindow from "@/components/ui/modals/ModalWindow";
import {
  Box,
  Button,
  Flex,
  Stack,
  useToast,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  FormLabel,
  Image,
} from "@chakra-ui/react";
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
import Placeholder from "@/components/ui/lexicalEditor/Placeholder";
import { FiFile } from "react-icons/fi";
import ImagesPlugin from "@/components/ui/lexicalEditor/plugins/ImagesPlugin";
import YouTubePlugin from "@/components/ui/lexicalEditor/plugins/YoutubePlugin";
import AutoEmbedPlugin from "@/components/ui/lexicalEditor/plugins/AutoembedPlugin";
import FigmaPlugin from "@/components/ui/lexicalEditor/plugins/FigmaPlugin";
import TwitterPlugin from "@/components/ui/lexicalEditor/plugins/TwitterPlugin";
import "@/components/ui/lexicalEditor/styles.css";
import { TRANSFORMERS } from "@lexical/markdown";
import EmoticonPlugin from "@/components/ui/lexicalEditor/plugins/EmoticonPlugin";
import { useSelector, useDispatch } from "react-redux";

const ModifyPost = () => {
  const post = useSelector(selectedPost);
  const editorValue = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Boocha is a mockup brand I created for a beverage made with fermented tea, known as kombucha. To get started, I created three very simple labels to provide material for working on the 3D models immediately afterward, and then I modeled the meshes in blender.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"The label","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"The different versions of the label also had different funny names. For the first one on the left, Umbo, I created an abstract visual that resembles a liquid somehow and the tastes are highlighted with the color white The other version takes its name from the scoby (symbiotic culture of bacteria and yeast), a mass that aids the fermentation process, and, for the visuals I drew the shape of each fruit and I’ve added a different pattern to each one.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"graphic design illustrator","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2FBoocha%2Fslide_boocha_labels.jpg?alt=media&token=ca82a42f-43b6-4efe-946c-f38ce9d97d71","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"3D modeling","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Good topography is essential when unwrapping a model, this avoids slowing down the CPU and stretching textures on the final result. It gives you also the freedom to add different modifiers and add displacement when needed. In this case I applied the displacement to the bottom of the bottle and also to make the twisted thread of the cup, by simply using blender material nodes.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"kombucha, 3d modeling, blender, cycles","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2FBoocha%2Fslide_boocha_details.jpg?alt=media&token=7ebbf2eb-a0da-4f29-8728-386f3cef137c","type":"image","version":1,"width":0}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"To conclude, I've built several scenes, adjusting lights based on my models' positions to effectively illuminate the edges of the bottle. It was also enjoyable to create the can and various Arrays, for which I utilized geometry nodes.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2FBoocha%2Fkombucha_array_v4.png?alt=media&token=e90a0b49-5a71-4694-889f-3889838b55d6","type":"image","version":1,"width":0}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Blog%2FBoocha%2Fslide_boocha_warhol.jpg?alt=media&token=be429dc4-750d-4075-a04c-b88d1bccc24d","type":"image","version":1,"width":0}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
  const initialEditorValue = JSON.parse(editorValue);
  const toast = useToast();
  const editorInstanceRef = useRef(null);
  const dispatch = useDispatch();
  const textColor = useColorModeValue("gray.700", "gray.100");




  const toastSuccess = () => {
    toast({
      title: "Modifications applied.",
      description: "Check the article in the projects tab",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const initialValues = {
    title: post?.title || "", // Use post.title as the initial value for the title
    editor: JSON.parse(editorValue), // Use post.editor as the initial value for the editor
    img: post?.imageUrl || null, // Use post.img as the initial value for the img
    tags: post?.category || [], // Use post.tags as the initial value for tags
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    img: Yup.mixed().required(),
    tags: Yup.array().min(1),
  });

  const onSavePost = (values) => {
    if (values) {
      dispatch(fetchPosts());
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
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
    <ModalWindow size="auto">
      <Flex alignItems={"center"} align="center" justify="center">
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
              <Box>
                <MyTextInput label="Title" name="title" />
              </Box>
              <Box my={8}>
                <LexicalComposer initialConfig={newEditorState}>
                  <Box
                    sx={{
                      ".other:h2": {
                        fontSize: "18px",
                        color: textColor,
                        marginBottom: "7px",
                      },
                    }}
                    className="editor-container"
                  >
                    <ToolbarPlugin />
                    <Box className="editor-inner">
                      <RichTextPlugin
                        contentEditable={
                          <ContentEditable
                            className="editor-input"
                            responsive-editor-input
                            content={editorValue}
                          />
                        }
                        placeholder={<Placeholder />}
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
                    </Box>
                  </Box>
                </LexicalComposer>
              </Box>
              <br />
              <Box>
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
                    sx={{
                      "::file-selector-button": {
                        height: 10,
                        padding: 0,
                        mr: 8,
                        background: "none",
                        border: "none",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </InputGroup>
              </Box>
              <Box my={2}>
                {initialValues.img && (
                  <Image
                    src={post.imageUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100px",
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto",
                      border: "1px solid #ddd",
                    }}
                  />
                )}
              </Box>
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
              <Stack>
                <Button
                  onClick={() => {
                    handleReset();
                  }}
                  colorScheme="gray"
                  maxW={300}
                >
                  Reset
                </Button>
                <Button
                  isLoading={isSubmitting}
                  disable={!isValid || !dirty || isSubmitting}
                  type="submit"
                  bg="black"
                  color="white"
                  maxW={300}
                >
                  Modify
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </ModalWindow>
  );
};

export default ModifyPost;
