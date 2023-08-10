import styled from "styled-components";

const Header = styled.header`
  background-color: #373b69;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: "Roboto", sans-serif;
  color: #fff;
  margin: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Logo = styled.span`
  font-size: 2.5rem;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    margin: 0; /* Remove the right margin */
    margin-bottom: 0.5rem; /* Add margin to the bottom for spacing */
    text-align: center; /* Center the logo horizontally */
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centralizar verticalmente */

  @media (max-width: 768px) {
    margin: 0.5rem 0 1rem 0; /* Adicionar margem no topo em visualização mobile */
    width: 100%; /* Para garantir que o input ocupe toda a largura disponível */
  }
`;

const Search = styled.input`
  background-color: transparent;
  border: 2px solid #22254b;
  border-radius: 50px;
  color: #fff;
  font-family: inherit;
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;
  max-width: 100%; /* Prevent horizontal scrolling */

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
        </SearchContainer>
      </form>
    </Header>
  );
}

export default HeaderWithSearch;
