import React from "react";
import handSrc2 from "../../assets/handTap.png";
const styles = `
  @keyframes tapHand {
    0%   { transform: translateY(0px); }
    45%  { transform: translateY(18px); }
    100% { transform: translateY(0px); }
  }

  @keyframes ringsMove {
    0%,30%   { top: 50%; }
    45%,60%  { top: 62%; }
    80%,100% { top: 50%; }
  }

  @keyframes ringExpand1 {
    0%,45%  { opacity: 0; width: 10px; height: 10px; }
    50%     { opacity: 1; width: 10px; height: 10px; }
    62%     { opacity: 1; width: 44px; height: 44px; }
    75%     { opacity: 0; width: 56px; height: 56px; }
    100%    { opacity: 0; width: 10px; height: 10px; }
  }

  @keyframes ringExpand2 {
    0%,50%  { opacity: 0; width: 10px; height: 10px; }
    58%     { opacity: 1; width: 10px; height: 10px; }
    72%     { opacity: 1; width: 78px; height: 78px; }
    82%     { opacity: 0; width: 90px; height: 90px; }
    100%    { opacity: 0; width: 10px; height: 10px; }
  }

  .tap-hand {
    width: 70px;
    height: 163px;
    object-fit: contain;
    position: relative;
    z-index: 2;
    transform-origin: bottom center;
    animation: tapHand 2s ease-in-out infinite;
  }

  .tap-rings {
    position: absolute;
    left: 50%;
    transform: translateY(-40px);
    width: 0;
    height: 0;
    
    animation: ringsMove 2s ease-in-out 1.5s infinite;
  }

  .tap-ring {
    position: absolute;
    border-radius: 50%;
    border: 7px solid #F5A623;
    transform: translate(-50%, -50%);
    opacity: 0;
    pointer-events: none;
  }

  .tap-ring-1 { animation: ringExpand1 2s ease-in-out infinite; }
  .tap-ring-2 { animation: ringExpand2 2s ease-in-out infinite; }
`;

export default function TapAnimation({
  handSrc = handSrc2,
  ringColor = "#F5A623",
  duration = "2s",
  size = 1,
}) {
  const w = Math.round(91 * size);
  const h = Math.round(137 * size);

  return (
    <>
      <style>{styles
        .replace(/#F5A623/g, ringColor)
        .replace(/2s/g, duration)
        .replace(/91px/g, `${w}px`)
        .replace(/137px/g, `${h}px`)}
      </style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
            borderRadius: 16,
        }}
      >
        <div
          style={{
            position: "relative",
           
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* Ripple rings */}
          <div className="tap-rings" style={{ top: "50%" }}>
            <div className="tap-ring tap-ring-1" />
            <div className="tap-ring tap-ring-2" />
          </div>

          {/* Hand image */}
          <img
            className="tap-hand"
            src={handSrc2}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
