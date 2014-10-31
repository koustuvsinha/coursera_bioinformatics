describe('Test suite for code7',function() {

	var t;

	beforeEach(function() {
		t = require('../js/code7');	
	});

	it('Testing immediate neighbours',function() {

		var pattern = 'AA';
		var neighbours = ['AA','AC','AG','AT','CA','GA','TA'];
		expect(t.immediateNeighbours(pattern).sort()).toEqual(neighbours.sort());

	});

	it('Testing neighbours with d',function() {

		var pattern = 'ACG';
		var neighbours = ['CCG','TCG','GCG','AAG','ATG','AGG','ACA','ACC','ACT','ACG'];
		var d = 1;
		expect(t.neighbours(pattern,d).sort()).toEqual(neighbours.sort());

	});

});