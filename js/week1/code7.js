/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 1.8 : Some hidden messages are more elusive than others
Implementing suggested algorithms
Codechallenge : 
Charging Station : 

Input : 

Points noted : 

*/

'use strict';

exports.immediateNeighbours = immediateNeighbours;
exports.neighbours = neighbours;
exports.neighbourCalculation = neighbourCalculation;

function neighbourCalculation(file) {
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

            var n = neighbours(textArray[0].toString().toUpperCase().replace(/[^a-zA-Z]/,""),parseInt(textArray[1]));
            var output = "";
            n.forEach(function(x) {
            	output = output + x + "\n";
            })

            fs.writeFileSync('./output/output_neighbours.txt',output);
            
            var stopTime = new Date().getTime();
            console.log("Stopping execution at : " + stopTime);
            console.log("Total Time taken : " + (stopTime - startTime) + " ms");
        }
    });
}

function immediateNeighbours(pattern) {

	var neighbourhood = [];
	var dict = ['A','C','G','T'];
	neighbourhood.push(pattern);
	for(var i=0;i<pattern.length;i++) {
		var n = pattern.charAt(i);
		dict.forEach(function(nucleotide) {
			if(nucleotide!=n) {
				var neighbour = pattern.substring(0,i) + nucleotide + pattern.substring(i+1,pattern.length);
				neighbourhood.push(neighbour);
			}
		});
	}

	return neighbourhood;

}

function suffix(pattern) {
	return pattern.substring(1,pattern.length);
}

function neighbours(pattern,d) {
	
	var ham = require('./code6');
	var dict = ['A','C','G','T'];
	if(d==0) return [pattern];
	if(pattern.length===1) return ['A','C','G','T'];
	var neighbourhood = [];
	var suffixNeighbours = neighbours(suffix(pattern),d);
	suffixNeighbours.forEach(function(text) {
		if(ham.hammingDistance(suffix(pattern),text)<d) {
			dict.forEach(function(nucleotide) {
				neighbourhood.push(nucleotide+text);
			})
		} else {
			neighbourhood.push(pattern.charAt(0)+text);
		}	
	});
	return neighbourhood;
}