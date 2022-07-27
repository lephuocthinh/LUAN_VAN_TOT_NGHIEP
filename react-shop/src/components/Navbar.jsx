import { Badge, Fade, Menu, MenuItem, Button } from "@material-ui/core";
import {
  Search,
  ShoppingCartOutlined,
  KeyboardArrowDownRounded,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logOutSuccess } from "../redux/authSlice";
import { LOAD_SEARCH } from "../redux/cartSlice";
import productApi from "../api/productApi";

const Container = styled.div`
  height: 100px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  color: #0004ff;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 20%;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  ${mobile({ width: "50px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 60px;
  margin-right: 20px;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItems = styled.div`
  font-size: 15x;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login.currentUser);
  const cart = useSelector((state) => state.shop.cart);
  const categories = useSelector((state) => state.shop.category);
  const products = useSelector((state) => state.shop.products);


  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart?.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutSuccess());
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const [name, setName] = useState("");
  const [search1, setSearch1] = useState([]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProductByName(name);
   
        setSearch1(response.products);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();

    var productSearch = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < search1.length; j++) {
        if(products[i].product._id === search1[j]._id)
          productSearch.push(products[i]);
      }
    }

    dispatch(LOAD_SEARCH(productSearch));
    if(productSearch.length !== 0)
      navigate("/Search");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo onClick={() => navigate("/")}>NIKE</Logo>
          <Button>
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              HOME
            </Link>
          </Button>
          <Button
           
          >
            <Link
              to="/product-list"
              style={{ color: "black", textDecoration: "none" }}
            >
              PRODUCT
            </Link>
           
          </Button>
          {/* <Button
            id="fade-bacbutton"
            aria-controls={open1 ? "fade-menu" : undefined}
            aria-haspopup="false"
            aria-expanded={open1 ? "false" : undefined}
            onClick={handleClick1}
          >
            <Link
              to="/product-list"
              style={{ color: "black", textDecoration: "none" }}
            >
              CATEGORY
            </Link>
            <KeyboardArrowDownRounded fontSize="medium" />
          </Button>
          <Menu
            style={{ marginTop: "50px" }}
            id="fade-menu"
            MenuListProps={{ "aria-labelledby": "fade-button" }}
            anchorEl={anchorEl1}
            open={open1}
            onClose={handleClose1}
            TransitionComponent={Fade}
          >
            {categories.map((category) => (
              <MenuItem key={category._id}>{category.name}</MenuItem>
            ))}
          </Menu> */}
        </Left>
        <Right>
          <SearchContainer onSubmit={handleSubmitSearch}>
            <Input placeholder="Search" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
          {user ? (
            <>
              <MenuItems>
                Hi, <Name> {user.name} </Name>
              </MenuItems>
              <MenuItems onClick={handleLogout}>Logout</MenuItems>
            </>
          ) : (
            <>
              <MenuItems onClick={() => navigate("/Register")}>
                REGISTER
              </MenuItems>
              <MenuItems onClick={() => navigate("/Login")}>SIGN IN</MenuItems>
            </>
          )}

          <MenuItem onClick={() => navigate("/Cart")}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
