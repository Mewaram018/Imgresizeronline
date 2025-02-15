import React, { useEffect, useState } from "react";

const InstallNotification = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowNotification(true);
      setCountdown(15); // Reset countdown

      // Countdown logic
      const timerInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setShowNotification(false);
          }
          return prev - 1;
        });
      }, 1000);
    
      return () => clearInterval(timerInterval);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        setDeferredPrompt(null);
        setShowNotification(false);
      });
    }
  };

  const handleCloseClick = () => {
    setShowNotification(false);
  };

  if (!showNotification) return null;

  return (
    <div style={styles.notification}>
      <span>📲 Install our web app for quick access! <br/><b style={styles.boldText}>({countdown}s)</b></span>
      <div style={styles.buttonContainer}>
        <button onClick={handleInstallClick} style={styles.installButton}>Use Offline (Fast)</button>
        <button onClick={handleCloseClick} style={styles.closeButton}>Use Online</button>
      </div>
    </div>
  );
};

const styles = {
  notification: {
    position: "fixed",
    top: 70,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#101e41",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: 1000,
    fontSize: "16px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
    animation: "slideDown 0.5s ease-out",
    width: "320px",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    gap: "5px",
  },
  installButton: {
    background: "#ff5733",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer",
  },
  closeButton: {
    background: "#444",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default InstallNotification;