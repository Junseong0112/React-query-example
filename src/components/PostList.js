import { useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPostsByUsername, uploadPost } from "../api/api";
import { FEED_VARIANT, QUERY_KEYS } from "../values";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import styles from "./PostList.module.css";
import Post from "./Post";
import PostForm from "./PostForm";
import { LoginContext } from "../context/LoginContext";

//  데이터가 fresh 상태라면 캐시에 저장된 데이터를 리턴하고 끝이지만, 데이터가 stale 상태라면 백그라운드에서 refetch를 진행한다.

function PostList({ variant = FEED_VARIANT.HOME_FEED, showPostForm }) {
  const { currentUsername } = useContext(LoginContext);
  // 캐시에 저장된 쿼리를 무효화하기 위해, stale time의 개요 없이 stale 상태로 만들고, 해당 데이터를 백그라운드에서 refetch하게 만들 수 있게한다.
  const queryClient = useQueryClient();

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
    postsQueryKey = [QUERY_KEYS.POSTS];
    postsQueryFn = getPosts;
  } else if (variant === FEED_VARIANT.MY_FEED) {
    postsQueryKey = [QUERY_KEYS.POSTS, currentUsername];
    postsQueryFn = () => getPostsByUsername(currentUsername);
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
    staleTime: 60 * 1000,
    // 에러가 발생했을 떄, Default는 3번, 0으로 줄여 에러화면을 빨리 볼 수 있다.
    retry: 0,
  });
  // 사이드 이펙트(수정, 삭제, 추가)가 발생할 때, 뮤테이션 함수를 직접 실행시 줘야 백엔드 데이터를 실제로 수정할 수 있게 된다.
  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
    //  성공한 시점에서 posts 쿼리의 데이터를 자동으로 refetch하게끔 만든다.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });

  // 기존 mutation을 진행하면 새로 등록한 포스트는 보이지 않는이유 :
  // 기존 캐시 에 있는 데이터가 바로 변경이 되지 않아서, refetch를 해야 새로운 데이터를 보여줄 수 있다. 새로고침을 진행하면 새로운 포스트가 보인다.

  const handleUploadPost = (newPost) => {
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => {
        toast("포스트가 성공적으로 업로드 되었습니다!");
      },
    });
  };

  // 로딩중일때 로딩페이지 리턴
  if (isPending) return <LoadingPage />;
  // 에러 발생시 에러페이지 리턴
  if (isError) return <ErrorPage />;

  const posts = postsData?.results ?? [];

  return (
    <div className={styles.postList}>
      {/* my-feed 페이지에서만 보이게 */}
      {showPostForm ? (
        <PostForm
          onSubmit={handleUploadPost}
          buttonDisabled={uploadPostMutation.isPending}
        />
      ) : (
        ""
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
