/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 2.2 : 
Codechallenge : 
Charging Station :

*/

'use strict';

exports.translateProtein = translateProtein;
exports.translateProteinFromFile = translateProteinFromFile;

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