import Post from "./Post";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPosts, getPostsByUsername, uploadPost } from "../api/api";
import { FEED_VARIANT } from "../values";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

//  데이터가 fresh 상태라면 캐시에 저장된 데이터를 리턴하고 끝이지만, 데이터가 stale 상태라면 백그라운드에서 refetch를 진행한다.

function PostList({ variant = FEED_VARIANT.HOME_FEED }) {
  const [content, setContent] = useState("");

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

  // pending = 로딩, error = 에러 객체를 가져와 로딩 화면 및 에러 화면을 구성할 수 있다.
  const {
    data: postsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: postsQueryKey,
    queryFn: postsQueryFn,
    // 에러가 발생했을 떄, Default는 3번, 0으로 줄여 에러화면을 빨리 볼 수 있다.
    retry: 0,
  });
  // 사이드 이펙트(수정, 삭제, 추가)가 발생할 때, 뮤테이션 함수를 직접 실행시ㅋ줘야 백엔드 데이터를 실제로 수정할 수 있게 된다.
  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
  });

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { username: "query", content };
    uploadPostMutation.mutate(newPost);
    setContent("");
  };

  // 로딩중일때 로딩페이지 리턴
  if (isPending) return <LoadingPage />;
  // 에러 발생시 에러페이지 리턴
  if (isError) return <ErrorPage />;

  const posts = postsData?.results ?? [];

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
          />
          <button disabled={!content} type="submit">
            업로드
          </button>
        </form>
      </div>
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default PostList;
