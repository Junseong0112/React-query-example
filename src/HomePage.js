import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/api";

function HomePage() {
  const result = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  console.log(result);

  return <div>홈페이지</div>;
}

export default HomePage;
