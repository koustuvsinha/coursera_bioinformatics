/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 1.8 : Some hidden messages are more elusive than others
Codechallenge : 
Charging Station : 

Input : 

Points noted : 

*/

'use strict';

//-----------------exporting functions------------------------

exports.moreElusiveHiddenMessage = moreElusiveHiddenMessage;
exports.hammingDistance = hammingDistance;
exports.approximatePatternMatcher = approximatePatternMatcher;
exports.approximatePatternCount = approximatePatternCount;

//-----------------exporting ends-----------------------------

function moreElusiveHiddenMessage(file,option) {
    var fs = require('fs');
    var startTime = new Date().getTime();

    console.log("Starting execution at : " + startTime);
    console.log("Reading file started ... ");
    fs.readFile(file,function(err,data) {
        console.log("Reading file ends..");
        if(err) throw err;
        else {
            var input = data.toString();
            var textArray = input.split('\n');
            if(option===1) {
                
                var genome1 = textArray[0].toUpperCase();
                var genome2 = textArray[1].toUpperCase();
            
                fs.writeFileSync('./output/output_ham.txt',hammingDistance(genome1,genome2));

            }
            if(option==2) {
                
                var pattern = textArray[0].toUpperCase();
                pattern = pattern.replace(/[^a-zA-Z]/,"");
                var text = textArray[1].toUpperCase();
                var d = parseInt(textArray[2]);
                
                fs.writeFile('./output/output_app_ham.txt',approximatePatternMatcher(pattern,text,d).output,function(err) {
                    if(err) throw err;
                    return true;
                });
            }
            
            if(option==3) {
             
                var text = textArray[0].toString().toUpperCase();
                var pattern = textArray[1].toString().toUpperCase().replace(/[^a-zA-Z]/,"");
                var d = parseInt(textArray[2]);
                
                console.log(approximatePatternCount(pattern,text,d));
                
            }
            
            var stopTime = new Date().getTime();
            console.log("Stopping execution at : " + stopTime);
            console.log("Total Time taken : " + (stopTime - startTime) + " ms");
        }
    });
    
}

function hammingDistance(genome1,genome2) {
 
    var hdist = 0;
    var minLength = genome1.length <= genome2.length ? genome1.length : genome2.length;
    for(var i=0;i<minLength;i++) {
        var g1 = genome1.charAt(i);
        var g2 = genome2.charAt(i);
        if(g1!==g2) {
            hdist++;
        }
    }
    if(genome1.length > minLength) {
        hdist = hdist + (genome1.length - minLength);
    }
    if(genome2.length > minLength) {
        hdist = hdist + (genome2.length - minLength);
    }
    
    return hdist;
    
}

function approximatePatternMatcher(pattern,text,d) {
    
    //console.log(pattern.length);
    var hmp = require('./code1');
    var positions = [];
    var output = "";
//    var debug = "";
    for(var i=0;i<=text.length-pattern.length;i++) {
        var pattern2 = hmp.computeText(text,i,pattern.length);
        var dist = hammingDistance(pattern,pattern2);
        /*debug = debug + "index : " + i + ", " + pattern + "," + pattern2 + " : " + dist + "\n";*/
        if(dist<=d) {
            positions.push(i);
            if(i==(text.length-pattern.length-1))
                output = output + i;
            else
                output = output + i + " ";
        }
    }
//    var fs = require('fs');
//    fs.writeFileSync('./output/output_log.txt',debug);
    return { array : positions, output : output};
}

function approximatePatternCount(pattern,text,d) {
 
    var hmp = require('./code1');
    var count = 0;
    var debug = "";
    for(var i=0;i<=text.length-pattern.length;i++) {
        var pattern2 = hmp.computeText(text,i,pattern.length);
        var dist = hammingDistance(pattern,pattern2);
        if(dist<=d) {
            debug = debug + "index : " + i + ", " + pattern + "," + pattern2 + " : " + dist + "\n";
            count++;
        }
    }
    var fs = require('fs');
    fs.writeFileSync('./output/output_log.txt',debug);
    return count;
}