import styled from "styled-components";
import UseForm from "../components/UseForm";
import { mobile } from "../responsive";
import validate from "../components/validateInfo";
import { useSelector, useDispatch } from "react-redux";
import checkoutApi from "../api/checkoutApi";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART, CLEAR_INFO } from "../redux/cartSlice";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 96%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const P = styled.p`
  color: red;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0 auto;
  display: block;
`;

const Payment = () => {
  const { handleChange, values, errors } = UseForm(validate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.shop.cart);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const createOrder = async () => {
      try {
        let price = 0;
        cart?.forEach((item) => {
          price += item.qty * item.price;
        });
        const res = await checkoutApi.order({
          user: currentUser._id,
          products: cart?.map((item) => ({
            productDetail: item._id,
            quantity: item.qty,
            size: item.size,
            price: item.price,
            total: item.price * item.qty,
          })),
          amount: price,
          address: values.address,
          paymentMethod: "cash",
        });
        setOrderId(res._id);
      } catch {}
    };
    createOrder();
    dispatch(CLEAR_CART());
    navigate("/");
  }

  return (
    <Container>
      <Wrapper>
        <Title>Payment</Title>
        <Form onSubmit={handleSubmit}>

        <Input
            name="address"
            placeholder="address"
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && <P>{errors.address}</P>}

          <Input value="Hình thức thanh toán: Tiền mặt" readOnly />

          <Input value={`Tổng tiền là ${45}`} readOnly />
          
          <Button type="submit">Thanh toán</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Payment;
