import { Divider } from "@mui/material";
import React, { useState } from "react";
import "../chat-box/chat-box.css";
import FooterChat from "./footer-chat";
import HeaderChat from "./header-chat";
import Messages from "./messages";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is HoneyChat", img: null },
    { from: "me", text: "Hey there", img: null },
    { from: "me", text: "Myself Ferin Patel", img: null },
    {
      from: "computer",
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
      img: null,
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [imageInput, setImageInput] = useState("");

  console.log(imageInput);
  const handleSendMessage = () => {
    // if (!inputMessage.trim().length) {
    //   return;
    // }
    const data = inputMessage;
    const image = imageInput;

    setMessages((old) => [...old, { from: "me", text: data, img: image }]);
    setInputMessage("");
    setImageInput("");

    setTimeout(() => {
      setMessages((old) => [
        ...old,
        { from: "computer", text: data, img: image },
      ]);
    }, 1000);
  };

  return (
    <div className="chat_box_container">
      {/* <HeaderChat /> */}
      <Divider />
      <Messages messages={messages} />
      <FooterChat
        imageInput={imageInput}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        setImageInput={setImageInput}
      />
    </div>
  );
};

export default Chat;
