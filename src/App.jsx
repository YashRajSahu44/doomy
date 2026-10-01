import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [youtube, setYoutube] = useState(true);
  const [instagram, setInstagram] = useState(true);

  useEffect(() => {

    chrome.storage.local.get(
      {
        youtube: true,
        instagram: true
      },
      (settings) => {

        setYoutube(settings.youtube);
        setInstagram(settings.instagram);

      }
    );

  }, []);


  function toggleYouTube() {

    const newValue = !youtube;

    setYoutube(newValue);

    chrome.storage.local.set({
      youtube: newValue
    });

  }


  function toggleInstagram() {

    const newValue = !instagram;

    setInstagram(newValue);

    chrome.storage.local.set({
      instagram: newValue
    });

  }


  return (
    <div className="container">

      <div className="header">
        <div className="logo">
          F
        </div>

        <div>
          <h1>FocusFeed</h1>
          <p>Stay focused. Scroll less.</p>
        </div>
      </div>


      <div className="status">
        <span className="status-dot"></span>

        <span>
          {youtube || instagram
            ? "Protection is active"
            : "Protection is disabled"
          }
        </span>
      </div>


      <div className="settings">

        <div className="setting">

          <div>
            <h3>YouTube Shorts</h3>
            <p>Block short-form videos</p>
          </div>

          <button
            className={`toggle ${youtube ? "active" : ""}`}
            onClick={toggleYouTube}
          >
            <span></span>
          </button>

        </div>


        <div className="setting">

          <div>
            <h3>Instagram Reels</h3>
            <p>Block distracting reels</p>
          </div>

          <button
            className={`toggle ${instagram ? "active" : ""}`}
            onClick={toggleInstagram}
          >
            <span></span>
          </button>

        </div>

      </div>


      <div className="footer">
        FocusFeed helps you stay away from
        short-form content.
      </div>

    </div>
  );
}

export default App;