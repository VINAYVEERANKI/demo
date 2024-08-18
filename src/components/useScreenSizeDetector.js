import  { useEffect, useState } from "react";
const useScreenSizeDetector = () => {
  const [screen, setScreen] = useState({width: window?.innerWidth, height: window?.innerHeight});

  const handleResize = () => {
    setScreen({width:window?.innerWidth, height: window?.innerHeight});
  };
  useEffect(() => {
    // setScreen(window?.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return screen;
};

export default useScreenSizeDetector;