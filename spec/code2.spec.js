"use strict";

describe("Test suite for reverseComplement",function() {
	it('Testing reverse complement',function() {
		var rev = require('../js/code2');
		var pattern = 'ATGCT';
		var complement = 'AGCAT';
		expect(rev.reverseComplement(pattern)).toEqual(complement);
	})
});