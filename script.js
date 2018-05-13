(function() {
    "use strict";

    var form;
    var urlInput;

    document.addEventListener("DOMContentLoaded", function() {
        form = document.getElementById("shortener-form");
        urlInput = document.getElementById("url-input");

        form.addEventListener("submit", startSubmit);
        urlInput.addEventListener("input", removeError);
    });

    function removeError() {
        this.classList.remove("invalid");
    }

    function startSubmit(event) {
        event.preventDefault();
        
        if(validateForm()) {
            getShortenedUrl().then(function(data) {

            }).catch(function(error) {

            });
        }
    }

    function validateForm() {
        var urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        
        if(!urlInput.value || !urlPattern.test(urlInput.value)) {
            urlInput.classList.add("invalid");
            return false;
        }

        return true;
    }

    function getShortenedUrl() {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            var formData = { url: urlInput.value };

            request.open("POST", window.env.apiUrl + "/generateURL", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(formData));

            request.onload = function() {
                var response = JSON.parse(request.responseText);

                if(request.status === 200) {
                    return resolve({ success: true, message: response });
                } else {
                    return reject({ success: false, message: response.message });
                }
            }

            request.onerror = function() {
                return reject({ success: false, message: "An error occurred generating URL" });
            }
        });
    }
})();