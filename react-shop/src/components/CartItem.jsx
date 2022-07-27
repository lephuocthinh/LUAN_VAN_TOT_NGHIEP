import styled from "styled-components";
import { mobile } from "../responsive";
import { Clear } from "@material-ui/icons";
import util from "../Util/util";
import { useDispatch } from "react-redux";
import { ADJUST_ITEM_QTY, REMOVE_FROM_CART } from "../redux/cartSlice";


const Container = styled.div`
  margin: 5px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Delete = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 35%;
`;

const ProductAmount = styled.input`
  text-align: center;
  width: 30%;
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const CartItem = ({ item}) => {

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    if (e.target.value > 0) {
      var product = {...item};
      product.qty = Number(e.target.value);
     
      dispatch(ADJUST_ITEM_QTY(product));
    } else if (Number(e.target.value) === 0) {
      dispatch(REMOVE_FROM_CART(item));
    }
  };

  const handlerRemoveFromCart = () => {
     dispatch(REMOVE_FROM_CART(item));
   
  };

  return (
    <Container>
      <Product>
        <ProductDetail>
          <Image
            src={`${process.env.REACT_APP_API_URL}/${
              item.productImage.split(",")[0]
            }`}
            key={item._id}
          />
          <Details>
            <ProductName>
              <b>Product:</b> {item.product.name}
            </ProductName>
            <ProductId>
              <b>ID:</b> {item._id}
            </ProductId>
            <ProductColor color={item.color} />
            <ProductSize>
              <b>Size:</b> {item.size}
            </ProductSize>
          </Details>
        </ProductDetail>
        <PriceDetail>
          <ProductAmountContainer>
            <ProductAmount
              min="1"
              type="number"
              id="qty"
              name="qty"
              value={item.qty}
              onChange={onChangeHandler}
            />
          </ProductAmountContainer>
          <ProductPrice>{util(item.price * item.qty)}</ProductPrice>
        </PriceDetail>
        <Delete>
          <Clear onClick={() => handlerRemoveFromCart()} />
        </Delete>
      </Product>
      <Hr />
    </Container>
  );
};

export default CartItem;
