import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
  
    return (
      <Container className='text-center d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
        <div style={{display: "Grid", gap: "1rem"}}>
          <h1>404 Page not Found</h1>
          <img src='/images/pageNotFound.jpg' style={{ width: '100%', height: 'auto' }} alt='404' />
          <Button onClick={() => navigate('/')}>Go To Home</Button>
        </div>
      </Container>
    );
  };
  

export default NotFoundPage;
