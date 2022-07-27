import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { mobile } from "../responsive";
import styled from "styled-components";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";


const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 0px;
  margin-top: 100px;
`;

const Light = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`; 

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;
const Home = () => {

  const [products, setProducts] = useState([]);
 

  const handleChange = (e) => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductByColor(e.target.value);
        setProducts(response.productDetail);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  };

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <center>
      <Title>Sale Off</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      </center>
      <Products products = {products}/>
      <Newsletter/>
      <center>
      <Title>Trending</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      </center>
      <Products products = {products}/>
      <Light/>
      <center>
      <Title>More Nike</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      </center>
      <Categories />
      <Footer/>
    </div>
  )
};

export default Home;
