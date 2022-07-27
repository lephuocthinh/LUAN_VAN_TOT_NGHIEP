import React from 'react'
import styled from "styled-components";
import { StarTwoTone } from "@material-ui/icons";


const Container = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  background-color: rgb(0,0,0,0.05);
  border-radius: 10px;
  margin: 20px 20px;
  padding: 20px 20px;
`;
 

const Rate = styled.div`
    font-size: large;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`;

const Name = styled.h4`
    font-size: 35px;
    padding: 10px 0px;
`;

const Text = styled.p`
    padding: 10px 30px;
`;

const Date = styled.p`
    font-style: italic;
    font-size: 18px;
    margin: 20px 0px;

`;
const Reviews = () => {
  return (
    <Container>
    <Rate >Đánh giá: 
        &nbsp;         
        <StarTwoTone fontSize="medium" />
        <StarTwoTone fontSize="medium" />
        <StarTwoTone fontSize="medium" />
        <StarTwoTone fontSize="medium" />
        <StarTwoTone fontSize="medium" />
    </Rate>
    <Name>"Nguyễn Văn Tèo"</Name>
    <Text>
    Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has ut. Rebum laudem cum ea, ius essent fuisset ut. Viderer petentium cu his.Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has ut. Rebum laudem cum ea, ius essent fuisset ut. Viderer petentium cu his.
    </Text>
    <Date>Date: 18-07-2022.</Date>
    </Container>
  )
}

export default Reviews