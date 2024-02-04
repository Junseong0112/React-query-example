import Container from "../components/Container";
import PostList from "../components/PostList";
import { FEED_VARIANT } from "../values";

function MyFeedPage() {
  return (
    <Container>
      <PostList variant={FEED_VARIANT.MY_FEED} />
    </Container>
  );
}

export default MyFeedPage;
