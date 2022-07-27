import {
  Add,
  Remove,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import {  useState } from "react";
import util from "../Util/util";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../redux/cartSlice";
import Comment from "../components/Comment";

const Container = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  padding: 50px 0px;
  display: flex;
  padding-left: 50px;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  position: relative;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  background-color: #ffffff;
  z-index: 2;
  flex: 1;
  padding: 50px 50px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  margin-right: 10px;
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #bcb7b7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const WrapperImage = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -44}vw);
`;

const Product = () => {

  const product = useSelector((state)=> state.shop.product);
  const sizes = useSelector((state)=> state.shop.size);
  const dispatch = useDispatch();

  //chuyển hình
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (
    direction,
    length = product.productImage.split(",").length
  ) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : length - 1);
    } else {
      setSlideIndex(slideIndex < length - 1 ? slideIndex + 1 : 0);
    }
  };
  //lấy size
  const [size, setsize] = useState("");

  //cập nhật số lượng
  const [qty, setQty] = useState(1);
  const handleqty = (sl) => {
    if (sl === "minus") {
      setQty(qty > 1 ? qty - 1 : qty);
    } else {
      setQty(qty < 99 ? qty + 1 : qty);
    }
  };

  const handleAddToCart = () => {
    if (size === "") {
      alert("Vui lòng chọn Size !!!");
    } else {
      var item = {...product};
      item.qty = qty;
      item.size = size;
      dispatch(ADD_TO_CART(item));
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined />
          </Arrow>
          <WrapperImage slideIndex={slideIndex}>
            {product.productImage
              ? product.productImage
                  .split(",")
                  .map((item, index) => (
                    <Image src={`${process.env.REACT_APP_API_URL}/${item}`} key={index}/>
                  ))
              : "Loading..."}
          </WrapperImage>
          <Arrow direction="right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined />
          </Arrow>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.product?.name}</Title>
          <Desc>{product.product?.description}</Desc>
          <Price>{product.price ? util(product.price) : ""}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color:</FilterTitle>
              <FilterColor color={product.color} />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                id="idSize"
                value={size}
                onChange={(e) => setsize(e.target.value)}
              >
                <FilterSizeOption selected>--- Size ---</FilterSizeOption>
                {sizes
                  ? sizes.map((item, index) => (
                      <FilterSizeOption value={item.size} key={index}>
                        {item.size}
                      </FilterSizeOption>
                    ))
                  : ""}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleqty("minus")} />
              <Amount>{qty}</Amount>
              <Add onClick={() => handleqty("plus")} />
            </AmountContainer>
            <Button onClick={() => handleAddToCart()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <center>
        <Title>Related Products</Title>
      </center>
      {
        product.product?._id?
        <RelatedProducts productId={product.product?._id} productDetailId = {product?._id}/>
        :
        ""
      }
      <Comment/>
      <Footer />
    </Container>
  );
};

export default Product;
