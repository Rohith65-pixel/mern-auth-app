import { Nav,Navbar,Container,NavDropdown } from "react-bootstrap";
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";

function Header()  {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    }
    catch(error) {
      console.log(error)
      toast.error(err.data.message || "Logout failed");
    }
  }

  const {userInfo} = useSelector((state) => state.auth);
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>

          <LinkContainer to='/'>
            <Navbar.Brand >
              {userInfo ?  'Welcome ' + userInfo.name :  'MERN Auth'}
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                <NavDropdown title={userInfo.name} id='username'>

                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/update">
                    <NavDropdown.Item>
                      Update Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/logout">
                    <NavDropdown.Item onClick={logoutHandler}>
                      LogOut
                    </NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
                </>
              ) : (
                <><LinkContainer to='/login'>
                <Nav.Link >
                  <FaSignInAlt/> Sign In
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/register'>
                  <Nav.Link>
                    <FaSignOutAlt/> Sign Up
                  </Nav.Link>
              </LinkContainer></>
              ) }
              
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
}

export default Header;