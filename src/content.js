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

      // Hiding a feed item does not stop its audio or video.
      stopMedia(container || link);

    });


  // Block direct Shorts page
  if (window.location.pathname.startsWith("/shorts/")) {

    // Stop any player already running on the blocked page.
    stopMedia(document);
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

      // Hiding a feed item does not stop its audio or video.
      stopMedia(article || link);

    });


  // Direct Reel
  if (window.location.pathname.startsWith("/reels/")) {

    // Stop any player already running on the blocked page.
    stopMedia(document);
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


// Pause media that is already inside a blocked feed item or page.
function stopMedia(container) {

  container.querySelectorAll("video, audio").forEach((media) => {
    media.pause();
  });

}


// Match playback events to Shorts or Reels when blocking is enabled.
function isBlockedMedia(media) {

  if (settings.youtube && window.location.hostname.includes("youtube.com")) {
    if (window.location.pathname.startsWith("/shorts/")) {
      return true;
    }

    const container = media.closest(
      "ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-reel-item-renderer"
    );

    return Boolean(container?.querySelector('a[href*="/shorts/"]'));
  }

  if (settings.instagram && window.location.hostname.includes("instagram.com")) {
    if (window.location.pathname.startsWith("/reels/")) {
      return true;
    }

    const article = media.closest("article");

    return Boolean(article?.querySelector('a[href*="/reels/"]'));
  }

  return false;

}


// Catch later autoplay attempts on blocked content.
function pauseBlockedMedia(event) {

  const media = event.target;

  if (media instanceof HTMLMediaElement && isBlockedMedia(media)) {
    media.pause();
  }

}



// Detect dynamically loaded content


// Use capture so blocked media is paused as soon as playback starts.
document.addEventListener("play", pauseBlockedMedia, true);


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