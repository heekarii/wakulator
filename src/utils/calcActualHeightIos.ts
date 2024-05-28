
export default function calcActualHeight() {
    if (["iPad", "iPhone", "iPod"].includes(navigator.userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
      document.documentElement.style.setProperty("--vh",  window.innerHeight * 0.01 + "px");
      return true;
    } else {
      document.documentElement.style.setProperty("--vh", "1vh");
      return false;
    }
  }