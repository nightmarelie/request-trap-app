$(document).ready(function () {
    const mapHeaderRequest = new Map([
        ["date", "Request date"], 
        ["ip", "Remote ip"],
        ["method", "Request-method"],
        ["scheme", "Scheme"],
        ["query", "Query-string	"],
        ["params", "Query-params"],
        ["cookie", "Cookies"],
        ["headers", "Headers"]
    ]);

    function createRequest(request) {
        $('div.request-container').find('h1').after(
            $("<table />")
            .addClass("table table-bordered table-dark table-condensed")
            .append($("<tbody />").append(() => {
                const trs = [];

                for (let [key, value] of Object.entries(request)) {
                    if (!mapHeaderRequest.has(key)) {
                        continue;
                    }

                    const keyTD = $("<td/ >").text(mapHeaderRequest.get(key));
                    const valueTD = $("<td/ >");
                    
                    if (value instanceof Array) {
                        valueTD.append($("<ul />").addClass("list-unstyled").append(() => {
                            const lis = [];
                            for (let {key: k, value: v} of value) 
                                lis.push($("<li />").append([$("<strong />").text(`${k}:`), " ", v]));
                            return lis;
                        }));
                    } else if (key === 'method') {
                        valueTD.append($("<span />").addClass(`badge badge-secondary ${value}`).text(value))
                    } else {
                        valueTD.text(value);
                    }

                    trs.push($("<tr />").append([keyTD, valueTD]))
                }

                return trs;
            }))
        ).hide().show("fast");
    }

    window.createRequest = createRequest;
});