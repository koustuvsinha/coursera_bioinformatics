/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 1.7 : Peculiar Statistics of Forward and Reverse Half-Strands
Codechallenge : 
Charging Station : 

Input : dataset_4_41.txt, dataset_4_4.txt

Points noted : 

*/

'use strict';

//-----------------exporting functions------------------------

exports.skewFinder = skewFinder;
exports.calculateSkew = calculateSkew;
exports.minSkew = minSkew;

//-----------------exporting ends-----------------------------

function skewFinder(file) {
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
            var genome = textArray[0].toUpperCase();
            
            //fs.writeFileSync('./output/output_skew.txt',calculateSkew(genome).output);
            fs.writeFileSync('./output/output_skew.txt',minSkew(genome).output);

            var stopTime = new Date().getTime();
            console.log("Stopping execution at : " + stopTime);
            console.log("Total Time taken : " + (stopTime - startTime) + " ms");
        }
    });
    
}

function calculateSkew(genome) {

    var skewArray = [];
    skewArray[0]=0;
    var output = "";
    
    for(var i=0;i<genome.length;i++) {
        output = output + skewArray[i] + " ";
        var nucleotide = genome.charAt(i);
        if(nucleotide==="G") {
            skewArray[i+1] = skewArray[i] + 1;
        } else if(nucleotide==="C") {
            skewArray[i+1] = skewArray[i] - 1;
        } else {
            skewArray[i+1] = skewArray[i];
        }
    }
    return { array : skewArray, output : output };

}

function minSkew(genome) {
    
    var skewArray = calculateSkew(genome).array;
    var minSkew = skewArray.reduce(function(i,min) {
        if(i<min) return i;
        else return min;
    });
    var skewPos = [];
    var output = "";
    for(var i=0;i<skewArray.length;i++) {
        if(skewArray[i]==minSkew) {
            skewPos.push(i);
            output = output + i + " ";
        }
    }
    
    return { array : skewPos, output : output };
}
    