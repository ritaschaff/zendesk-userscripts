// ==UserScript==
// @name         Copy links
// @namespace    ritaschaff
// @version      v1.0
// @description  Adds a button to the ticket filter views that copies links
// @author       Rita Schaff
// @updateURL    https://raw.githubusercontent.com/ritaschaff/zendesk-userscripts/main/Copy links.user.js
// @downloadURL  https://raw.githubusercontent.com/ritaschaff/zendesk-userscripts/main/Copy links.user.js
// @include      /https:\/\/liferay-?support[0-9]*.zendesk.com\/agent\/.*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zendesk.com
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js
// @require      https://unpkg.com/stackedit-js@1.0.7/docs/lib/stackedit.min.js
// @require      https://unpkg.com/turndown@5.0.3/dist/turndown.js
// ==/UserScript==


if (unsafeWindow.location.hostname.indexOf('zendesk.com') != -1) {
    if (unsafeWindow.location.pathname.indexOf('/agent/') == 0) {

        var interval = setInterval(addCopyLinksButton, 500);

        /**
         * Creates a copy links button
         */
        function addCopyLinksButton() {


            // Create the button element
            const button = document.createElement('button');
            button.setAttribute('data-garden-id', 'buttons.button');
            button.setAttribute('data-garden-version', '8.76.3');
            button.setAttribute('type', 'button');
            button.setAttribute('data-test-id', 'copy-links-button');
            button.className = 'sc-1srt570-1 sc-1srt570-2 hMjcBs StyledButton-sc-qe3ace-0 cBBpso';

            // Create the SVG element
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('width', '16');
            svg.setAttribute('height', '16');
            svg.setAttribute('viewBox', '0 0 16 16');
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('focusable', 'false');
            svg.setAttribute('data-garden-id', 'buttons.icon');
            svg.setAttribute('data-garden-version', '8.76.3');
            svg.setAttribute('position', 'start');
            svg.setAttributeNS(null, 'class', 'StyledIcon-sc-19meqgg-0 jaqJsu');

            // Create the path element
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'currentColor');
            path.setAttribute('d', 'M3.5 10a.5.5 0 110 1H1a1 1 0 01-1-1V1a1 1 0 011-1h9a1 1 0 011 1v2.5a.5.5 0 11-1 0V1H1v9h2.5zM6 6v9h9V6H6zm0-1h9a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1z');

            // Append the path to the SVG
            svg.appendChild(path);

            // Append the SVG to the button
            button.appendChild(svg);

            // Create the text node for the button
            const buttonText = document.createTextNode('Copy links');

            // Append the text node to the button
            button.appendChild(buttonText);

            // Find the target div with the class 'sc-1xqc7ya-2 bUeemm'
            const targetDiv = document.querySelector('.sc-1xqc7ya-2.bUeemm');

            // Append the button to the target div
            if (targetDiv) {
                targetDiv.appendChild(button);
            } else {
                console.info('Copy links: Target div has not been found yet.');
                return;
            }


            // Function to copy text to the clipboard using the Clipboard API
            async function copyToClipboardAPI() {
                try {

                    // Select all the elements that contain the ticket numbers
                    const ticketElements = document.querySelectorAll('[data-test-id="generic-table-cells-id"]');

                    // Array to store all URLs
                    const urls = [];

                    // Loop through each element and extract the ticket number
                    ticketElements.forEach(element => {

                        const ticketText = element.textContent.trim(); // Get the text content, e.g., "#116128"
                        const ticketNumber = ticketText.replace('#', ''); // Remove the "#" to get just the number

                        // Construct the URL
                        const url = `https://liferay-support.zendesk.com/agent/tickets/${ticketNumber}`;

                        // Add the URL to the array
                        urls.push(url);
                        //console.log(urls);
                    });


                    // Join all the URLs
                    const allUrls = urls.join('\n');

                    // Use the Clipboard API to write text to the clipboard
                    await navigator.clipboard.writeText(allUrls);
                    console.log(allUrls);
                    alert('Links copied to clipboard!');
                } catch (err) {
                    // Handle errors, such as if the clipboard access fails
                    console.error('Failed to copy to clipboard:', err);
                    alert('Failed to copy links to clipboard.');
                }
            }

            // Get the button element by its data-test-id attribute
            const copyButton = document.querySelector('[data-test-id="copy-links-button"]');

            // Add click event listener to the button
            copyButton.addEventListener('click', function() {
                copyToClipboardAPI(); // Call copyToClipboardAPI
            });

            clearInterval(interval);
        }
    }
}