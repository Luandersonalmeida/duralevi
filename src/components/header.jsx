import React, { useRef } from "react";

export const Header = (props) => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  };

  return (
    <header id="header">
      <div className="intro">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          style={{ backgroundColor: 'white' }} // Cor de fundo consistente
        >
          <source src="video/duralevi.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className="overlay">
          {/* ... existing code ... */}
        </div>
      </div>
    </header>
  );
};