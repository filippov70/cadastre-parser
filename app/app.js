/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Converter = require('cadXML2GeoJSON/cadXML2GeoJSON.js');
var fs = require('fs');
var jsonfile = require('jsonfile');
var inputFile = null;
var convertedFiles;
var app = require('electron').remote;
var dialog = app.dialog;
//console.log(Converter);

$('#input-file').on('click', loadXml);
$('#save-geo').on('click', saveGeoJSON);

// открытие средствами NodeJS
function loadXml() {
    dialog.showOpenDialog(function (fileNames) {
        if (fileNames === undefined) {
            console.log("No file selected");
            // https://github.com/nodejs/node/pull/4394
        } else {
            fs.readFileSync(fileNames[0], 'utf-8', function (err, data) {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }
                parsedData = Converter.GeoJSON(data, false);
                console.log(parsedData);
                $('#save-geo').toggleClass('hidden');
            });
        }
    });
}

// открытие средствами HTML 5
function prepareUpload(event) {
    inputFile = event.target.files[0].path;
    //console.log(Converter);

    $.get(inputFile, function (xml) {
        //var json = $.xml2json(xml).CadastralBlocks;
        // $("#data").html('<code>'+JSON.stringify(json)+'</code>');
        parsedData = Converter.GeoJSON(xml, false);
        console.log(parsedData);
    }).success(
            function () {
                convertedFiles = parsedData;
                console.log(convertedFiles);
                $('#save-geo').toggleClass('hidden');
            }
    );
}
;

function saveGeoJSON() {
    jsonfile.writeFile(inputFile + '_Parcels.geojson', parsedData.geoJSONParcels, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    jsonfile.writeFile(inputFile + '_Bounds.geojson', parsedData.geoJSONBounds, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    jsonfile.writeFile(inputFile + '_Quarta.geojson', parsedData.geoJSONQuartal, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    jsonfile.writeFile(inputFile + '_Realty.geojson', parsedData.geoJSONRealty, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    jsonfile.writeFile(inputFile + '_RealtyCircle.geojson', parsedData.geoJSONRealtyCircle, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    jsonfile.writeFile(inputFile + '_Zones.geojson', parsedData.geoJSONZones, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    $('#save-geo').toggleClass('hidden');
}

