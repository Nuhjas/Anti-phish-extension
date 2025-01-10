
document.addEventListener("DOMContentLoaded", () => {

    // Send a message to the background script to get the classification result
    chrome.runtime.sendMessage({ action: "getClassification" }, (response) => {;

        // Display the result in the popup
        const resultElement = document.getElementById("classification-result");
        const result= response.classification;
        if (result === "Phishing") {
                            resultElement.textContent = "Warning: Phishing detected!";
                            resultElement.style.color = "red";
                        } else if (result === "Suspicious") {
                            resultElement.textContent = "Caution: Suspicious website!";
                            resultElement.style.color = "orange";
                        } else if (result === "Legitimate") {
                            resultElement.textContent = "You are safe to browse :)";
                            resultElement.style.color = "green";
                        }
                    }
    );

});
