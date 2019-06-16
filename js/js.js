document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
  });

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function download() {
    var headers = {
        ApellidoPaterno: 'Apellido Paterno'/*.replace(/,/g, '')*/,
        // remove commas to avoid errors
        ApellidoMaterno: "Apellido Materno",
        Nombre: "Nombre",
        Nick: "Nick",
        Avatar: "Avatar",
        Equipo: "Equipo",
        Grupo: "Grupo",
        ID: "ID"

    };

    itemsNotFormatted = obj;
    var itemsFormatted = [];

    // format the data
    itemsNotFormatted.forEach((item) => {
        itemsFormatted.push({
            ApellidoPaterno: item.ApellidoPaterno/*.replace(/,/g, '')*/, // remove commas to avoid errors,
            ApellidoMaterno: item.ApellidoMaterno,
            Nombre: item.Nombre,
            Nick: item.Nick,
            Avatar: item.Avatar,
            Equipo: item.Equipo,
            Grupo: item.Grupo,
            ID: item.ID
        });
    });

    var fileTitle = 'lista'; // or 'my-unique-title'

    exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
}

var obj;
var appi = "https://script.googleusercontent.com/macros/echo?user_content_key=0GLHSzgdWiKYT32Ijt_CNw25MVq0B0M-qSXz70E8xLIr7OFpMGYI4IcxDMVbZGiqTcd57bHEAs120_kKWsO-RHZC0ltL6phmm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOY9z_Z9Cw_2cqUCAmtikJyHe_LbblTLrLbHFG-5EOI2IIEXKccz5Yq8mzDTCqnGIg&lib=MSOKllaikh7V9sTmpVLAl5yiYTb7JmIRw";
ft(appi);

function ft(appi) {

    fetch(appi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            obj = data;

            console.log(obj);
            localStorage.setItem("obj", JSON.stringify(obj));
        })
        .catch(function (err) {
            console.error(err);
        });

}
