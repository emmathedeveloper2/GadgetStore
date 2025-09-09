import React, { useEffect, useState } from "react";

const InternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);

      // Check if we've already shown the online message before
      const alreadyShown = localStorage.getItem("onlineMessageShown");

      if (!alreadyShown) {
        setShowOnlineMessage(true);

        // Hide online message after 2 minutes
        setTimeout(() => {
          setShowOnlineMessage(false);
          localStorage.setItem("onlineMessageShown", "true"); // Mark as shown
        }, 3000); // 3sec
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(false); 
      localStorage.removeItem("onlineMessageShown"); // Reset so it shows again after reconnect
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (navigator.onLine) {
      handleOnline();
    } else {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div
        className="z-20 relative top-0  px-4 py-2"
        style={{
          color: "white",
          backgroundColor: "red",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
         You are Offline, Activities are not saved yet, Do not close the tab!
      </div>
    );
  }

  if (isOnline && showOnlineMessage) {
    return (
      <div
        className="z-20 relative top-0  px-4 py-2"
        style={{
          color: "white",
          backgroundColor: "green",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
         You are Online. !
      </div>
    );
  }

  return null;
};

export default InternetStatus;
