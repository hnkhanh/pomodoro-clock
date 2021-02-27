const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

const iconStyle = {
  cursor: "pointer" };


const audioSrc =
"https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3";

function App() {
  const [sessionLength, setSessionLength] = React.useState(25);
  const [breakLength, setBreakLength] = React.useState(5);
  const [display, setDisplay] = React.useState(25 * 60);
  const [intervalID, setIntervalID] = React.useState("");
  const [timerOn, setTimerOn] = React.useState(false);
  const [isSession, setIsSession] = React.useState(true);
  const player = React.useRef();

  useEffect(() => {
    if (display === 0 && isSession) {
      setIsSession(false);
      breakSound();
      setDisplay(breakLength * 60);
    } else
    if (display === 0 && !isSession) {
      setIsSession(true);
      breakSound();
      setDisplay(sessionLength * 60);
    }
  }, [display, isSession]);

  const formatDisplayTime = time => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    return (
      (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
    );
  };

  const updateTime = (amount, type) => {
    if (type === "break") {
      if ((breakLength <= 1 && amount < 0) || breakLength >= 60) {
        return;
      }
      setBreakLength((prev) => prev + amount);
    } else {
      if ((sessionLength <= 1 && amount < 0) || sessionLength >= 60) {
        return;
      }
      setSessionLength((prev) => prev + amount);
      if (!timerOn) {
        setDisplay((sessionLength + amount)*60);
      }
    }
  };

  const timeControl = () => {
    if (!timerOn) {
      setTimerOn(true);
      let interval = setInterval(() => {
        setDisplay(prev => prev - 1);
      }, 1000);
      setIntervalID(interval);
    } else
    {
      clearInterval(intervalID);
    }
    setTimerOn(!timerOn);
  };

  const breakSound = () => {
    player.current.currentTime = 0;
    player.current.play();
  };

  const resetTime = () => {
    setSessionLength(25);
    setBreakLength(5);
    setDisplay(25 * 60);
    setTimerOn(false);
    setIsSession(true);
    clearInterval(intervalID);
    player.current.currentTime = 0;
    player.current.pause();
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "container App" }, /*#__PURE__*/
    React.createElement("div", { className: "row" }, /*#__PURE__*/
    React.createElement("h1", { className: "title display-3 mb-5 col-md-12 text-center" }, "Pomodoro Clock")), /*#__PURE__*/




    React.createElement("div", { className: "row double d-flex" }, /*#__PURE__*/
    React.createElement(Length, {
      title: "Session length",
      updateTime: updateTime,
      type: "session",
      value: sessionLength }), /*#__PURE__*/

    React.createElement(Length, {
      title: "Break length",
      updateTime: updateTime,
      type: "break",
      value: breakLength })), /*#__PURE__*/



    React.createElement("div", { className: "row" }, /*#__PURE__*/
    React.createElement("div", { className: "clock col-md-12 d-flex justify-content-center" }, /*#__PURE__*/
    React.createElement("div", { className: timerOn ? "box-active mt-5" : "null mt-5" }, /*#__PURE__*/
    React.createElement("span", { className: timerOn ? null : "box2" }), /*#__PURE__*/
    React.createElement("h2", { className: "text-center display-4", id: "timer-label" },
    isSession ? "Let's work!" : "Breaktime!"), /*#__PURE__*/

    React.createElement("h1", { className: "timer display-1 text-center", id: "time-left" },
    formatDisplayTime(display)))), /*#__PURE__*/



    React.createElement("div", { className: "col-md-12" }, /*#__PURE__*/
    React.createElement("div", { className: "buttons d-flex justify-content-center align-content-center m-3" }, /*#__PURE__*/
    React.createElement("span", { id: "start_stop", onClick: timeControl },
    timerOn ? /*#__PURE__*/
    React.createElement("i", { className: "fas fa-pause fa-4x m-3", style: iconStyle }) : /*#__PURE__*/

    React.createElement("i", {
      className: "fas fa-play fa-4x m-3",
      style: iconStyle,
      id: "start_stop" })), /*#__PURE__*/



    React.createElement("i", {
      className: "fas fa-sync-alt fa-4x m-3",
      style: iconStyle,
      id: "reset",
      onClick: resetTime })))), /*#__PURE__*/




    React.createElement("audio", {
      id: "beep",
      src: audioSrc,
      ref: player,
      type: "audio" })));



}

function Length({
  title,
  updateTime,
  type,
  value })
{
  return /*#__PURE__*/(
    React.createElement("div", { className: "col-md-6" }, /*#__PURE__*/
    React.createElement("h1", {
      className: "text-center",
      id: `${type}-label` },

    title), /*#__PURE__*/

    React.createElement("div", { className: "d-flex justify-content-center align-items-center" }, /*#__PURE__*/
    React.createElement("div", { className: "arrow" }, /*#__PURE__*/
    React.createElement("i", {
      className: "fas fa-arrow-circle-down fa-4x",
      id: `${type}-decrement`,
      style: iconStyle,
      onClick: () => updateTime(-1, type) })), /*#__PURE__*/



    React.createElement("h3", {
      className: "m-5 display-4",
      id: `${type}-length` },

    value), /*#__PURE__*/

    React.createElement("div", { className: "arrow" }, /*#__PURE__*/
    React.createElement("i", {
      className: "fas fa-arrow-circle-up fa-4x",
      id: `${type}-increment`,
      style: iconStyle,
      onClick: () => updateTime(1, type) })))));

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));