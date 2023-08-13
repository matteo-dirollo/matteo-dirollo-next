import { store } from "@/lib/store";
import { fetchSinglePost } from "../postsSlice";
import ArticleHeading from "./../../../components/ui/text/headings/ArticleHeading";
import {
  Container,
  Box,
  Center,
  Divider,
  Spacer,
  HStack,
} from "@/styles/ChakraImports";
import Subtitle from "@/components/layout/Posts/Subtitle";
import PlainEditor from "@/components/ui/lexicalEditor/PlainEditor";
import Tags from "@/components/layout/Posts/Tags";
import MorePosts from "./../../../components/layout/Posts/MorePosts";
import Comments from "@/components/ui/comments/Comments";
import Head from "next/head";

function extractTextNodes(content) {
  let texts = [];

  function traverse(node) {
      if (node.type === 'text') {
          texts.push(node.text);
      } else if (node.children) {
          for (const child of node.children) {
              traverse(child);
          }
      }
  }

  traverse(content);

  return texts;
}

export default async function Article({ params }) {
  await store.dispatch(fetchSinglePost(params.id));
  const article = store.getState().posts.currentPost;
  const parsedBody = JSON.parse(article.body);
  const articleBody = extractTextNodes(parsedBody.root);
  const truncatedArticleDescription = _.truncate(articleBody, {
    length: 150,
    omission: "...",
  });

  return (
    <div>
      <Head>
        {/* <!-- Standard Meta Tags --> */}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* <!-- Open Graph Tags --> */}
        <meta property="og:title" content={article.id} />
        <meta
          property="og:description"
          content={truncatedArticleDescription}
        />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https:matteo-dirollo/blog/${article.id}`} />
        <meta property="og:site_name" content="mdr" />

        {/* <!-- Twitter Card Tags --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@matteodirollo" />
        <meta name="twitter:title" content={article.title} />
        <meta
          name="twitter:description"
          content={truncatedArticleDescription}
        />
        <meta name="twitter:image" content={article.imageUrl} />

        <title>{article.title}</title>
      </Head>
      <Container
        my={10}
        align="stretch"
        maxW={["fit-content", "80%"]}
        style={{ overflowX: "hidden" }}
      >
        <Box as="article" key={article.id} maxW={"1000px"} margin={"auto"}>
          <ArticleHeading title={article.title} />
          <Subtitle article={article} />
          <Center>
            <Box
              w="100%"
              maxW={"1000px"}
              minH={"500"}
              sx={{
                backgroundImage: `url(${article.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              mt={5}
              mb={5}
            />
          </Center>
          <PlainEditor stateInstance={article.body} />
         
        </Box>
        <Divider my={10} />
        <HStack>
          {/* Share button */}
          <Spacer />
          <Tags article={article} />
        </HStack>
        <Comments article={article} />
        <br />
        <MorePosts article={article} />
      </Container>
    </div>
  );
}
