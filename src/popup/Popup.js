import logo from "./logo.svg";
import "./Popup.css";

export const getCurrentTabUId = (callback) => {
  const queryInfo = { active: true, currentWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id);
    });
};



function Popup() {
  console.log("this is popup2 ")

  async function getLocation() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      console.log(pos.coords)
      chrome.identity.getProfileUserInfo(function(userInfo){
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
          chrome.tabs.sendMessage(tabs[0].id, {action: "readDom",email:userInfo , location:{"Latitude":pos.coords.latitude,"Longitude":pos.coords.longitude}});
      
       });
      })
  
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
     navigator.geolocation.getCurrentPosition(success, error, options);
  }
  getLocation();


  const sendMessage = () => {
    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, {
          value: "openPopup",
        });
      window.close();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React4
        </a>
        <button onClick={sendMessage}>Open popup</button>
      </header>
    </div>
  );
}

export default Popup;
