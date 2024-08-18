import React, { useState } from "react";
import "../chat-box/chat-box.css";

const FooterChat = ({
  inputMessage,
  setInputMessage,
  imageInput,
  setImageInput,
  handleSendMessage,
}) => {
  function handleBackFileChange(e) {
    if (e.target?.files.length !== 0) {
      setImageInput(URL.createObjectURL(e.target.files[0]));
      // setInputMessage(backFile, e.target.value);
    }
  }

  return (
    <div className="mt-5 position-relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <div className="upload_file_container">
          <label htmlFor="fileUpload">
            <i className="ri-attachment-2 attachment_icon p-1 cursor_pointer" />
          </label>

          
          <input
            type="file"
            // accept=".jpg"
            id="fileUpload"
            className="file_upload"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            onChange={(e) => {
              handleBackFileChange(e);
            }}
          />
        </div>
        <div className="default_border border_radius_7px ">
          {imageInput.length > 0 && (
            <div className="m-3 position-relative">
              <button
                type="button"
                className="border_none background_none img_close_button"
                onClick={() => setImageInput(false)}
              >
                <i className="ri-close-circle-fill" />
              </button>
              
              <img
                className="border_radius_10px "
                
                src={imageInput}
                width="150px"
                height="150px"
              />
            </div>
          )}
          <input
            placeholder="Type Something..."
            className="w-100 border_none  p-2 ps-5 outline_none"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={imageInput ? !imageInput : !inputMessage.trim()}
          className="send_button border_none background_none cursor_pointer"
        >
          <i className="ri-send-plane-fill " />
        </button>
      </form>
    </div>
  );
};

export default FooterChat;
