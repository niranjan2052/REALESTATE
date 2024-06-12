import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { useSelector } from "react-redux";
import http from "../../http";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import relativeTime from "dayjs/plugin/relativeTime";
import { SocketContext } from "../../context/SocketContext";
dayjs.extend(relativeTime);

const Chat = ({ chats }) => {
  const user = useSelector((state) => state.user.value);
  const [chatInfo, setChatInfo] = useState(null);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  useEffect(() => {
    const notificationHandler = async () => {
      await http
        .get("user/notification")
        .then(({ data }) => {
          console.log(data);
          dispatch(setNotification(data));
        })
        .catch(() => {})
        .finally(() => {});
    };
    notificationHandler();
  }, [chatInfo]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatInfo]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await http.get(`/chats/${id}`);
      setChatInfo({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await http
        .post("/messages/" + chatInfo.id, values)
        .then(({ data }) => {
          setChatInfo((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          socket.emit("sendMessage", {
            receiverId: chatInfo.receiver.id,
            data,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setSubmitting(false);
        });
      formik.resetForm();
    },
  });

  useEffect(() => {
    const read = async () => {
      try {
        await http.put("/chats/read/" + chatInfo.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (chatInfo && socket) {
      socket.on("getMessage", (data) => {
        if (chatInfo.id === data.chatId) {
          setChatInfo((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chatInfo]);

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
                backgroundColor:
                  chat.seenBy.includes(user.id) || chatInfo?.id == chat.id
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
                <div
                  className="chatMessage"
                  style={{
                    alignSelf:
                      message.userId === user.id ? "flex-end" : "flex-start",
                    textAlign: message.userId === user.id ? "right" : "left",
                  }}
                  key={message.id}
                >
                  <p>{message.text}</p>
                  <span>{dayjs(message.createdAt).fromNow()}</span>
                </div>
              );
            })}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={formik.handleSubmit} className="bottom">
            <textarea
              name="text"
              id="text"
              value={formik.values.text}
              onChange={formik.handleChange}
            ></textarea>
            <button type="submit" disabled={formik.isSubmitting}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
