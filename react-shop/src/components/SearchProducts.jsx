import styled from "styled-components";
import Product from "./Product";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 70px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchProducts = () => {

  const productSearch = useSelector((state) => state.shop.search);

  return (
    <Container>
      {productSearch.map((item, index) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default SearchProducts;
