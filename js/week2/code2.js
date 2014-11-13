/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 2.3 : Sequencing Antibiotics by shattering into pieces
Codechallenge : 
Charging Station :

*/

'use strict';

exports.linearSpectrum = linearSpectrum;
exports.linearSpectrumRunner = linearSpectrumRunner;

function linearSpectrumRunner(file) {
    var fs = require('fs');
	fs.readFile(file,function(err,data) {
		if(err) throw err;
		if(data) {
            var peptide = data.toString().replace(/[^a-zA-Z]/,"");
            var output = '';
            var spectrum = linearSpectrum(peptide);
            spectrum.forEach(function(s) {
                output = output + s + ' ';
            });
			fs.writeFileSync('./output/output_linearSpectrum.txt',
				output);
		}
	});
}

function linearSpectrum(peptide) {
    var prefixMass = [];
    var aminoAcid = [];
    var aminoAcidMass = [];
    var fs = require('fs');
    var table = fs.readFileSync('./data/integer_mass_table.txt');
    var rows = table.toString().split('\n');
    rows.forEach(function(row) {
        var col = row.toString().split(/\b\s+(?!$)/);
        aminoAcid.push(col[0]);
        aminoAcidMass.push(col[1]);
        col = [];
    });
    prefixMass[0] = 0;
    for(var i=1;i<=peptide.length;i++) {
        for(var j=0;j<20;j++) {
            var amino = peptide.charAt(i-1);
            if(aminoAcid[j]==amino) {
                prefixMass[i] = prefixMass[i-1] + parseInt(aminoAcidMass[j]);
            }
        }
    }
    var linearSpectrum = [0];
    for(var i=0;i<peptide.length;i++) {
        for(var j=i+1;j<=peptide.length;j++) {
            linearSpectrum.push(prefixMass[j]-prefixMass[i]);
        }
    }
    var hmp = require('../week1/code1');
    return hmp.qsort(linearSpectrum);
}

    