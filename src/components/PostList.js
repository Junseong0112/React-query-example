import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "../api/api";
import { PostListDiv } from "../styles/PostList";
import { FEED_VARIANT } from "../values";

//  데이터가 fresh 상태라면 캐시에 저장된 데이터를 리턴하고 끝이지만, 데이터가 stale 상태라면 백그라운드에서 refetch를 진행한다.

function PostList({ variant = FEED_VARIANT.HOME_FEED }) {
  // // 구조분해를 이용해서 data : postsData라는 이름으로 지정하여 값을 추출
  // const { data: postsData } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getPosts,
  //   // stale 기본값 0 , fresh 상태로 변경하기 위핸 설정이 필요함 60 * 1000ms = 1분
  //   staleTime: 60 * 1000,
  //   // Garbage Collection Time : 저장된 데이터의 삭제 10분으로 설정
  //   gcTime: 60 * 1000 * 10,
  // });

  // const username = "김길동";
  // const { data: postsDataByUsername } = useQuery({
  //   // 전체 포스트 중 특정 유저의 포스트만 받기 위해 배열형태를 저장
  //   queryKey: ["posts", username],
  //   queryFn: () => getPostsByUsername(username),
  // });
  // console.log(postsDataByUsername);

  // values 값에 따른 쿼리 값
  let postsQueryKey;
  let postsQueryFn;

  if (variant === FEED_VARIANT.HOME_FEED) {
    postsQueryKey = ["posts"];
    postsQueryFn = getPosts;
  } else if (variant === FEED_VARIANT.MY_FEED) {
    const username = "query";
    postsQueryKey = ["posts", username];
    postsQueryFn = () => getPostsByUsername(username);
  } else {
    console.log("Invalid feed request");
  }

  const { data: postsData } = useQuery({
    queryKey: postsQueryKey,
    queryFn: postsQueryFn,
  });

  const posts = postsData?.results ?? [];

  return (
    <PostListDiv>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </PostListDiv>
  );
}

export default PostList;
