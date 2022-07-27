import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";
import categoryApi from "../api/categoryApi";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CATEGORY } from "../redux/cartSlice";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
      
        const response = await categoryApi.getAll();
        console.log("Fetch categories successfully: ", response);

        setCategoryList(response.categories);
      } catch (error) {
        console.log("Failed to fetch categories list: ", error);
      }
    };
    fetchCategoryList();
  }, []);

  dispatch(LOAD_CATEGORY(categoryList));

  return (
    <Container>
      {categoryList.map((item) => (
        <CategoryItem item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Categories;
