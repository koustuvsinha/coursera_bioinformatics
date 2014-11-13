'use strict';

describe('Test suite for week2/code2',function() {
    
    var code2;
    beforeEach(function() {
        code2 = require('../../js/week2/code2');
    });
    
    it('Testing linearSpectrum',function() {
        var input = 'NQEL';
        var expected = [0,113,114,128,129,242,242,257,370,371,484];
        expect(code2.linearSpectrum(input)).toEqual(expected);
    });
});        