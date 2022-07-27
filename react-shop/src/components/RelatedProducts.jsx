import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";

const Container = styled.div`
  padding: 70px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const RelatedProducts = ({ productId, productDetailId }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (productId) {
      const fetchProductList = async () => {
        try {
          const response = await productApi.getProductByProduct(productId);
          setProductList(response.productDetails);
        } catch (error) {
          console.log("Failed to fetch product list: ", error);
        }
      };

      fetchProductList();
    }
  }, []);

  const relatedProducts = productList.filter(item => item._id !== productDetailId)

  return (
    <Container>
      {relatedProducts.map((item, index) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default RelatedProducts;
