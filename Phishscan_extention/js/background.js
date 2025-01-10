
let classified = null; // Store the last classification for retrieval by the popup

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.classification) {
        classified = message.classification; // Store the classification
        notifycreate(classified);
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: injectWarningBanner,
            args: [message.classification],
        });
        
        
    } else if (message.action === "getClassification") {
        
        sendResponse({ classification: classified });
    
    }
});

function notifycreate(classified){
    if(classified==="Phishing"){
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../phishscan.png",
        title: " PhishScan",
        message: `Phishing Detected!`
    });
}
}

function injectWarningBanner(classified) {
    // Create the banner element
    const banner = document.createElement("div");
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.backgroundColor =
        classified === "Phishing" ? "red" : classified === "Suspicious" ? "yellow" : "green";
    banner.style.color = "white";
    banner.style.textAlign = "center";
    banner.style.padding = "10px";
    banner.style.fontSize = "18px";
    banner.style.zIndex = "99998";
    banner.textContent =
        classified === "Phishing"
            ? "Warning: This site is flagged as phishing. Navigate away!"
            : classified === "Suspicious"
            ? "Caution: This site seems suspicious. Proceed with caution!"
            : "Safe: This site is safe. Enjoy browsing :)";

    // Append the banner to the body
    document.body.appendChild(banner);

    // Remove the banner after 10 seconds
    setTimeout(() => {
        banner.remove();
    }, 10000);
}