import React, { useEffect, useRef } from "react";
import "../chat-box/chat-box.css";
import { openInNewTab } from "../helper";

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <div className="w-100 d-flex flex-column  chat_messages_block px-4">
  
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <div
              key={index}
              className="w-100 d-flex justify-content-end align-items-end"
            >
              
              <div className="w_40 d-flex flex-column justify-content-end align-items-end">
                <img
                  className={
                    item.img <= 1
                      ? "d-none img_no_container"
                      : "d-block img_container border_radius_7px"
                  }
                  src={item.img}
                  onDoubleClick={()=> openInNewTab(item.img)}
                />

                <div>
                  <div
                    className={
                      item.text <= 1
                        ? "d-none"
                        : " mesaage_block_user white_color chat_text_area mt-1 p-3  fw_500"
                    }
                  >
                    <span className="fs_14">{item.text}</span>
                  </div>
                  <span className="disabled_color fs_10 fw_500 d-flex justify-content-start">04:44 PM</span>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="w-100 d-flex justify-content-start align-items-start"
            >
              <div className="w_40 d-flex flex-column justify-content-start align-items-start">
                <span className="fs_11 primary_color fw_500">{item.from}</span>
                <img
                  className={
                    item.img <= 1
                      ? "d-none img_no_container"
                      : "d-block img_container border_radius_7px"
                  }
                  src={item.img}
                  onDoubleClick={()=> openInNewTab(item.img)}
                />
                <div>
                  <div
                    className={
                      item.text <= 1
                        ? "d-none"
                        : "message_block_sender primary_color  chat_text_area mt-1 p-3  fw_500"
                    }
                  >
                    <span className="fs_14">{item.text}</span>
                  </div>
                  <span className="disabled_color fs_10 fw_500 d-flex justify-content-end">04:44 PM</span>
                </div>
              </div>
            </div>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </div>
  );
};
export default Messages;
