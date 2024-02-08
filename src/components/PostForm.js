import "react-toastify/dist/ReactToastify.css";
import styles from "./PostForm.module.css";
import TextInputForm from "./TextInputForm";

function PostForm({ onSubmit, buttonDisabled }) {
  const currentUserInfo = {
    username: "query",
    name: "쿼리",
    photo:
      "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codestudit/003.png",
  };

  const handleSubmit = async (content) => {
    const newPost = {
      username: currentUserInfo.username,
      content: content,
    };

    onSubmit(newPost);
  };

  return (
    <div className={styles.textInputForm}>
      <TextInputForm
        onSubmit={handleSubmit}
        currentUserInfo={currentUserInfo}
        placeholder="오늘의 공부 기록을 남겨보세요."
        buttonText="업로드"
        buttonDisabled={buttonDisabled}
      />
    </div>
  );
}

export default PostForm;
