import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { FaArrowCircleUp } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Chatpage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [showExitPopup, setShowExitPopup] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    // Send message
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const response = await axios.post('http://localhost:8000/chat', { message: input });
            const botReply = response.data.reply;
            const botMessage = { sender: 'bot', text: botReply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Bot error:", error);
            const errorMessage = { sender: 'bot', text: "Sorry, there was an issue processing your message." };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Intercept browser back/reload
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            setShowExitPopup(true);
            e.returnValue = ''; // Necessary for some browsers
            return '';
        };

        const handlePopState = () => {
            setShowExitPopup(true);
            window.history.pushState(null, '', window.location.pathname); // Stay on same page
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.history.pushState(null, '', window.location.pathname); // Push state to trap back
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // Handle Exit popup buttons
    const handleExit = () => navigate('/'); // Navigate to homepage
    const cancelExit = () => setShowExitPopup(false);

    return (
        <>
            <div className={`bodycolor ${showExitPopup ? 'blur-background' : ''}`}>
                <div className='navbar'>
                    <div className='appsname'>
                        <h1>Mood mate</h1>
                    </div>
                    <div className='buttonsdiv'>
                        <button onClick={() => setShowExitPopup(true)}>Exit</button>
                        <button>icon</button>
                    </div>
                </div>

                <div className='chatbox'>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={scrollRef}></div>
                </div>

                <div className='querybar'>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <FaArrowCircleUp className='sendbutton' onClick={handleSend} />
                </div>
            </div>

            {/* 🟥 Exit confirmation popup */}
            {showExitPopup && (
                <div className='popup-container'>
                    <div className='popup-card'>
                        <p>Are you sure you want to exit?</p>
                        <div className='popup-buttons'>
                            <button onClick={handleExit}>Yes</button>
                            <button onClick={cancelExit}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
