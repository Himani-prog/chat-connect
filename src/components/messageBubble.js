import React from "react";

const MessageBubble = ({ message }) => {
    const isUser = message.sender === "You";

    return (
        <div className={`bubble-row ${isUser ? "right" : "left"}`}>
            <div className={`bubble ${isUser ? "user" : "other"}`}>
                <p>{message.text}</p>
                <span>{message.time}</span>
            </div>
        </div>
    );
};

export default MessageBubble;
