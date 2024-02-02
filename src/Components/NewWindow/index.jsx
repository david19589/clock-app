/* eslint-disable react/prop-types */
import Styles from "./NewWindow.module.css";
import axios from "axios";
import { useState } from "react";

const NewWindow = (props) => {
  const [TimeZone, setTimeZone] = useState();
  const [DayOfYear, setDayOfYear] = useState();
  const [WeekNumber, setWeekNumber] = useState();
  const [DayOfWeek, setDayOfWeek] = useState();

  const getTime = () => {
    axios
      .get("http://worldtimeapi.org/api/timezone/Asia/Tbilisi")
      .then((res) => {
        setTimeZone(res.data.timezone);
        setDayOfYear(res.data.day_of_year);
        setWeekNumber(res.data.day_of_week);
        setDayOfWeek(res.data.week_number);
      });
  };
  getTime();

  return (
    <div
      className={`${
        props.isClicked ? Styles.NewWindowActive : Styles.NewWindow
      }`}
    >
      <div className={Styles.bigDiv1}>
        <div className={Styles.timeZoneDiv}>
          <h1 className={Styles.currentTimezone}>CURRENT TIMEZONE</h1>
          <h1 className={Styles.zone}>{TimeZone}</h1>
        </div>
        <div className={Styles.dayOfYearDiv}>
          <h1 className={Styles.dayOfTheYear}>DAY OF THE YEAR</h1>
          <h1 className={Styles.dayNumber}>{DayOfYear}</h1>
        </div>
      </div>
      <div className={Styles.stick}></div>
      <div className={Styles.bigDiv2}>
        <div className={Styles.dayOfWeekDiv}>
          <h1 className={Styles.dayOfTheWeek}>DAY OF THE WEEK</h1>
          <h1 className={Styles.weekDayNumber}>{DayOfWeek}</h1>
        </div>
        <div className={Styles.weekNumberDiv}>
          <h1 className={Styles.weekNumber}>WEEK NUMBER</h1>
          <h1 className={Styles.weekNumberNumber}>{WeekNumber}</h1>
        </div>
      </div>
    </div>
  );
};
export default NewWindow;
