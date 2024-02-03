import Card from "./Card";
import ContentInfo from "./ContentInfo";
import { PostContent, PostDescription } from "../styles/PostList";

function Post({ post }) {
  return (
    <Card>
      <PostContent>
        <ContentInfo user={post.user} updatedAt={post.updatedAt} />
        <PostDescription>{post.content}</PostDescription>
      </PostContent>
    </Card>
  );
}

export default Post;
