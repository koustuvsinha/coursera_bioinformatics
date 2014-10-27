/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 1.4 : An Explosion of Hidden Messages
Codechallenge : findClumps
Charging Station : betterClumpFinding

Problem statement : Clump Finding Problem: Find patterns forming clumps in a string.
(L,t) clumps - L being the window, t the least number of k-mers present in that window

Input : dataset_4_41.txt, dataset_4_4.txt

Points noted : 
findClumps algorithm is self-brewn

*/

'use strict';

//-----------------exporting functions------------------------

exports.clumpFindingProblem = clumpFindingProblem;
exports.findClumps = findClumps;

//-----------------exporting ends-----------------------------

function clumpFindingProblem(file) {
    
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
            //console.log(textArray);
            var genome = textArray[0].toUpperCase();
            var ctrl = textArray[1];
            var controls = ctrl.split(/\b\s+(?!$)/);
            //console.log(controls);

            var k = controls[0];                         //k mer
            var l = controls[1];                         //window size L
            var t = controls[2];                         //limit, appearing at least t times
           
            fs.writeFileSync('./output/output_clump.txt',findClumps(genome,k,l,t));

            var stopTime = new Date().getTime();
            console.log("Stopping execution at : " + stopTime);
            console.log("Total Time taken : " + (stopTime - startTime) + " ms");
        }
    });
    
}


//Solution logic: find fasterFrequentWordsByLimit having limit t, so we have atleast t number of k-mers
//in the whole set.
//Now for each k-mer find the positions matrix from patternMatch, 
//loop over each positions and step by t, and calculate the difference between first and last element
//if any one difference is less than or equal to L, then we have that k-mer in clump

function findClumps(genome,k,l,t) {
    
    var output = "";
    var fs = require('fs');
    var hmp = require('./code1');
    var patternMatcher = require('./code3');
    /*var words = [];
    for(var i=0;i<=genome.length-l;i++) {
        var genome_substr = hmp.computeText(genome,i,l);
        var wordArray = hmp.fasterFrequentWordsByLimit(genome_substr,k,t);
        wordArray.forEach(function(w) {
            words.push(w);
        });
    }
    console.log(words);*/
    var words = hmp.fasterFrequentWordsByLimit(genome,k,t);
    //words = hmp.uniqueArray(words);
    if(words.length>0) {
        words.forEach(function(word) {
            var positions = patternMatcher.matchPattern(word,genome);
            var isPresent = false;
            for(var i=0;i<positions.length;i=i+t) {
                if(positions[i+t-1]-positions[i]<=l)
                    isPresent = true;
                    break; 
            }
            if(isPresent) {
                console.log(word);
                output = output + word + " ";
            }
            
        });
    }
    return output;
}

//betterClumpFinding algorithm as described in Charging Station

function betterClumpFinding(genome,k,l,t) {
    
    
}

