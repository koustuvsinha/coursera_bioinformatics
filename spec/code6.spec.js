'use strict';

describe('Test suite for Some hidden messages are more elusive for others',function() {
    
    var ham;
    beforeEach(function() {
        ham = require('../js/code6');
    });
    
    it('Testing for hamming distance with equal length',function() {
        var genome1 = 'GGGCCGTTGGT';
        var genome2 = 'GGACCGTTGAC';
        var expected = 3;
        expect(ham.hammingDistance(genome1,genome2)).toEqual(expected);
    });
    
    it('Testing for hamming distance with unequal length in genome1',function() {
        var genome1 = 'GGGCCGTTGGTA';
        var genome2 = 'GGACCGTTGAC';
        var expected = 4;
        expect(ham.hammingDistance(genome1,genome2)).toEqual(expected);
    });
    
    it('Testing for hamming distance with unequal length in genome2',function() {
        var genome1 = 'AGGTACAT';
        var genome2 = 'ATACAACT';
        var expected = 5;
        expect(ham.hammingDistance(genome1,genome2)).toEqual(expected);
    });

    it('Testing for approximate pattern matcher',function() {
        var pattern = 'ATTCTGGA';
        var text = 'CGCCCGAATCCAGAACGCATTCCCATATTTCGGGACCACTGGCCTCCACGGTACGGACGTCAATCAAAT';
        var d = 3;
        var expected = [6,7,26,27];
        expect(ham.approximatePatternMatcher(pattern,text,d).array).toEqual(expected);
    });
    
    it('Testing for approximate pattern matcher count',function() {
        var pattern = 'ATGA';
        var text = 'ACGTTGCATGTCGCATGATGCATGAGAGCT';
        var d = 1;
        var expected = 4;
        expect(ham.approximatePatternCount(pattern,text,d)).toEqual(expected);
    });

    it('Testing for most frequent k-mer with mismatches',function() {
        var text = 'ACGTTGCATGTCGCATGATGCATGAGAGCT';
        var k = 4;
        var d = 1;
        var expected = ['GATG','ATGC','ATGT'];
        expect(ham.findApproxFrequentWords(text,k,d)).toEqual(expected.sort());
    })
                        
});
