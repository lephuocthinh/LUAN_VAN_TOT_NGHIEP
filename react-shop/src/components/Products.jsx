import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PRODUCTS } from "../redux/cartSlice";

const Container = styled.div`
  padding: 70px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ products }) => {

  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getAll();
        setProductList(response.productDetails);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  }, []);

  dispatch(LOAD_PRODUCTS(productList));

  return (
    <Container>
      {products.length > 0
        ? products.map((item) => <Product item={item} key={item._id} />)
        : productList.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
