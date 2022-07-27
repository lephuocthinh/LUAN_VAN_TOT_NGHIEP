import styled from "styled-components";
import { mobile } from "../responsive";

import { useNavigate } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 15px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/product-list");
  };

  return (
    <Container>
      <Image
        src={`${process.env.REACT_APP_API_URL}/${item.categoryImage}`}
        key={item.id}
      />
      <Info>
        <Title>{item.name}</Title>
        <Button onClick={() => handleOnClick()}>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
