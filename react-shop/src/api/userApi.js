import axiosClient from "./axiosClient";

class UserApi {

  registerUser = (user) => {
    const url = `api/user/signup`;
    return axiosClient.post(url, user);
  };

  loginUser = (user) => {
    const url = `api/user/login`;
    return axiosClient.post(url, user);
  };

}
const userApi = new UserApi();
export default userApi;
