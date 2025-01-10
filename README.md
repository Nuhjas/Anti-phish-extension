# Anti-phish-extension
PhishScan is a lightweight and intuitive browser extension designed to enhance online safety by detecting and alerting users about potentially malicious or phishing websites in real time.

# Table of Contents
    
- [Features](#features)
- [Overview](#overview)
  - [Working](#working)
- [Structure](#structure)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Features

- Real-Time Website Scanning: The Extension scans the websites visited by the user in real-time.
- Phishing Detection: Analyzes web pages for common phishing indicators, such as mismatched domains, unusual URL lengths, and obfuscated links.
- Visual Alerts: Injects a warning banner or notification when a phishing or suspicious site is detected, ensuring users are immediately aware.

## Overview

PhishScan aims to combat the growing threat of phishing attacks by providing an easy-to-use and effective solution for everyday internet users. It’s an essential tool for safeguarding sensitive information like login credentials and personal data while browsing online.

### Working
  1. URL Analysis:
      - When a user visits a website, PhishScan fetches the URL and analyzes it for various characteristics such as:
          - Length of the URL (too long or too short).
          - Presence of suspicious patterns, such as IP addresses or special characters.
          - Whether the domain uses HTTPS or if there are multiple redirections.
  2. Content Evaluasion:
       - PhishScan checks for specific elements like:
          - Suspicious anchor tags or scripts linking to external domains.
          - Forms that might redirect sensitive information to unknown domains.
          - Presence of "mailto" links and other unusual patterns.
        
  3. Real-Time Notification:

      - Based on the analysis, the extension classifies the website as:
          - Legitimate: Safe to browse.
          - Phishing: Immediately exit the site.
       
      - Notifications are displayed using either:
          - A popup interface within the browser.<br>
            <img src="https://github.com/user-attachments/assets/7100b69f-1d21-47a8-b763-bd9cd1972535" width="300"/>
          - A banner injected directly into the website.<br>
            <img src="https://github.com/user-attachments/assets/72d392be-2508-4ca2-950a-de83535ed6d4" width="400"/>
          - A phishing detected notification into the system.<br>
            <img src="https://github.com/user-attachments/assets/058128b0-3ba4-4383-a811-459cba2db0b9" width="400"/>

## Structure
  - `manifest.json`: Defines the extension's metadata, permissions, icons, and the scripts that should be run. It is a crucial file for Chrome extensions.
  - `js/`: Includes JavaScript files that handle the background operations, specific logic or utilities for the extension, such as checking URLs or managing notifications.
  - `html/`: contain the html file for popup.

## Setup

  1. Clone the repository.
       <pre><code>git clone https://github.com/Nuhjas/Anti-phish-extension.git</code></pre>

  2. Open `chrome://extensions/` page in your Chrome browser.
  3. Enable "Developer mode" in the top right corner.
  4. Click on "Load unpacked" and select the `phishscan_extension/` directory from the cloned repository.
  5. The Extension is installed and active in your browser.

## Usage

  Once the extension is successfully installed in your browser. PhishScan will automatically evaluate every site visited and provide real-time feedback via notification, popups or banners.

## License

  This project is licensed under the MIT License

## Contact
  If you have any questions about this project, you can reachout at: nuhmanjaseelap17@gmail.com

