'use strict';

describe('Test suite for skew calculation',function() {
    
    var sk;
    beforeEach(function() {
        sk = require('../js/code5');
    });
    
    it('Testing for skew ouput',function() {
        var genome = 'CATGGGCATCGGCCATACGCC';
        var expected = [0, -1, -1, -1, 0, 1, 2, 1, 1, 1, 0, 1, 2, 1, 0, 0, 0, 0, -1, 0, -1, -2];
        expect(sk.calculateSkew(genome).array).toEqual(expected);
    });
    
    it('Testing for minimum skew',function() {
        var genome = 'TAAAGACTGCCGAGAGGCCAACACGAGTGCTAGAACGAGGGGCGTAAACGCGGGTCCGAT';
        var expected = [11,24];
        expect(sk.minSkew(genome).array).toEqual(expected);
    });
});
        