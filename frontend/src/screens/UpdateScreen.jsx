import FormContainer from "../components/FormContainer.jsx";
import { useEffect, useState } from "react";
import { Form,Button,Row,Col, Spinner } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../slices/userApiSlice.js";

 const UpdateScreen = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state)=> state.auth)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      toast.error('Login to Update Profile');
    }
  }, [userInfo, navigate]);

  const [updateProfile,{isLoading}] = useUpdateProfileMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if(password != confirmPassword) {
      toast.error('Incorrect Conforimation Password!')
      return;
    }

    try {
      const res = await updateProfile({name,email,password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/');
      toast.success('Update Sucessfull!')
    }
    catch(error) {
      console.log(error);
      toast.error(error.data.message);
    }

  }

  return(
    <FormContainer>
      <h1>Update Details</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
          type="text"
          placeholder="Enter New Name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">

          <Form.Label>
            Email Address
          </Form.Label>

          <Form.Control type="email"
          placeholder="Enter New email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>

        </Form.Group>

        <Form.Group className="my-2" controlId="password">

          <Form.Label>
            Password
          </Form.Label>

          <Form.Control type="password"
          placeholder="Enter New Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>

        </Form.Group>
        
        <Form.Group className="my-2" controlId="ConfirmPassword">

          <Form.Label>
            Confirm Password
          </Form.Label>

          <Form.Control type="password"
          placeholder="Confirm New Password" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>

        </Form.Group>

        {isLoading && <Spinner/>}

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>Update</Button>
      </Form>
    </FormContainer>
  );
 };

 export default UpdateScreen;