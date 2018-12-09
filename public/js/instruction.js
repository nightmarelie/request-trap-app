$(document).ready(function () {
    const requests = new Set($('.list-group-item a').map(function () {
        return $(this).text();
    }).get());

    function handleRequest(request) {
        const {trapId} = request;
        
        if (!trapId) {
            return;
        }

        if (requests.has(trapId)) {
            updateRequest(trapId);
        } else {
            $("ul.list-group").prepend(createRequestItem(trapId).hide().show('fast'));
        }
    }

    function createRequestItem(request, count = 1) {
        return $("<li />")
            .addClass("list-group-item d-flex justify-content-between align-items-center")
            .append([$("<a />", {
                id: request,
                href: `/${request}/requests`,
                text: request
            }), $("<span class=\"badge badge-dark\"></span>").text(count)])
    }

    function updateRequest(request) {
        $(`#${request}`).parent('.list-group-item').find('.badge').text((i, oldval) => ++oldval);
    }

    window.handleRequest = handleRequest;
});