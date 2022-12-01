import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import "../styles/home.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../images/parking1.png"
import image2 from "../images/parking2.png"
import image3 from "../images/parking3.png"

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container fluid="md" >
    <Row>
      <Col> <h1 style={{fontSize:60}}>ParkingApp</h1></Col>
      <h3 className="home-h3">The way people book parking, <i>reimagined</i>.</h3>
    </Row>
    <Row>
      <Col>  
        <p className="home-p">
          Welcome to <b>ParkingApp</b>, the <u><i>best</i></u> long term parking solution.
        </p>
        
        <span className="home-span">
        <Button href="/about" variant="dark">Learn More</Button>
        </span></Col>
    </Row>
    

    <Row>
      
    <Carousel className="carouselTest">
      <Carousel.Item interval={1000} >
        <img
          className="d-block carouselItem"
          src={image1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1000} >
        <img
          className="d-block carouselItem"
          src={image2}
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />
        
      </Carousel.Item>
    </Carousel>
    </Row>
    <Row>
      
    </Row>
  </Container>
  );
};

export default Home;
/* Old
const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <section>
      {user && <UserInfo user={user} />}
      <h1>You are on home page!</h1>
    </section>
  );
};
  OLD MAIN PAGE

  <section>
    <div clasName="home-bg">
      <div className="home-content">
        <h1 className="home-h1">ParkingApp</h1>
        <h3 className="home-h3">The way people book parking, <i>reimagined</i>.</h3>
        <p className="home-p">
          Welcome to <b>ParkingApp</b>, the <u><i>best</i></u> long term parking solution.
        </p>
        <span className="home-span">
        <Button href="/about" variant="dark">Learn More</Button>
        </span>
      </div>
    </div>
  </section>



*/