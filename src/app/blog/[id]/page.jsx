import { store } from "@/lib/store";
import { fetchSinglePost, fetchPosts } from "../postsSlice";
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
    if (node.type === "text") {
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

  let modifiedArticle = { ...article };
  
  modifiedArticle.date = new Date(article.date.seconds * 1000 + article.date.nanoseconds / 1000000
  ).toLocaleDateString();
  modifiedArticle.body = JSON.parse(article.body);

  return (
    <div>
      <Head>
        {/* <!-- Open Graph Tags --> */}
        <meta property="og:title" content={modifiedArticle.id} />
        <meta property="og:description" content={truncatedArticleDescription} />
        <meta property="og:image" content={modifiedArticle.imageUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https:matteo-dirollo/blog/${modifiedArticle.id}`}
        />
        <meta property="og:site_name" content="mdr" />

        {/* <!-- Twitter Card Tags --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@matteodirollo" />
        <meta name="twitter:title" content={modifiedArticle.title} />
        <meta
          name="twitter:description"
          content={truncatedArticleDescription}
        />
        <meta name="twitter:image" content={modifiedArticle.imageUrl} />

        <title>{modifiedArticle.title}</title>
      </Head>
      <Container
        my={10}
        align="stretch"
        maxW={["fit-content", "80%"]}
        style={{ overflowX: "hidden" }}
      >
        <Box as="article" key={modifiedArticle.id} maxW={"1000px"} margin={"auto"}>
          <ArticleHeading title={modifiedArticle.title} />
          <Subtitle article={modifiedArticle} />
          <Center>
            <Box
              w="100%"
              maxW={"1000px"}
              minH={"500"}
              sx={{
                backgroundImage: `url(${modifiedArticle.imageUrl})`,
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
          <Tags article={modifiedArticle} />
        </HStack>
        <Comments article={modifiedArticle} />
        <br />
        <MorePosts article={modifiedArticle} />
      </Container>
    </div>
  );
}
