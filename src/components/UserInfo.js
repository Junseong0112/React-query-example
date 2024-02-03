import ProfilePhoto from "./ProfilePhoto";
import { UserInfoDiv, UserNameDiv } from "../styles/UserInfo";

function UserInfo({ name, photo }) {
  return (
    <UserInfoDiv>
      <ProfilePhoto photo={photo} name={name} />
      <UserNameDiv>{name}</UserNameDiv>
    </UserInfoDiv>
  );
}

export default UserInfo;
