import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.input`
  background-color: transparent;
  border: 2px solid #22254b;
  border-radius: 50px;
  color: #fff;
  font-family: inherit;
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;

  &:focus {
    outline: 0;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
  position: absolute;
  right: 33px;
  font-size: 1.5rem;
`;

export { SearchContainer, Search, SearchButton };
