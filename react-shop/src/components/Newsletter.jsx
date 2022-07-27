import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 80vh;
  background-size: cover;
  background-image: url("https://i.ibb.co/V9nRGkN/air-jordan-1-retro-high-og-newstalgia-dj4891-061-3.webp");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  padding: 0px 150px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  color: Black;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 35px;
  font-weight: 300;
  color: white;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;


const Button = styled.button`
    border:none;
    padding: 15px 50px;
    background-color: rgb(0,0,0,0.5);
    color:white;
    cursor: pointer;
    font-weight: 600;
`;


const Newsletter = () => {
  return (
    <Container>
        <Title>Air Jordan 1 Retro High OG “Newstalgia”</Title>
        <Desc>Women’s-exclusive Air Jordan 1 Retro High OGs are the new tradition for the summer, and in 2022 Jordan Brand is continuing this modern day institution with the “Newstalgia” colorway.</Desc>
        <Button>SHOP NOW</Button>    
    </Container>
  );
};

export default Newsletter;
