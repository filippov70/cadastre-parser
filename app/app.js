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
    console.log(Converter);

    $('input[type=file]').on('change', prepareUpload);
    $('#save-geo').on('click', saveGeoJSON);

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
    };
    
    function saveGeoJSON () {
        jsonfile.writeFile(inputFile+'_Parcels.geojson', parsedData.geoJSONParcels, function(err){
            if (err){
                console.log(err);
                return;
            }
        });
        jsonfile.writeFile(inputFile+'_Bounds.geojson', parsedData.geoJSONBounds, function(err){
            if (err){
                console.log(err);
                return;
            }
        });
        jsonfile.writeFile(inputFile+'_Quarta.geojson', parsedData.geoJSONQuartal, function(err){
            if (err){
                console.log(err);
                return;
            }
        });
        jsonfile.writeFile(inputFile+'_Realty.geojson', parsedData.geoJSONRealty, function(err){
            if (err){
                console.log(err);
                return;
            }
        });
        jsonfile.writeFile(inputFile+'_RealtyCircle.geojson', parsedData.geoJSONRealtyCircle, function(err){
            if (err){
                console.log(err);
                return;
            }
        });
        jsonfile.writeFile(inputFile+'_Zones.geojson', parsedData.geoJSONZones, function(err){
            if (err){
                console.log(err);
                return;
            }
        });
        $('#save-geo').toggleClass('hidden');
    }

