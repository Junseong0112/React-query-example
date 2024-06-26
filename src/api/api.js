const BASE_URL = "https://learn.codeit.kr/api/codestudit";
// 전체 유저 포스트 api
export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return await response.json();
}
// 특정 유저 포스트 api
export async function getPostsByUsername(username) {
  const response = await fetch(`${BASE_URL}/posts?username=${username}`);
  return await response.json();
}
// 포스트 업로드 api
export async function uploadPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("Failed to upload the post.");
  }

  return await response.json();
}
// 유저 데이터 받아오는 api
export async function getUserInfo(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  return await response.json();
}
