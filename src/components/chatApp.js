import React, { useState, useEffect } from "react";
import Sidebar from "./sideBar";
import ChatWindow from "./chatWindow";
import "./chatConnect.css";

const ChatApp = () => {
    const [contacts] = useState([
        { id: 1, name: "Alex", avatar: "🧑🏻‍💻" },
        { id: 2, name: "Sophie", avatar: "👩🏼‍🎨" },
        { id: 3, name: "Daniel", avatar: "🧔🏻" },
    ]);

    // Clear ALL chats on refresh
    useEffect(() => {
        contacts.forEach(contact => {
            localStorage.removeItem(`chat-${contact.id}`);
        });
    }, []);

    const [theme, setTheme] = useState("light"); // default light

    // Toggle theme function
    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    const [activeChat, setActiveChat] = useState(1);

    return (
        <div className={`chat-app ${theme}`}>
            <Sidebar
                contacts={contacts}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
            />
            <ChatWindow contact={contacts.find(c => c.id === activeChat)}
                theme={theme}
                toggleTheme={toggleTheme} />
        </div>
    );
};

export default ChatApp;
