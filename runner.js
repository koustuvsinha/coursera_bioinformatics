/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Running :
npm js/runner.js

*/

'use strict';

var prompt = require('prompt');
var fs = require('fs');

    
console.log("Bioinformatics Coursera JS Rendition");
console.log("Author : Koustuv Sinha");
console.log("--------------------------------------");
console.log("1.fasterFrequentWords");
console.log("2.findingFrequentWordsBySorting");
console.log("3.fasterFrequentWordsByLimit");
console.log("4.reverseComplement");
console.log("5.matchPattern");
console.log("6.findClumps");
console.log("---------------------------------------");

prompt.start();
prompt.get(['option','file','k'],function(err,result) {
    if(err) { throw err; }
    else {
        var option = parseInt(result.option);
        var input = result.file;
        var  k = result.k;
        runModule(option,input,k);
    }
});

function runModule(option,input,k) {

    switch(option) {
     
            case 1 :
                    var hmp = require('./js/code1');
                    console.log(hmp.hiddenMessageFinder(input,1,k,0));
                    
            break;
            
            case 3 :
                    var hmp = require('./js/code1');
                    prompt.start();
                    prompt.get(['limit'],function(err,result) {
                        if(err) { throw err; }
                        else {
                            var limit = result.limit;
                            console.log(hmp.hiddenMessageFinder(input,1,k,limit));
                        }
                    });
                    
                    
            break;
            
            case 6 : 
                    var cfp = require('./js/code4');
                    console.log(cfp.clumpFindingProblem(input));
            break;
            
            default : 
            break;
            
    }

}