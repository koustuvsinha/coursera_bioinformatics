describe("Test suite for 1.1",function() {
    it("Testing for patternToNumber using hard coded values",function() {
        var hmp = require('../js/code1');
        expect(hmp.patternToNumber("AA")).toBe(0);
    });
    it("Testing for NumberToPattern using hard coded values",function() {
        var hmp = require('../js/code1');    
        expect(hmp.NumberToPattern(21,5)).toBe("AACCC");
    });
    it("Testing patternToNumber and NumberToPattern by randomized inputs",function() {
        var hmp = require('../js/code1');
        var randomLength = Math.floor(Math.random()*10 + 1);
        var randomNumber = Math.floor(Math.random()*(Math.pow(4,randomLength)) + 1);
        var pattern = hmp.NumberToPattern(randomNumber,randomLength);
        var numberFromPattern = hmp.patternToNumber(pattern);
        
        expect(numberFromPattern).toBe(randomNumber);
    });
               
});