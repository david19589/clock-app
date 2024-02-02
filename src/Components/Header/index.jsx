/* eslint-disable react/prop-types */
import Styles from "./Header.module.css";
import RefreshImg from "/src/assets/desktop/icon-refresh.svg";
import axios from "axios";
import { useState, useEffect } from "react";

const Header = (props) => {
  const [Quote, setQuote] = useState();
  const [Author, setAuthor] = useState();

  useEffect(() => {
    const timeID = setInterval(() => 6000);
    return function cleanup() {
      clearInterval(timeID);
      axios.get("https://api.quotable.io/random").then((res) => {
        setQuote(res.data.content);
        setAuthor(res.data.author);
      });
    };
  }, []);

  const getQuote = () => {
    axios.get("https://api.quotable.io/random").then((res) => {
      setQuote(res.data.content);
      setAuthor(res.data.author);
    });
  };

  return (
    <div
      className={`${props.isClicked ? Styles.HeaderDivNone : Styles.HeaderDiv}`}
    >
      <div className={Styles.quoteDiv}>
        <p className={Styles.quote}>{Quote}</p>

        <h1 className={Styles.author}>{Author}</h1>
      </div>
      <img
        onClick={getQuote}
        src={RefreshImg}
        alt="refresh"
        className={Styles.refresh}
      />
    </div>
  );
};

export default Header;
