import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import checkoutApi from "../api/checkoutApi";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART, CLEAR_INFO } from "../redux/cartSlice";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.shop.info);
  const cart = useSelector((state) => state.shop.cart);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [orderId, setOrderId] = useState(null);

  const handleClick = () => {
    dispatch(CLEAR_CART());
    dispatch(CLEAR_INFO());
    navigate("/");
  };

  useEffect(() => {
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
          address: data.billing_details.address,
          paymentMethod: data.payment_method_details.card,
          paymentStatus: data.status
        });
        setOrderId(res._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button
        onClick={() => handleClick()}
        style={{ padding: 10, marginTop: 20 }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
