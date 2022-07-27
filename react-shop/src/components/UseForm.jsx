import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailed, loginSuccess, registerFailed, registerSuccess } from "../redux/authSlice";

const UseForm = (validate) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginUser = async () => {
    try {
      const response = await userApi.loginUser(values);
      dispatch(loginSuccess(response));
      navigate("/");
    
    } catch (error) {
      dispatch(loginFailed());
    }
  };

  const registerUser = async () => {
    try {
      await userApi.registerUser(values);
      dispatch(registerSuccess());
      navigate("/Login");
    
    } catch (error) {
      dispatch(registerFailed());
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    registerUser();
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    loginUser();
  };

  return { handleChange, handleSubmit, handleSubmitLogin, values, errors };
};

export default UseForm;
