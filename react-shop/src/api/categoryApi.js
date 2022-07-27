import axiosClient from "./axiosClient";

class CategoryApi {
  getAll = (params) => {
    const url = "api/categories";
    return axiosClient.get(url, { params });
  };

  getCategory = (id) => {
    const url = `api/categories/${id}`;
    return axiosClient.get(url);
  };

}
const categoryApi = new CategoryApi();
export default categoryApi;
