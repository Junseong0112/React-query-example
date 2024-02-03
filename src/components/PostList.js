import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/api";
import { PostListDiv } from "../styles/PostList";

function PostList() {
  const { data: postsData } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const posts = postsData?.results ?? [];
  console.log(posts);

  return (
    <PostListDiv>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </PostListDiv>
  );
}

export default PostList;
