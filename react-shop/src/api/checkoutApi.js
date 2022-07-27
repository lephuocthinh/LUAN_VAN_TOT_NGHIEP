import axiosClient from "./axiosClient";

class CheckoutApi {
  checkout = (checkout) => {
    const url = "api/checkout/payment";
    return axiosClient.post(url, checkout);
  };

  order = (order) => {
    const url = "api/orders";
    return axiosClient.post(url, order);
  };

}
const checkoutApi = new CheckoutApi();
export default checkoutApi;
