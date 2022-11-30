import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import "../styles/home.css"
import Button from 'react-bootstrap/Button';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
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
*/