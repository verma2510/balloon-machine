import React, { useEffect, useState } from "react";
import "./home.css";
import Symbol_3_copy from "../../assets/game-assets/Symbol_3_copy.png";
import Symbol_28 from "../../assets/game-assets/Symbol_28.png";
import Symbol_100010 from "../../assets/game-assets/Symbol_100010.png";
import Symbol_100007 from "../../assets/game-assets/Symbol_100007.png";

export const Home = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // First balloon states
  const [firstBalloonStage, setFirstBalloonStage] = useState(0);
  const [isFirstBalloonFlying, setIsFirstBalloonFlying] = useState(false);
  const [isFirstBalloonBurst, setIsFirstBalloonBurst] = useState(false);

  // Second balloon states
  const [showSecondBalloon, setShowSecondBalloon] = useState(false);
  const [secondBalloonStage, setSecondBalloonStage] = useState(0);
  const [isSecondBalloonFlying, setIsSecondBalloonFlying] = useState(false);
  const [isSecondBalloonBurst, setIsSecondBalloonBurst] = useState(false);

  // Reset animation state
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleMachineClick = () => {
    setIsAnimating(true);

    // Inflate first balloon if not flying
    if (!isFirstBalloonFlying) {
      if (firstBalloonStage < 2) {
        setFirstBalloonStage((prev) => prev + 1);
      } else {
        setIsFirstBalloonFlying(true);

        // After first balloon starts flying, introduce second balloon
        setTimeout(() => {
          setShowSecondBalloon(true);
        }, 500);
      }
    }

    // Inflate second balloon if it's present
    if (showSecondBalloon && !isSecondBalloonFlying) {
      if (secondBalloonStage < 2) {
        setSecondBalloonStage((prev) => prev + 1);
      } else {
        setIsSecondBalloonFlying(true);
      }
    }
  };

  const handleBalloonClick = (balloon) => {
    if (balloon === "first") {
      setIsFirstBalloonBurst(true);
      setTimeout(() => resetFirstBalloon(), 500);
    } else if (balloon === "second") {
      setIsSecondBalloonBurst(true);
      setTimeout(() => resetSecondBalloon(), 500);
    }
  };

  const resetFirstBalloon = () => {
    setIsFirstBalloonBurst(false);
    setIsFirstBalloonFlying(false);
    setFirstBalloonStage(0);
  };

  const resetSecondBalloon = () => {
    setIsSecondBalloonBurst(false);
    setIsSecondBalloonFlying(false);
    setSecondBalloonStage(0);
  };

  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="homePage">
          <img src={Symbol_3_copy} alt="" className="homeBackground" />
          <div className="balloonMachine">
            <img
              src={Symbol_28}
              alt="Machine"
              className={`machine ${isAnimating ? "zoom-animation" : ""}`}
              onClick={handleMachineClick}
            />
          </div>

          {/* First balloon: Flies until clicked */}
          {!isFirstBalloonBurst && (
            <div className="balloonWrapper">
              <img
                src={Symbol_100010}
                alt="First Balloon"
                className={`balloon stage-${firstBalloonStage} ${
                  isFirstBalloonFlying ? "fly" : ""
                }`}
                onClick={() => handleBalloonClick("first")}
              />
            </div>
          )}

          {/* Second balloon: Appears after first starts flying */}
          {!isSecondBalloonBurst && showSecondBalloon && (
            <div
              className="balloonWrapper"
              style={{ bottom: "195px", right: "240px" }}
            >
              <img
                src={Symbol_100007}
                alt="Second Balloon"
                className={`balloon stage-${secondBalloonStage} ${
                  isSecondBalloonFlying ? "flying" : ""
                }`}
                onClick={() => handleBalloonClick("second")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
