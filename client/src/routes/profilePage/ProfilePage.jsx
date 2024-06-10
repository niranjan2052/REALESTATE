import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { useDispatch, useSelector } from "react-redux";
import "./profilePage.scss";
import { removeStorage } from "../../lib";
import http from "../../http";
import { toast } from "react-toastify";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { clearUser } from "../../store";
import { Suspense } from "react";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.value);
  const data = useLoaderData();
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
          {/* //To show posts */}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          {/* to show saved posts */}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          {/* to show chat */}
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
