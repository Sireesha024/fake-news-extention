chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("✅ content.js loaded into the page!");
    if (msg.action === "extractData") {
      const domain = window.location.hostname;
      const title = document.title;
      const content = document.body.innerText.slice(0, 3000); // You can limit length
  
      sendResponse({ domain, title, content });
    }
  });
  