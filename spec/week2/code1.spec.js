'use strict';

describe('Testing for protein translation problem',function() {
	
	var pt;

	beforeEach(function() {
		pt = require('../../js/week2/code1');
	});

	it('Testing protein translation',function() {
		var rna = 'AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA';
		var protein = 'MAMAPRTEINSTRING';
		var rna_codon_table = './data/RNA_codon_table_1.txt';
		expect(pt.translateProtein(rna,rna_codon_table)).toEqual(protein);
	});
});