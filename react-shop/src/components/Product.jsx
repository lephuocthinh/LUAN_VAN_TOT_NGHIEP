import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import util from "../Util/util";
import { useDispatch } from "react-redux";
import { LOAD_CURRENT_ITEM, ALL_SIZE_PRODUCT } from "../redux/cartSlice";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  color: #080808;
  z-index: 2;
  bottom: 8%;
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: 300;
  position: absolute;
  color: #080808;
  z-index: 2;
  bottom: 0%;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {

  const [sizes, setSizes] = useState([]);
  //lấy size sản phẩm
  const fetchSizeList = async () => {
    try {
      const response = await productApi.getSizeProduct(item._id);

      setSizes(response.sizes);
    } catch (error) {
      console.log("Failed to fetch sizes list: ", error);
    }
  };

  useEffect(() => {
    fetchSizeList();
  }, []);
  const dispatch = useDispatch();

  const handleProductDetail = ()=>{
    dispatch(LOAD_CURRENT_ITEM(item));
    dispatch(ALL_SIZE_PRODUCT(sizes));
  }

  return (
    <Container>
      <Circle />
      <Image
        src={`${process.env.REACT_APP_API_URL}/${
          item.productImage.split(",")[0]
        }`}
        key={item._id}
      />
      <Title>{item.product.name}</Title>
      <Price>{util(item.price)}</Price>
      <Info>
        
        <Icon>
          <Link to={`/Product-Detail`}>
            <SearchOutlined onClick={() => handleProductDetail()}/>
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
