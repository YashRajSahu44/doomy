let settings = {
  youtube: true,
  instagram: true
};


//
chrome.storage.local.get(settings, (result) => {

  settings = result;

  startBlocking();

});


// YouTube


function blockYouTube() {

  if (!settings.youtube) return;

  // Hide Shorts links
  document.querySelectorAll('a[href*="/shorts/"]')
    .forEach((link) => {

      const container =
        link.closest("ytd-rich-item-renderer") ||
        link.closest("ytd-grid-video-renderer") ||
        link.closest("ytd-reel-item-renderer");

      if (container) {
        container.style.display = "none";
      } else {
        link.style.display = "none";
      }

    });


  // Block direct Shorts page
  if (window.location.pathname.startsWith("/shorts/")) {

    showBlockedScreen("YouTube Shorts");

  }

}



// Instagram


function blockInstagram() {

  if (!settings.instagram) return;

  document.querySelectorAll('a[href*="/reels/"]')
    .forEach((link) => {

      const article = link.closest("article");

      if (article) {
        article.style.display = "none";
      } else {
        link.style.display = "none";
      }

    });


  // Direct Reel
  if (window.location.pathname.startsWith("/reels/")) {

    showBlockedScreen("Instagram Reels");

  }

}



// Block screen


function showBlockedScreen(type) {

  if (document.querySelector("#focusfeed-block")) {
    return;
  }

  const overlay = document.createElement("div");

  overlay.id = "focusfeed-block";

  overlay.innerHTML = `
    <div>
      <h1>FocusFeed</h1>

      <p>${type} are blocked.</p>

      <small>
        Get back to what you were doing.
      </small>
    </div>
  `;

  document.body.appendChild(overlay);

}


// Start


function startBlocking() {

  if (
    window.location.hostname.includes("youtube.com")
  ) {
    blockYouTube();
  }

  if (
    window.location.hostname.includes("instagram.com")
  ) {
    blockInstagram();
  }

}



// Detect dynamically loaded content


const observer = new MutationObserver(() => {

  startBlocking();

});


observer.observe(document.body, {
  childList: true,
  subtree: true
});



//


chrome.storage.onChanged.addListener((changes) => {

  if (changes.youtube) {
    settings.youtube = changes.youtube.newValue;
  }

  if (changes.instagram) {
    settings.instagram = changes.instagram.newValue;
  }

  startBlocking();

});