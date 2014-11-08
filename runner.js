/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Running :
npm js/runner.js

*/

'use strict';

var prompt = require('prompt');
prompt.start();
prompt.get(['week','code','method','file','options'],function(err,result) {
    if(err) { throw err; }
    else {
        var requireString = './js/week' + result.week + '/code' + result.code;
        var module = require(requireString);
        var file = './data/' + result.file + '.txt';
        if(result.options==''||result.options==undefined) {
            module[result.method](file);
        } else {
            var options = result.options.split(/\b\s+(?!$)/);
            module[result.method](file,options);
        }
    }
});