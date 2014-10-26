/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 1.3 : Some Hidden Messages are More Surprising than Others
Codechallenge : matchPattern

*/

'use strict';

var fs = require('fs');
var startTime = new Date().getTime();
console.log("Execution starts at " + startTime);
console.log("Reading file...");
fs.readFile(process.argv[2],function(err,data) {
    console.log("Reading file ends..");
    if(err) throw err;
    else {
        var input = data.toString();
        var inputArray = input.split('\n');
        var pattern = inputArray[0];
        var genome = inputArray[1];

        fs.writeFileSync('./output/output_pattern_vc.txt',matchPattern(pattern,genome));
        var endTime = new Date().getTime();
        console.log("Execution ends at " + endTime);
        console.log("Time taken to execute " + (endTime - startTime) + " ms");
    }

});

//match the pattern in genome and return starting positions array

function matchPattern(pattern,genome) {
    //console.log(pattern);
    //console.log(genome);
    console.log("genome length : " + genome.length);
    var positions = [];
    for(var i=0;i<=genome.length-pattern.length;i++) {
        var str = computeText(genome,i,pattern.length);
       // console.log(str);
        if(str==pattern) {
            positions.push(i);
        }
    }
    //return positions;
    var output = "";
    for(var i=0;i<positions.length;i++) {
        output = output + positions[i] + " ";
    }
    return output;
}

function computeText(text,n,p) {
	var s="";	
	while(p--) {
		s=s.concat(text.charAt(n));
		n++;
	}
	return s;
}