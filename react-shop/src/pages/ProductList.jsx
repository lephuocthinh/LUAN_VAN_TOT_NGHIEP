import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useState } from "react";
import productApi from "../api/productApi";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const categories = useSelector((state) => state.shop.category);
  const t = useSelector((state) => state.shop.products);
  const [products, setProducts] = useState([]);

  const handleChangeColor = (e) => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductByColor(e.target.value);
        setProducts(response.productDetails);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  };

  const handleChangeGender = (e) => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductByGender(e.target.value);
        setProducts(response.productDetails);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  };

  const handleChangeCategory = (e) => {
    setProducts(t.filter(item => {
      if(item.product.category._id === e.target.value)
        return item;
    }))
  };

  const handleSortByPrice = (e) => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductBySort(e.target.value);
        setProducts(response.productDetails);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>NIKE - Just Do It.</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select onChange={(e) => handleChangeColor(e)}>
            <Option disabled selected>
              Color
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select onChange={(e) => handleChangeGender(e)}>
            <Option disabled selected>
              Gender
            </Option>
            <Option value="1">Men</Option>
            <Option value="0">Women</Option>
          </Select>
          <Select onChange={(e) => handleChangeCategory(e)}>
            <Option disabled selected>
              Category
            </Option>
            {categories.map((category) => (
              <Option value={category._id} key={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort by:</FilterText>
          <Select  onChange={(e) => handleSortByPrice(e)}>
            <Option disabled selected>--Sort--</Option>
            <Option value="1">Price: Low - High</Option>
            <Option value="-1">Price: High - Low</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products products={products} />
      <Newsletter />
      <Light/>
      <Footer />
    </Container>
  );
};

export default ProductList;
