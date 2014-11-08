/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 2.2 : How do bacteria make antibiotics
Codechallenge : 
Charging Station :

*/

'use strict';

exports.translateProtein = translateProtein;
exports.translateProteinFromFile = translateProteinFromFile;
exports.transcribeDna = transcribeDna;
exports.encodePeptide = encodePeptide;
exports.encodePeptideFromFile = encodePeptideFromFile;

function translateProteinFromFile(file) {

	var fs = require('fs');
	fs.readFile(file,function(err,data) {
		if(err) throw err;
		if(data) {

			fs.writeFileSync('./output/output_translate.txt',
				translateProtein(data.toString(),'./data/RNA_codon_table_1.txt'));
		}
	});

}

function encodePeptideFromFile(file) {
    var fs = require('fs');
	fs.readFile(file,function(err,data) {
		if(err) throw err;
		if(data) {
            var dataArray = data.toString().split('\n');
            var dna = dataArray[0].replace(/[^a-zA-Z]/,"");
            var peptide = dataArray[1].replace(/[^a-zA-Z]/,"");
            console.log(dna.length);
            console.log(peptide.length);
			fs.writeFileSync('./output/output_encode.txt',
				encodePeptide(dna,peptide,'./data/RNA_codon_table_1.txt'));
		}
	});

}

function translateProtein(rna,rna_codon_table) {

	var fs = require('fs');
	var protein = '';
	var table = fs.readFileSync(rna_codon_table).toString();
	var rows = table.split('\n');
	var dict = {};
	rows.forEach(function(row) {
		var val = row.split(/\b\s+(?!$)/);
		dict[val[0]]=val[1];
	});

	for(var i=0;i<rna.length;i=i+3) {
		var c = rna.substring(i,i+3);
		if(dict[c]!=undefined) {
			protein = protein + dict[c];
		}
	}

	return protein;

}

function transcribeDna(dna) {
    return dna.replace(/T/g,'U');
}

function encodePeptide(text,peptide,rna_codon_table) {
    
    //console.log("Peptide - " + peptide);
    var dnaLength = peptide.length*3;
    //console.log('DNA length : ' + dnaLength);
    var output = '';
    var rev = require('../week1/code2');
    for(var i=0;i<=text.length-dnaLength;i++) {
        var dna = text.substring(i,i+dnaLength);
        var dna_rev = rev.reverseComplement(dna);
        var rna = transcribeDna(dna);
        var rna_rev = transcribeDna(dna_rev);
        var pep_dna = translateProtein(rna,rna_codon_table);
        var pep_dna_rev = translateProtein(rna_rev,rna_codon_table);
        
        if(peptide==pep_dna||peptide==pep_dna_rev) {
            output = output + dna + '\n';
            //console.log(dna);
        }
    }
    
    return output;
}