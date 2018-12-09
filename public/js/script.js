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

    $(window).scroll(function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $("#on-top").css("display", "block");
        } else {
            $("#on-top").css("display", "none");
        }
    });

    $("#on-top").click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false; 
    });

    window.showHideAlert = showHideAlert;
});
