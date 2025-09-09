import React, { useEffect, useState } from "react";

const InternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);

      // Hide online message after 2 minutes
      setTimeout(() => {
        setShowOnlineMessage(false);
      }, 2 * 60 * 1000); // 2 minutes
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(false); // Force show offline warning always
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial setup
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
        className="z-20 fixed top-0 left-1/2 transform -translate-x-1/2 px-4 py-2"
        style={{
          color: "white",
          backgroundColor: "red",
          textAlign: "center",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ⚠️ You are Offline, Activities are not saved yet, Do not close the tab!
      </div>
    );
  }

  if (isOnline && showOnlineMessage) {
    return (
      <div
        className="z-20 fixed top-0 left-1/2 transform -translate-x-1/2 px-4 py-2"
        style={{
          color: "white",
          backgroundColor: "green",
          textAlign: "center",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ✅ You are Online. !
      </div>
    );
  }

  return null; // Nothing is shown after 2min online message disappears
};

export default InternetStatus;
