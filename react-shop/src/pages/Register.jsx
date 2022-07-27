import styled from "styled-components";
import UseForm from "../components/UseForm";
import { mobile } from "../responsive";
import validate from "../components/validateInfo";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 96%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const P = styled.p`
  color: red;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0 auto;
  display: block;
`;

const Register = () => {
  const { handleChange, handleSubmit, values, errors } = UseForm(validate);
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <P>{errors.name}</P>}
          <Input
            type="number"
            name="phone"
            placeholder="phone"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <P>{errors.phone}</P>}
          <Input
            name="address"
            placeholder="address"
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && <P>{errors.address}</P>}
          <Input
            name="email"
            type="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <P>{errors.email}</P>}
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <P>{errors.password}</P>}
          <Input
            type="password"
            name="confirmpassword"
            placeholder="confirm password"
            value={values.confirmpassword}
            onChange={handleChange}
          />
          {errors.confirmpassword && <P>{errors.confirmpassword}</P>}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
