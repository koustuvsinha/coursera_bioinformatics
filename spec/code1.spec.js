"use strict";

describe("Test suite for hiddenMessageProblem",function() {
    var hmp;
    
    beforeEach(function() {
        hmp = require('../js/code1');
    });
    
    it("Testing for patternToNumber using hard coded values",function() {
        expect(hmp.patternToNumber("AA")).toBe(0);
    });
    
    it("Testing for NumberToPattern using hard coded values",function() {
        expect(hmp.NumberToPattern(21,5)).toBe("AACCC");
    });
    
    it("Testing patternToNumber and NumberToPattern by randomized inputs",function() {
        var randomLength = Math.floor(Math.random()*10 + 1);
        var randomNumber = Math.floor(Math.random()*(Math.pow(4,randomLength)) + 1);
        var pattern = hmp.NumberToPattern(randomNumber,randomLength);
        var numberFromPattern = hmp.patternToNumber(pattern);
        
        expect(numberFromPattern).toEqual(randomNumber);
    });
    
    it("Testing uniqueArray",function() {
        var duplicateArray = ["A","A","G","T","A","C","C","A","G","T"];
        var singleArray = ["A","G","T","C"];
        
        expect(hmp.uniqueArray(duplicateArray)).toEqual(singleArray);
    });
               
});