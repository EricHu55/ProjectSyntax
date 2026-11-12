(function () {
    function getRows(tableSelector) {
        var selector = tableSelector || "table tr, tables tr";
        return Array.from(document.querySelectorAll(selector));
    }

    function isHeaderRow(row) {
        return row.querySelector("th") !== null;
    }

    function openParentDetails(row) {
        var parent = row.parentElement;

        while (parent) {
            if (parent.tagName && parent.tagName.toLowerCase() === "details") {
                parent.open = true;
            }

            parent = parent.parentElement;
        }
    }

    function searchTableData(searchText, options) {
        var settings = options || {};
        var rows = getRows(settings.rowSelector);
        var query = String(searchText || "").trim().toLowerCase();
        var matches = [];

        rows.forEach(function (row) {
            var matched = query === "" || row.textContent.toLowerCase().includes(query);

            if (isHeaderRow(row)) {
                row.style.display = "";
                return;
            }

            row.style.display = matched ? "" : "none";

            if (matched && query !== "") {
                matches.push(row);

                if (settings.openDetails !== false) {
                    openParentDetails(row);
                }
            }
        });

        return matches;
    }

    function connectTableSearch(inputSelector, options) {
        var input = document.querySelector(inputSelector);

        if (!input) {
            return null;
        }

        input.addEventListener("input", function () {
            searchTableData(input.value, options);
        });

        return input;
    }

    window.searchTableData = searchTableData;
    window.connectTableSearch = connectTableSearch;
}());