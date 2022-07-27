import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/SearchProducts";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const ProductList = () => {
 
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>Search</Title>
      <Products />
      <Footer />
    </Container>
  );
};

export default ProductList;
