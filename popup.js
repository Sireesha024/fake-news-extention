document.getElementById("analyze-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "extractData" },
        async (response) => {
          const apiUrl = "https://fake-news-api-s40x.onrender.com/predict";
  
          try {
            const res = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(response)
            });
  
            const data = await res.json();
            console.log("API response:", data);
  
            if (data.prediction) {
              document.getElementById("result").innerText = `Prediction: ${data.prediction.toUpperCase()}`;
            } else {
              document.getElementById("result").innerText = "No prediction returned.";
            }
  
          } catch (err) {
            console.error("Error calling API:", err);
            document.getElementById("result").innerText = "API Error";
          }
        }
      );
    });
  });
  