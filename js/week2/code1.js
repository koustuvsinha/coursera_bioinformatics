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
exports.encodePeptideFromLargeFile = encodePeptideFromLargeFile;

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

function encodePeptideFromLargeFile(file) {
    var fs = require('fs');
	fs.readFile(file,function(err,data) {
		if(err) throw err;
		if(data) {
            var dna = data.toString().replace(/[^a-zA-Z]/,"");
            var peptide = 'VKLFPWFNQY';
            //var peptide = 'KEVFEPHYY';
            console.log(dna.length);
            console.log(peptide.length);
			fs.writeFileSync('./output/output_encode_large.txt',
				encodePeptide(dna,peptide,'./data/RNA_codon_table_1.txt'));
		}
	});

}

//takes linear time N , rna.length

function translateProtein(rna,dict) {

	var protein = '';
	
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
    
    var fs = require('fs');

    console.log('Text Length : ' + text.length);
    console.log("Peptide - " + peptide);
    var dnaLength = peptide.length*3;
    //console.log('DNA length : ' + dnaLength);
    var count = 0;
    var output = '';
    var rev = require('../week1/code2');
    
    var table = fs.readFileSync(rna_codon_table).toString();
	var rows = table.split('\n');
	var dict = {};
	rows.forEach(function(row) {
		var val = row.split(/\b\s+(?!$)/);
		dict[val[0]]=val[1];
	});
    
    var len = text.length-dnaLength;
    
    for(var i=0;i<=len;i++) {
        
        /*var per = (i/len)*100;
        if(i%100==0) {
            process.stdout.clearLine();  // clear current text
            process.stdout.cursorTo(0);
            process.stdout.write((Math.round(per*100)/100).toString() + "%");
        }*/
        
        var dna = text.substring(i,i+dnaLength);
        var dna_rev = rev.reverseComplement(dna);
        var rna = transcribeDna(dna);
        var rna_rev = transcribeDna(dna_rev);
        var pep_dna = translateProtein(rna,dict);
        var pep_dna_rev = translateProtein(rna_rev,dict);
        
        if(peptide==pep_dna||peptide==pep_dna_rev) {
            output = output + dna + '\n';
            count++;
            //console.log(dna);
        }
    }
    console.log('Count : ' + count);
    return output;
}