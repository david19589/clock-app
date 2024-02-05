/* eslint-disable react/prop-types */
import Styles from "./Time.module.css";
import { useState, useEffect, useRef } from "react";
import SunImg from "/src/assets/desktop/icon-sun.svg";
import MoonImg from "/src/assets/desktop/icon-moon.svg";
import axios from "axios";

const Time = (props) => {
  const [Time, setTime] = useState();
  const [Abbreviation, setAbbreviation] = useState();
  const [TimeZone, setTimeZone] = useState();

  const getTime = () => {
    axios
      .get("http://worldtimeapi.org/api/timezone/Asia/Tbilisi")
      .then((res) => {
        setAbbreviation(res.data.abbreviation);
        setTimeZone(res.data.timezone);
      });
  };
  getTime();

  const hoverRef = useRef(null);
  const textChangeRef = useRef(null);
  const textChangeRef2 = useRef(null);
  const ImgChangeRef = useRef(null);

  function formatTime(value) {
    if (value < 10) {
      return "0";
    } else {
      return "";
    }
  }

  useEffect(() => {
    const timeID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timeID);
    };
  });

  function tick() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();

    setTime(formatTime(h) + h + ":" + formatTime(m) + m);
  }

  useEffect(() => {
    const setDaytimeOrNighttime = () => {
      const currentHour = new Date().getHours();
      const isNightTime = currentHour >= 18 || currentHour <= 5;

      document.body.className = "";
      

      if (isNightTime) {
        textChangeRef2.current.textContent = "Good Evening";
        document.body.className = "";
        {ImgChangeRef.current.src = MoonImg}
      } else {
        if (currentHour > 12 && currentHour < 18) {
          textChangeRef2.current.textContent = "Good Afternoon";
        } else {
          textChangeRef2.current.textContent = "Good Morning";
        }
      }
    };

    setDaytimeOrNighttime();

    const intervalId = setInterval(setDaytimeOrNighttime, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={Styles.TimeDiv}>
      <div className={Styles.sunMorningDiv}>
        <img ref={ImgChangeRef} src={SunImg} alt="sun" className={Styles.sun} />
        <h1 ref={textChangeRef2} className={Styles.goodMorning}>
          GOOD MORNING{" "}
        </h1>
        <h1 className={Styles.itsCurrently}>, IT’S CURRENTLY</h1>
      </div>
      <div className={Styles.timeZone}>
        <h1 className={Styles.time}>{Time}</h1>
        <h1 className={Styles.GMT4}>{Abbreviation}</h1>
      </div>
      <h1 className={Styles.location}>IN {TimeZone}</h1>
      <div
        onClick={() => {
          props.setIsClicked(!props.isClicked);
          {
            !props.isClicked
              ? (textChangeRef.current.textContent = "LESS")
              : (textChangeRef.current.textContent = "MORE");
          }
        }}
        onMouseEnter={() => {
          hoverRef.current.style.fill = "#999";
        }}
        onMouseLeave={() => {
          hoverRef.current.style.fill = "#000";
        }}
        className={Styles.moreInfo}
      >
        <h1 ref={textChangeRef} className={Styles.more}>
          more
        </h1>
        <svg
          className={`${props.isClicked ? Styles.arrowActive : Styles.arrow}`}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 3">
            <circle
              ref={hoverRef}
              id="Oval"
              cx="16"
              cy="16"
              r="16"
              fill="#303030"
            />
            <path
              id="Path"
              d="M11.2 13.6001L16 18.4001L20.8 13.6001"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Time;
