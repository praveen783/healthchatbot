import React, { useState } from "react";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Avatarpage() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState("Select Avatar");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Modal state

  const avatars = [
    { id: 1, icon: "🌿", label: "Calm" },
    { id: 2, icon: "🕊️", label: "Peaceful" },
    { id: 3, icon: "🌊", label: "Serene" },
    { id: 4, icon: "🍃", label: "Tranquil" },
  ];

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const selectAvatarOnPopup = (avatar) => {
    setSelectedAvatar(`${avatar.icon} ${avatar.label}`);
    closePopup(); // Close the popup automatically after selection
  };

  return (
    <div className="avatarpagecolor">
      <div className="Appname">
        <h1>MoodMate</h1>
      </div>

      <div className="selectavatardiv">
        {/* Button to open popup */}
        <button type="button" className="guestbtn" onClick={openPopup}>
          {selectedAvatar}
        </button>
      </div>

      {/* Custom Modal (Instead of <dialog>) */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Select Your Avatar</h2>
            <div className="avatar-options">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  className="avatar-btn"
                  onClick={() => selectAvatarOnPopup(avatar)}
                >
                  {avatar.icon} {avatar.label}
                </button>
              ))}
            </div>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <div className="arrowbtn">
        <div onClick={() => navigate("/")} className="icon1">
          <FaRegArrowAltCircleLeft />
        </div>
        <div className="icon2" onClick={() => navigate('/chat')}>
          <FaRegArrowAltCircleRight />
        </div>
      </div>
    </div>
  );
}
