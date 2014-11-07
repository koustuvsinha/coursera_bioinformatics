describe('Clump Finding test suite',function() {

	var clump;
	beforeEach(function() {
		clump = require('../../js/week1/code4');
	});

	it('Testing betterClumpFinding problem',function() {
		var genome = 'GCACAAGGCCGACAATAGGACGTAGCCTTGAAGACGACGTAGCGTGGTCGCATAAGTACAGTAGATAGTACCTCCCCCGCGCATCCTATTATTAAGTTAATT';
		var k = 4;
		var l = 30;
		var t = 3;
		var expected = 'AGTA GACG ';
		expect(clump.betterClumpFinding(genome,k,l,t)).toEqual(expected);
	})

});