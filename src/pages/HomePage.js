import Container from "../components/Container";
import PostList from "../components/PostList";
import { FEED_VARIANT } from "../values";

function HomePage() {
  return (
    <Container>
      <PostList variant={FEED_VARIANT.HOME_FEED} />
    </Container>
  );
}

export default HomePage;