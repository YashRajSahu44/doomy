export default {
  manifest_version: 3,

  name: "FocusFeed",
  version: "1.0.0",

  description: "Block distracting Reels and Shorts.",

  permissions: [
    "storage"
  ],

  host_permissions: [
    "https://www.youtube.com/*",
    "https://www.instagram.com/*"
  ],

  action: {
    default_popup: "index.html"
  },

  content_scripts: [
    {
      matches: [
        "https://www.youtube.com/*",
        "https://www.instagram.com/*"
      ],

      js: ["src/content.js"],
      css: ["src/content.css"]
    }
  ]
};