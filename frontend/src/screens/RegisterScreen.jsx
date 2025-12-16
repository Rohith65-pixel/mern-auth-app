import FormContainer from "../components/FormContainer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form,Button,Row,Col, Spinner } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice.js";

 const RegisterScreen = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state)=> state.auth)

  const [Register,{isLoading}] = useRegisterMutation();

  useEffect(() => {
    if(userInfo) {
      navigate('/')
    }
  },[userInfo,navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if(password != confirmPassword) {
      toast.error('Incorrect Confrimation Password!')
      return;
    }

    try {
      const res = await Register({name,email,password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/');
      toast.success('Registration Sucessfull!')
    }
    catch(error) {
      console.log(error);
      toast.error(error.data.message);
    }

  }

  return(
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">

          <Form.Label>
            Email Address
          </Form.Label>

          <Form.Control type="email"
          placeholder="Enter email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>

        </Form.Group>

        <Form.Group className="my-2" controlId="password">

          <Form.Label>
            Password
          </Form.Label>

          <Form.Control type="password"
          placeholder="Enter Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>

        </Form.Group>
        
        <Form.Group className="my-2" controlId="ConfirmPassword">

          <Form.Label>
            Confirm Password
          </Form.Label>

          <Form.Control type="password"
          placeholder="Confirm Password" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>

        </Form.Group>

        {isLoading && <Spinner/>}

        <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
        <Row className="py-3">
          <Col>
            Already Registered? <Link to='/login'>Log In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
 };

 export default RegisterScreen;