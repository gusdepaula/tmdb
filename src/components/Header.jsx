import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const Header = styled.header`
  background-color: #373b69;
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between; /* Novo: alinhar o h1 à esquerda e o input search à direita */

  @media (max-width: 768px) {
    flex-direction: column; /* Novo: em telas menores, colocar os elementos em coluna */
    align-items: flex-start; /* Novo: alinhar os elementos à esquerda */
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: "Roboto", sans-serif; /* Nova fonte */
  color: #fff; /* Cor do texto */
  margin: 0;
  padding-right: 1rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Logo = styled.span`
  font-size: 2.5rem; /* Tamanho do logo */
  margin-right: 0.5rem; /* Espaçamento entre o logo e o texto */
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
  font-size: 1.5rem;
  color: #fff; /* Novo: cor do ícone de pesquisa */
  transition: color 0.3s;

  &:hover {
    color: #f1f1f1; /* Novo: cor do ícone de pesquisa no hover */
  }
`;

function HeaderWithSearch({ searchTerm, handleOnSubmit, handleOnChange }) {
  return (
    <Header>
      <Title>
        <Logo>🎞</Logo>
        TMDb
      </Title>
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
