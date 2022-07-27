import axiosClient from "./axiosClient";

class ProductApi {
  getAll = (params) => {
    const url = "api/productDetails";
    return axiosClient.get(url, { params });
  };

  getProduct = (id) => {
    const url = `api/productDetails/${id}`;
    return axiosClient.get(url);
  };

  getSizeProduct = (id) => {
    const url = `api/sizes/product/${id}`;
    return axiosClient.get(url);
  };

  getProductByColor = (color) => {
    const url = `api/productDetails/color/${color}`;
    return axiosClient.get(url);
  };

  getProductByGender = (gender) => {
    const url = `api/productDetails/gender/${gender}`;
    return axiosClient.get(url);
  };
  
  getProductByProduct = (productId) => {
    const url = `api/productDetails/product/${productId}`;
    return axiosClient.get(url);
  };

  getProductBySort = (sort) => {
    const url = `api/productDetails/sort/${sort}`;
    return axiosClient.get(url);
  };

  getProductByName = (name) => {
    const url = `api/products/search/${name}`;
    return axiosClient.get(url);
  };




}
const productApi = new ProductApi();
export default productApi;
