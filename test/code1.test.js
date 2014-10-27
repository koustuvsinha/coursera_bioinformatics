describe("Test suite for 1.1",function() {
    it("Testing for patternToNumber using hard coded values",function() {
        expect(patternToNumber("AA").toBe(0));
    });
    it("Testing for NumberToPattern using hard coded values",function() {
        expect(NumberToPattern(21,5).toBe("AACCC"));
    });
    it("Testing patternToNumber and NumberToPattern by randomized inputs",function() {
        var randomLength = Math.floor(Math.random()*10 + 1);
        var randomNumber = Math.floor(Math.random()*(Math.pow(4,randomLength)) + 1);
        var pattern = NumberToPattern(randomNumber,randomLength);
        var numberFromPattern = patternToNumber(pattern);
        
        expect(numberFromPattern).toBe(randomNumber));
    });
               
});