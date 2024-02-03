import styled from "styled-components";

export const UserInfoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const UserNameDiv = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
  color: #494949;
`;
