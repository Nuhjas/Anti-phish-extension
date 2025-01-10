var classification

function classifyURL() {
    // Retrieve the current URL
    const url = window.location.href;

    // 1: Check if IP is present in the URL
    function isIPInURL() {
        const reg = /\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}/;
        return reg.test(url) ? "Phishing" : "Legitimate";
    }

    // 2: Check if the URL length is long
    function isLongURL() {
        if (url.length < 54) return "Legitimate";
        if (url.length >= 54 && url.length <= 75) return "Suspicious";
        return "Phishing";
    }

    // 3: Check if the URL is very short
    function isTinyURL() {
        return url.length > 20 ? "Legitimate" : "Phishing";
    }

    // 4: Check if the URL contains @ (to redirect)
    function isAlphaNumericURL() {
        return url.includes("@") ? "Phishing" : "Legitimate";
    }

    // 5: Check for redirecting behavior
    function isRedirectingURL() {
        return url.includes("//") && url.indexOf("//") > 6 ? "Phishing" : "Legitimate";
    }

    // 6: Check if the URL contains hyphens
    function isHyphenURL() {
        const domain = url.split("/")[2] || "";
        return domain.includes("-") ? "Phishing" : "Legitimate";
    }

    // 7: Check for multiple subdomains
    function isMultiDomainURL() {
        const domainParts = url.split("/")[2]?.split(".") || [];
        return domainParts.length > 3 ? "Phishing" : "Legitimate";
    }

    // 8: Check if the favicon domain is different
    function isFaviconDomainUnidentical() {
        const faviconLink = document.querySelector("link[rel*='icon']");
        const faviconDomain = faviconLink?.href.split("/")[2] || "";
        const mainDomain = url.split("/")[2] || "";
        return faviconDomain && faviconDomain !== mainDomain ? "Phishing" : "Legitimate";
    }

    // 9: Check for HTTPS presence in a suspicious context
    function isIllegalHttpsURL() {
        return url.startsWith("https://") ? "Legitimate" : "Phishing";
    }

    // 10: Check if many images are from different domains
    function isImgFromDifferentDomain() {
        const imgs = document.querySelectorAll("img");
        const totalCount = imgs.length;
        
        const mainDomain = url.split("/")[2] || "";
        const differentDomainCount = Array.from(imgs).filter(img => {
            const srcDomain = img.src.split("/")[2] || "";
            return srcDomain && srcDomain !== mainDomain;
        }).length;
        return differentDomainCount / totalCount > 0.22 ? "Phishing" : "Legitimate";
    }

    // 11: Check if many anchors are from different domains
    function isAnchorFromDifferentDomain() {
        const anchors = document.querySelectorAll("a");
        const totalCount = anchors.length;
        const mainDomain = url.split("/")[2] || "";
        const differentDomainCount = Array.from(anchors).filter(anchor => {
            const hrefDomain = anchor.href.split("/")[2] || "";
            return hrefDomain && hrefDomain !== mainDomain;
        }).length;
        return differentDomainCount / totalCount > 0.31 ? "Phishing" : "Legitimate";
    }

    // 12: Check if many scripts/links are from different domains
    function isScLnkFromDifferentDomain() {
        const scriptsAndLinks = [...document.querySelectorAll("script"), ...document.querySelectorAll("link")];
        const totalCount = scriptsAndLinks.length;
        const mainDomain = url.split("/")[2] || "";
        const differentDomainCount = scriptsAndLinks.filter(element => {
            const domain = (element.src || element.href)?.split("/")[2] || "";
            return domain && domain !== mainDomain;
        }).length;
        return differentDomainCount / totalCount > 0.17 ? "Phishing" : "Legitimate";
    }

    // 13: Check if form actions are invalid
    function isFormActionInvalid() {
        const forms = document.querySelectorAll("form[action]");
        return forms.length === 0 ? "Legitimate" : "Suspicious";
    }

    // 14: Check if mailto links are present
    function isMailToAvailable() {
        return document.querySelectorAll("a[href^='mailto:']").length > 0 ? "Phishing" : "Legitimate";
    }

    // 15: Check if status bar is tampered
    function isStatusBarTampered() {
        const tamperedLinks = document.querySelectorAll("a[onmouseover*='window.status'], a[onclick*='location.href']");
        return tamperedLinks.length > 0 ? "Phishing" : "Legitimate";
    }

    // 16: Check if iframes are present
    function isIframePresent() {
        return document.querySelectorAll("iframe").length > 0 ? "Phishing" : "Legitimate";
    }

    // Combine all checks
    const results = [
        isIPInURL(),
        isLongURL(),
        isTinyURL(),
        isAlphaNumericURL(),
        isRedirectingURL(),
        isHyphenURL(),
        isMultiDomainURL(),
        isFaviconDomainUnidentical(),
        isIllegalHttpsURL(),
        isImgFromDifferentDomain(),
        isAnchorFromDifferentDomain(),
        isScLnkFromDifferentDomain(),
        isFormActionInvalid(),
        isMailToAvailable(),
        isStatusBarTampered(),
        isIframePresent(),
    ];

    console.log("Results of checks: ", results);

    // Determine final classification based on majority
    const phishingCount = results.filter(r => r === "Phishing").length;

    if(phishingCount<3){
        return "Legitimate";
    }
    else if(phishingCount>3){
        return "Phishing";
    }
   
}

// Run the classification
classification = classifyURL();

chrome.runtime.sendMessage({ classification}, () => {
});
