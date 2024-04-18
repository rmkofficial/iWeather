import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <h2>
        <Link to="/weather">Weather</Link>
      </h2>
    </>
  );
};

export default Home;
