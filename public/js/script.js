$(document).ready(function () {
    function showHideAlert() {
        const alert = $("#success-alert"); 
        toggleAlertClasses(alert);

        setTimeout(function() { 
            toggleAlertClasses(alert);
        }, 1500);
    }

    function toggleAlertClasses(alert) {
        alert.toggleClass("hide").toggleClass("show")
    }

    window.showHideAlert = showHideAlert;
});
