import { useState, useEffect } from "react";
let color;

const colorChange = (hour) => {
  if ((hour >= 0 && hour < 5) || (hour >= 18 && hour < 24)) {
    return "#eaecf0";
  } else {
    return "#fafcff";
  }
};

const timeCheck = () => {
  const [bgColor, setBgColor] = useState(colorChange(new Date().getHours()));
  useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date().getHours();

      setBgColor(colorChange(hour));

      color = bgColor;
      document.documentElement.style.setProperty("--bgcolor", color);
    }, 600); // 1分ごとにチェック

    return () => clearInterval(interval);
  }, []);
};

export default timeCheck;
