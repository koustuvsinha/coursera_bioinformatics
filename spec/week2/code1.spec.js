'use strict';

describe('Testing for protein translation & encoding problem',function() {
	
	var pt;
    var rna_codon_table = './data/RNA_codon_table_1.txt';

	beforeEach(function() {
		pt = require('../../js/week2/code1');
	});

	it('Testing RNA protein translation',function() {
		var rna = 'AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA';
		//var rna = 'AAGGAAGUAUUCGAACCACAUUACUAU';
        var protein = 'MAMAPRTEINSTRING';
		//expect(pt.translateProtein(rna,rna_codon_table)).toEqual(protein);
	});
    
    it('Testing transcribeDna',function() {
        var dna = 'GAAACT';
        var rna = 'GAAACU';
        expect(pt.transcribeDna(dna)).toEqual(rna);
    });
    
    it('Testing DNA to protein translation',function() {
        var dna = 'GTAGTAGTGCGGCTCAAAAACTTCCTT';
        var peptide = 'VVVRLKNFL';
        //expect(pt.translateProtein(pt.transcribeDna(dna),rna_codon_table)).toEqual(peptide);
    });
    
    it('Testing reverse DNA to protein translation',function() {
        var dna = 'GTAGTAGTGCGGCTCAAAAACTTCCTT';
        var peptide = 'KEVFEPHYY';
        var code2 = require('../../js/week1/code2');
        //expect(pt.translateProtein(pt.transcribeDna(code2.reverseComplement(dna)),rna_codon_table)).toEqual(peptide);
    });
        
    
    it('Testing encodePeptide',function() {
        var text = 'ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA';
        var peptide = 'MA';
        var expected = 'ATGGCC\nGGCCAT\nATGGCC\n';
        expect(pt.encodePeptide(text,peptide,rna_codon_table)).toEqual(expected);
    });
});
