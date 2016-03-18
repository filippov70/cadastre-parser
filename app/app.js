/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    //var Converter = require('./libs/cadXML2GeoJSON/cadXML2GeoJSON.js');;
    var inputFile = null;
    var convertedFiles;
    console.log(Converter);

    $('input[type=file]').on('change', prepareUpload);

    function prepareUpload(event) {
        inputFile = event.target.files[0].path;
        console.log(inputFile);
        var parsedData;
        
        $.get(inputFile, function (xml) {
            //var json = $.xml2json(xml).CadastralBlocks;
            // $("#data").html('<code>'+JSON.stringify(json)+'</code>');
            console.log(Converter);
            parsedData = Converter.GeoJSON(xml);
            console.log(parsedData);
        }).success(
                function () {
                    convertedFiles = parsedData;
                    console.log(parsedData);
                }
        );
    }

