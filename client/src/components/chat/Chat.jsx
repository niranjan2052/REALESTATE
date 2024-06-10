import { useEffect, useState } from "react";
import "./chat.scss";
import { useSelector } from "react-redux";
import http from "../../http";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Chat = ({ chats }) => {
  const user = useSelector((state) => state.user.value);
  const [chatInfo, setChatInfo] = useState(null);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await http.get(`/chats/${id}`);
      setChatInfo({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((chat) => {
          return (
            <div
              className="message"
              key={chat.id}
              style={{
                backgroundColor: chat.seenBy.includes(user.id)
                  ? "white"
                  : "#fecd514e",
              }}
              onClick={() => handleOpenChat(chat.id, chat.receiver)}
            >
              <img src={chat.receiver.avatar || "/noAvatar.jpeg"} alt="" />
              <span>{chat.receiver.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          );
        })}
      </div>
      {chatInfo && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chatInfo.receiver.avatar || "/noAvatar.jpeg"} alt="" />
              {chatInfo.receiver.username}
            </div>
            <span className="close" onClick={() => setChatInfo(null)}>
              +
            </span>
          </div>
          <div className="center">
            {chatInfo.messages.map((message) => {
              return (
                <div className="chatMessage own" key={message.id}>
                  <p>{message.text}</p>
                  <span>{dayjs(message.createdAt).fromNow()}</span>
                </div>
              );
            })}
          </div>
          <div className="bottom">
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
