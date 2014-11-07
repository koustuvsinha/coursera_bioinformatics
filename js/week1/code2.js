/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 1.3 : Some Hidden Messages are More Surprising than Others
Codechallenge : reverseComplement

*/


'use strict';

exports.reverseFinder = reverseFinder;
exports.reverseComplement = reverseComplement;


function reverseFinder(file) {
    
    var fs = require('fs');
    var startTime = new Date().getTime();
    console.log("Execution starts at " + startTime);
    var input = fs.readFileSync(file).toString();

    fs.writeFileSync('./output/output_reverse.txt',reverseComplement(input));
    var endTime = new Date().getTime();
    console.log("Execution ends at " + endTime);
    console.log("Time taken to execute " + (endTime - startTime) + " ms");

}


//generates the reverse complement of a genome
//example : AGCTA --> TAGCT

function reverseComplement(input) {
    var reverseDict = {
        "A" : "T",
        "G" : "C",
        "C" : "G",
        "T" : "A"
    };
    var reverse = [];
    for(var i=0;i<input.length;i++) {
      reverse.push(reverseDict[input.charAt(i)]);
    }
    var output = "";
    for(var i=input.length-1;i>=0;i--) {
        output = output + reverse[i];
    }
    return output;
}