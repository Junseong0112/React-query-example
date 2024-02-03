import UserInfo from "./UserInfo";
import { InfoDiv, DateDiv } from "../styles/ContentInfo";

function formateDate(timestamp) {
  const fullDate = new Date(timestamp);
  const date = fullDate.getDate();
  const month = fullDate.getMonth() + 1;
  const year = fullDate.getFullYear();
  let hours = fullDate.getHours();
  let minutes = fullDate.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}

function ContentInfo({ user, updatedAt }) {
  return (
    <InfoDiv>
      <UserInfo name={user.name} photo={user.photo} />
      <DateDiv>{formateDate(updatedAt)}</DateDiv>
    </InfoDiv>
  );
}

export default ContentInfo;
