import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const Header = styled.header`
  background-color: #373b69;
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
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

  /* Esconder o botão "x" de limpar */
  &::-webkit-search-cancel-button {
    display: none;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
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
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

function HeaderWithSearch({ searchTerm, handleOnSubmit, handleOnChange }) {
  return (
    <Header>
      <form onSubmit={handleOnSubmit}>
        <SearchContainer>
          <Search
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
          <SearchButton onClick={handleOnSubmit}>
            <AiOutlineSearch />
          </SearchButton>
        </SearchContainer>
      </form>
    </Header>
  );
}

export default HeaderWithSearch;
