import { Container, Spinner, Card, Button } from "react-bootstrap";
import { useProfileQuery } from "../slices/userApiSlice";
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
   
  const navigate = useNavigate();

  const { isLoading, data, error } = useProfileQuery();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      toast.error('Login to view Profile');
    }
  }, [userInfo, navigate]);

  if (isLoading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="border"/></div>;
  if (error) return <div className="text-center mt-5 text-danger">Failed to load profile data.</div>;

  return (
    <>
      {data && (
        <Container className="d-flex justify-content-center mt-5">
          <Card className="p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
            
            <div className="text-center mb-3">
              <FaUserCircle size={80} className="text-secondary" />
              <h2 className="mt-3">{data.name}</h2>
              <p className="text-muted">{data.email}</p>
            </div>

            <Card.Body className="border-top">
              <div className="d-flex justify-content-between py-2">
                <strong>User ID:</strong>
                <span>{data._id}</span>
              </div>
              
              <div className="mt-4 text-center">
                <Link to='/update'>
                  <Button variant="primary">Edit Profile</Button>
                </Link>
              </div>

            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
};

export default Profile;