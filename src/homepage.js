import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Homepage() {
    const navigate = useNavigate();
    const fullText = "Hi there!.👋 Welcome to MoodMate.\nWe're here to listen and help 🤗.";
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + fullText[index]); // Append next character
                setIndex(index + 1);
            }, 30);

            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <div className='bodycolor'>
            <div className='Appname'>
                <h1>Moodmate</h1>
            </div>
            <div className='flexdiv'>
                <div className='textdiv'>
                    <h2>
                        {displayText.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </h2>
                    <button type='button' className='guestbtn' onClick={() => navigate('/avatar')}>Continue as Guest</button>
                </div>
                <div className='imagediv'>
                    <img alt='chatlogo' src='/smiley.png'></img>
                </div>
            </div>
        </div>
    );
}
