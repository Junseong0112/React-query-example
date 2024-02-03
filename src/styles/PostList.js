import styled from "styled-components";

export const PostListDiv = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 20px;
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 134px;
  padding: 20px 20px 30px;
  background-color: #ffffff;
  border-top: solid 1px #ebebeb;
`;
export const PostDescription = styled.p`
  display: -webkit-box;
  margin: 0 0 10px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 300;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;
