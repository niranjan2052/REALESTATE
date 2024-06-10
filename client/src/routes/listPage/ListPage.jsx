import "./listPage.scss";
import Filter from "../../components/filter/Filter.jsx";
import Card from "../../components/card/Card.jsx";
import Map from "../../components/map/Map.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../http/index.js";

const ListPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = location.search;
  useEffect(() => {
    setLoading(true);
    http
      .get(`/posts/${query}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {console.log(err);})
      .finally(() => {
        setLoading(false);
      });
  }, [query]);
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
};

export default ListPage;
