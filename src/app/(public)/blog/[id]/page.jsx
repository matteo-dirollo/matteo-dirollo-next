import { store } from "@/lib/store";
import { fetchSinglePost } from "../postsSlice";
import ArticleHeading from "@/components/ui/text/headings/ArticleHeading";
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
import MorePosts from "@/components/layout/Posts/MorePosts";
import Comments from "@/components/ui/comments/Comments";;

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

export async function generateMetadata({ params }) {
  await store.dispatch(fetchSinglePost(params.id));
  const article = store.getState().posts.currentPost;
  const parsedBody = JSON.parse(article.body);
  const articleBody = extractTextNodes(parsedBody.root);
  const truncatedArticleDescription = _.truncate(articleBody, {
    length: 150,
    omission: "...",
  });
  let modifiedArticle = { ...article };

  modifiedArticle.date = new Date(
    article.date.seconds * 1000 + article.date.nanoseconds / 1000000
  ).toLocaleDateString();
  modifiedArticle.body = JSON.parse(article.body);

  // console.log(article.body)
  return {
    title: article.title,
    description: truncatedArticleDescription,
    openGraph: {
      title: article.title,
      description: truncatedArticleDescription,
      type: "article",
      keywords: article.category,
      publishedTime: modifiedArticle.date,
      authors: modifiedArticle.author,
      url: `https:/matteo-dirollo.com/blog/${params.id}`,
      siteName: "Matteo's Portfolio & Blog",
      images: [
        {
          url: article.imageUrl,
          width: 800,
          height: 600,
        },
        {
          url: article.imageUrl,
          width: 1800,
          height: 1600,
          alt: "3D rendering of abstract shapes created with Blender Cycles, featuring a machine resembling a pendulum.",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: article.imageUrl,
      title: article.title,
      description: truncatedArticleDescription,
      creator: "@matteodirollo",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      googleBotNews: {
        index: false,
      },
    },
  };
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

  modifiedArticle.date = new Date(
    article.date.seconds * 1000 + article.date.nanoseconds / 1000000
  ).toLocaleDateString();
  modifiedArticle.body = JSON.parse(article.body);

  return (
    <div>
      <Container
        my={10}
        align="stretch"
        maxW={["fit-content", "80%"]}
        style={{ overflowX: "hidden" }}
      >
        <Box
          as="article"
          key={modifiedArticle.id}
          maxW={"1000px"}
          margin={"auto"}
        >
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
