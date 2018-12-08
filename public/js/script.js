$(document).ready(function () {
    function showHideAlert(seconds = 2000) {
        const alert = $("#success-alert"); 
        toggleAlertClasses(alert);

        setTimeout(function() { 
            toggleAlertClasses(alert);
        }, seconds);
    }

    function toggleAlertClasses(alert) {
        alert.toggleClass("hide").toggleClass("show")
    }

    window.showHideAlert = showHideAlert;
});
