import React from 'react'
import { Box, Tab, Tabs, Typography, TextField, } from "@material-ui/core";
import { StarTwoTone } from "@material-ui/icons";
import styled from "styled-components";
import PropTypes from 'prop-types';
import Reviews from "./Reviews";


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  margin: 0px 150px;
`;

const Text = styled.h4`
  font-size: 35px;
  padding-left: 70px;
`;

const Button = styled.button`
    border:none;
    border-radius: 5px;
    padding: 15px 50px;
    margin: 30px 70px;
    font-size: 20px;
    background-color: teal;
    color:white;
    cursor: pointer;
    font-weight: 600;
`;

const Icondemo = styled.p`
  
  padding: 30px 130px;
`;

const Note = styled.p`
  font-style: italic;
  color: lightslategray;
  padding: 10px 70px;
  display: flex;
  justify-content: flex-end;
`;


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Comment = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="REVIEWS" {...a11yProps(0)} />
          <Tab label="COMMENT" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={1} sx={{ innerHeight: '100px' }}>
        <Reviews/>
      </TabPanel>
      <TabPanel value={value} index={0}>
      <Text>Đánh giá </Text>
      <Icondemo>
          <StarTwoTone fontSize="large" />
          <StarTwoTone fontSize="large" />
          <StarTwoTone fontSize="large" />
          <StarTwoTone fontSize="large" />
          <StarTwoTone fontSize="large" />
        </Icondemo>
      {/* <Stack spacing={1}>
      <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
      </Stack> */}
      <Text>Bình luận</Text>
      <Box sx={{ paddingLeft: 50, width: '90%', maxWidth: '100%', }}>
        <TextField fullWidth label="Nhập Bình luận..." id="fullWidth" />
      </Box>
      <Note>Tối đa 120 ký tự</Note>
      <Button>Bình luận</Button>
      </TabPanel>
    </Box>
    </Container>
  );
};

export default Comment