import "./App.css";
import React, { useState, useEffect } from "react";

const formatTime = (d, isUtc) => {
  let date;
  if (isUtc) {
    date = new Date(d).toISOString();
    date = date.slice(11, 19);
  } else {
    date = new Date(d).toLocaleString("ge-GE");
    date = date.slice(11, 20);
  }
  return date;
};

export default function App() {
  const [displayedTime, setDisplayedTime] = useState(formatTime(new Date()));
  const [isUTC, setIsUTC] = useState(false);
  const [timesImageChange, setTimesImageChange] = useState(1);
  const [url, setUrl] = useState("https://picsum.photos/200/300");
  const checkedValue = isUTC ? "checked" : "";

  useEffect(() => {
   const myTimeout = setInterval(() => {
      const currentTime = new Date(Date.now());
      const formatedTime = formatTime(currentTime, isUTC);
      setDisplayedTime(formatedTime);
    });
 
    return () => {
      clearTimeout(myTimeout);
    };
  });


  useEffect(() => {
    const intervalMs = (60 / timesImageChange) * 1000; // Convert minutes to milliseconds
    const intervalId = setInterval(() => {
      fetch("https://picsum.photos/200/300").then((data) => {
        setUrl(data.url);
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [timesImageChange]);

  const handleCheckbox = () => {
    setIsUTC(!isUTC);
  };

  const handleSelect = (e) => {
    setTimesImageChange(e.target.value);
  };

  return (
    <div className="container column ">
      <div className="heading-1">{displayedTime}</div>

      <div className="pt-1">
        <label htmlFor="utc-checkbox">Switch to UTC</label>
        <input
          type="checkbox"
          className="utc-checkbox"
          checked={checkedValue}
          name="utc"
          onChange={handleCheckbox}
        />
      </div>

      <div className="img">
        <img src={url} alt="img" />
      </div>

      <select className="control" onChange={handleSelect}>
        <option value="1" defaultValue>
          1 time
        </option>
        <option value="2">2 times</option>
        <option value="3">3 times</option>
        <option value="4">4 times</option>
        <option value="5">5 times</option>
        <option value="6">6 times</option>
      </select>
    </div>
  );
}
