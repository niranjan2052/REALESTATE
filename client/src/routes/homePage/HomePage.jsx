import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Real Estate Without the Hassle. Your Dream Home Awaits.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quidem
            qui aut consequatur culpa provident hic sequi magnam quo obcaecati
            dicta illo deserunt quae est corrupti adipisci excepturi, laudantium
            et.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>20</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>120+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.jpeg" alt="bg_img" />
      </div>
    </div>
  );
};

export default HomePage;
