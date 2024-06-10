import Slider from "../../components/slider/Slider.jsx";
import Map from "../../components/map/Map.jsx";
import "./singlePage.scss";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../http/index.js";
import DOMPurify from "dompurify";

const SinglePage = () => {
  const user = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(true);
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const navigate = useNavigate();
  const params = useParams();

  const handleSave = async () => {
    if (!user) {
      navigate("/login");
    } else {
      setSaved((prev) => !prev);
      await http.post("/user/save", { postId: post.id }).catch((err) => {
        console.log(err);
        setSaved((prev) => !prev);
      });
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">Rs. {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities == "owner" ? (
                  <p>Owner is Responsible</p>
                ) : (
                  <p>Tenet is Responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet == "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby places</p>
          <div className="listHorizontal">
            <div className="size">
              <img src="/school.png" alt="" />
              <span>School</span>
              <p>
                {post.postDetail.school > 999
                  ? post.postDetail.school / 1000 + " km"
                  : post.postDetail.school + " m"}{" "}
                away
              </p>
            </div>
            <div className="size">
              <img src="/bus.png" alt="" />
              <span>Bus Stop</span>
              <p>
                {post.postDetail.bus > 999
                  ? post.postDetail.bus / 1000 + " km"
                  : post.postDetail.bus + " m"}{" "}
                away
              </p>
            </div>
            <div className="size">
              <img src="/restaurant.png" alt="" />
              <span>Restaurant</span>
              <p>
                {post.postDetail.restaurant > 999
                  ? post.postDetail.restaurant / 1000 + " km"
                  : post.postDetail.restaurant + " m"}{" "}
                away
              </p>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              <span> Send a Message</span>
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              <span> {saved ? "Location Saved" : "Save Location"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
