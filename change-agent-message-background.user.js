// ==UserScript==
// @name         Change Agent Message Background
// @namespace    rschaff
// @version      v1.11
// @description  Change the background color of agent messages on Zendesk
// @author       Rita Schaff
// @updateURL    https://raw.githubusercontent.com/ritaschaff/zendesk-userscripts/main/change-agent-message-background.user.js
// @downloadURL  https://raw.githubusercontent.com/ritaschaff/zendesk-userscripts/main/change-agent-message-background.user.js
// @include      /https:\/\/liferay-?support[0-9]*.zendesk.com\/agent\/.*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zendesk.com
// @include      /https:\/\/liferay-?support[0-9]*.zendesk.com\/agent\/.*/
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js
// @require      https://unpkg.com/stackedit-js@1.0.7/docs/lib/stackedit.min.js
// @require      https://unpkg.com/turndown@5.0.3/dist/turndown.js
// ==/UserScript==

//console.log("🐜 "Change agent message background" executed.")
// change the color here
var bgColor = "#edf7ff"; // kale-100

// change the code span/block color here
var codeColor = "#f8f9f9"; // grey-100

if (unsafeWindow.location.hostname.indexOf('zendesk.com') != -1) {
    if (unsafeWindow.location.pathname.indexOf('/agent/') == 0) {
        setInterval(changeAgentMessageBackground, 1000);

/**
 * Changes the colors for agent messages.
 */
        function changeAgentMessageBackground() {
            var interval = setInterval(function () {
                // Background color
                document.querySelectorAll(".sc-rgtb9i-0.hOccVT").forEach(element => {
                    element.style.backgroundColor = bgColor;
                });
                // Code color
                document.querySelectorAll("pre").forEach(element => {
                    element.style.backgroundColor = codeColor;
                });
                document.querySelectorAll("code").forEach(element => {
                    element.style.backgroundColor = codeColor;
                });
                clearInterval(interval);
            }, 1000);
       }
    }
}