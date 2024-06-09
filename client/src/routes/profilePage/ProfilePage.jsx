import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { useDispatch, useSelector } from "react-redux";
import "./profilePage.scss";
import { removeStorage } from "../../lib";
import http from "../../http";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../store";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    http
      .post("/auth/logout")
      .then(({ data }) => {
        removeStorage("user");
        dispatch(clearUser());
        toast.success(data.message);
        navigate("/");
      })
      .catch(() => {})
      .finally(() => {});
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/updateProfile">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={user.avatar || "/noAvatar.jpeg"} alt="" />
            </span>
            <span>
              Username: <b>{user.username}</b>
            </span>
            <span>
              E-mail: <b>{user.email}</b>
            </span>
            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/newPostPage">
              <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
