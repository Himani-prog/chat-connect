import React from "react";

const Sidebar = ({ contacts, activeChat, setActiveChat }) => {
    return (
        <div className="sidebar">
            <h2 className="logo">ChatConnect</h2>

            {contacts.map((c) => (
                <div
                    key={c.id}
                    className={`contact ${activeChat === c.id ? "active" : ""}`}
                    onClick={() => setActiveChat(c.id)}
                >
                    <span className="avatar">{c.avatar}</span>
                    <span>{c.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
