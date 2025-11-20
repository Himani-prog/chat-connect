import React, { useState, useEffect, useRef } from "react";

const ChatWindow = ({ contact, theme, toggleTheme }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    // Load messages for current avatar whenever avatar changes
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(`chat-${contact.id}`)) || [];
        setMessages(stored);
    }, [contact.id]);

    // Save messages per avatar
    useEffect(() => {
        localStorage.setItem(`chat-${contact.id}`, JSON.stringify(messages));
    }, [messages, contact.id]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, contact.id, typing]);

    // Predefined reply for each avatar
    const avatarReplies = {
        1: "Hey! How are you today?",
        2: "Hello there! Did you finish your task?",
        3: "Hi! What are you up to?"
    };

    // Send message
    const handleSend = () => {
        if (input.trim() === "") return;

        const newMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        // Auto-reply based on avatar
        setTyping(true);
        setTimeout(() => {
            const replyText = avatarReplies[contact.id] || "Hi there!";
            const reply = { id: Date.now() + 1, text: replyText, sender: "other" };
            setMessages((prev) => [...prev, reply]);
            setTyping(false);
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 800);
    };

    // Handle Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="chat-window">
            {/* Header */}
            <div className="chat-header">
                <div className="chat-info">
                    <span className="avatar">{contact.avatar}</span>
                    <span className="name">{contact.name}</span>
                </div>

                <div className="chat-actions">
                    <button
                        className="clear-btn"
                        onClick={() => {
                            localStorage.removeItem(`chat-${contact.id}`);
                            setMessages([]);
                        }}
                    >
                        Clear
                    </button>

                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="messages-container">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`bubble ${msg.sender === "user" ? "user" : "other"}`}
                    >
                        {msg.text}
                    </div>
                ))}

                {typing && <div className="typing-indicator">Typing...</div>}
                <div ref={bottomRef}></div>
            </div>

            {/* Input */}
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
