/*Bioinfomatics Algorithms Part 1 Coursera course
Javascript rendition
Author : Koustuv Sinha

Part 1.2 : Hidden Messages in the Replication Origin
Codechallenge : PatternCount, FrequentWords
Charging Station : fasterfrequentWord,findingFrequentWordsBySort

Input : Vibrio_cholerae.txt

Points noted : 
-->fasterFrequentWord scores the highest in terms of time
complexity
-->use of qsort in findingFrequentWordsBySort uses lesser time
than general quickSort

*/

'use strict';

function hiddenMessageFinder(file,option,k,limit) {
 
    var fs = require('fs');
    var startTime = new Date().getTime();
    console.log("Starting execution at : " + startTime);
    console.log("User entered option : " + process.argv[4]);
    console.log("Reading file started ... ");
    fs.readFile(file,function(err,data) {
        console.log("Reading file ends..");
        if(err) throw err;
        else {
            var input = data.toString();
            var textArray = input.split('\n');
            //console.log(textArray);
            var text = textArray[0].toUpperCase();
            var k = textArray[1];
            console.log(option);
            switch(option) {
                    case 1 : fs.writeFileSync('./output/output_genome.txt',fasterFrequentWords(text,k));
                    break;
                    case 2 : fs.writeFileSync('./output/output_genome2.txt',findingFrequentWordsBySorting(text,k));
                    break;
                    case 3 : fs.writeFileSync('./output/output_genome3.txt',frequentWords(text,k));
                    break;
                    case 4 : fs.writeFileSync('./output/output_genome4.txt',fasterFrequentWordsByLimit(text,k,limit));
                    break;
                    default : console.log("Enter valid option");
                    break;
            }
            var stopTime = new Date().getTime();
            console.log("Stopping execution at : " + stopTime);
            console.log("Total Time taken : " + (stopTime - startTime) + " ms");
        }
    });
}



//----------------------Exporting functions---------------------------------------

exports.hiddenMessageFinder = hiddenMessageFinder;
exports.fasterFrequentWords = fasterFrequentWords;
exports.findingFrequentWordsBySorting = findingFrequentWordsBySorting;
exports.fasterFrequentWordsByLimit = fasterFrequentWordsByLimit;
exports.computingFrequencies = computingFrequencies;
exports.patternToNumber = patternToNumber;
exports.NumberToPattern = NumberToPattern;
exports.computeText = computeText;
exports.uniqueArray = uniq;
exports.qsort = qsort;

//--------------------Exporting Ends----------------------------------------------

function frequentWords(text,k) {
	var frequentPatterns = [];
	var count = [];
	for(var i=0;i<=text.length-k;i++) {
		var pattern = computeText(text,i,k);
		count[i] = patternCount(text,pattern);
		//console.log("Checking for pattern " + pattern + ", count = " + count[i]);			
	}
	console.log(count);	
	var maxCount = count.reduce(
		function(i,max) { if(i>max) return i; else return max; });
	console.log("Maxount = " + maxCount);
	for(var i=0;i<=text.length-k;i++) {
		if(count[i]==maxCount) {
			frequentPatterns.push(computeText(text,i,k));
		}
	}
	var uniqueArray = uniq(frequentPatterns);
    var output = "";
    for(var i=0;i<uniqueArray.length;i++) {
        output = output + uniqueArray[i] + " ";
    }
	return output;
}

function patternCount(text,pattern) {
	var count = 0;
	var diff = text.length - pattern.length;
	for(var i=0;i<=diff;i++) {
		if(computeText(text,i,pattern.length)==pattern) 
			count++;
	}
	return count;
}

function computeText(text,n,p) {
	var s="";	
	while(p--) {
		s=s.concat(text.charAt(n));
		n++;
	}
	return s;
}

function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

//generates a number based on the pattern, according to the ACGT dictionary
//similar to converting binary to decimal

function patternToNumber(pattern) {
	var dict = { "A" : 0, "C" : 1, "G" : 2, "T" : 3 };
	var l = pattern.length;
	var sum = 0;
	for(var i=0;i<l;i++) {
		sum = sum + Math.pow(4,(l-i-1))*dict[pattern.charAt(i)];
	}
	return sum;
}

//generates a pattern based on number, according to ACGT dictionary
//similar to converting decimal to binary

function NumberToPattern(number,l) {
	var dict = ["A","C","G","T"];
	var pattern = [];
	for(var i=l-1;i>=0;i--) {
 		//console.log("Number = " + number + ", l = " + l);
 		var m = number % 4;
 		pattern[i]=dict[m];
 	number=Math.floor(number/4);
	}
    var output = "";
    for(var i=0;i<l;i++) {
        output = output.concat(pattern[i]);
    }
	//return pattern.reduce(function(i,text) { return text.concat(i); });
    return output;
}

//calculate frequencies of patterns in array.
//every pattern is converted to number, and corresponding index entry
//in array in incremented

function computingFrequencies(text,k) {
	var frequencyArray = [];
	for(var i=0;i<Math.pow(4,k);i++) {
		frequencyArray[i]=0;
	}
	for(var i=0;i<=text.length-k;i++) {
        var pattern = computeText(text,i,k);
        var patternNumber = patternToNumber(pattern);
        //console.log(pattern + "-" + patternNumber);
		frequencyArray[patternNumber]++;
	}
	
	return frequencyArray;
	/*
	
	var output = "";
	frequencyArray.forEach(function(item) {
           output=output.concat(item).concat(" ");
	});
	return output;
	*/
}

//fastest algorithm. uses a seprate frequency array and iterates over to find the largest frequency

function fasterFrequentWords(text,k) {
	var frequentPatterns = [];
	var frequencyArray = computingFrequencies(text,k);
    //fs.writeFileSync('frequency.txt',frequencyArray);
	var maxCount = frequencyArray.reduce(function(i,m) {
		if(i>m) return i;
		else return m;
	});
    console.log("Maxcount = " + maxCount);
    var ct = 0;
    for(var i=0;i<Math.pow(4,k);i++) {
        if(frequencyArray[i]==maxCount) {
            var pattern = NumberToPattern(i,k);
            frequentPatterns.push(pattern);
            ct++;
        }
    }
    console.log("Maxcount count = " + ct);
	return frequentPatterns;
}

//fasterFrequentWords with limit option

function fasterFrequentWordsByLimit(text,k,limit) {
	var frequentPatterns = [];
	var frequencyArray = computingFrequencies(text,k);
    //fs.writeFileSync('frequency.txt',frequencyArray);
	var ct = 0;
    for(var i=0;i<Math.pow(4,k);i++) {
        if(frequencyArray[i]>=limit) {
            var pattern = NumberToPattern(i,k);
            frequentPatterns.push(pattern);
            ct++;
        }
    }
    //console.log("Number of " + k + " mers appearing " + limit + " or more times = " + ct);
	return frequentPatterns;
}

//uses sorting of indexes computed from the patternToNumber function
//uses qsort function

function findingFrequentWordsBySorting(text,k) {
    var frequentPatterns = [];
    var indexArray = [];
    var countArray = [];
    for(var i=0;i<=text.length-k;i++) {
        indexArray[i]=patternToNumber(computeText(text,i,k));
        countArray[i]=1;
    }
    //indexArray = quickSort(indexArray,0,indexArray.length-1);
    indexArray = qsort(indexArray);
    //console.log(indexArray);
    for(var i=1;i<=text.length-k;i++) {
        if(indexArray[i]===indexArray[i-1]) {
            countArray[i] = countArray[i] + countArray[i-1];
        }
    }
    //console.log(countArray);
    var maxCount = countArray.reduce(function(i,m) {
        if(i>m) return i; else return m;
    });
    console.log("Maxcount = " + maxCount);
    var ct=0;
    for(var i=0;i<=text.length-k;i++) {
        if(countArray[i]==maxCount) {
            frequentPatterns.push(NumberToPattern(indexArray[i],k));
            ct++;
        }
    }
    console.log("Maxcount count = " + ct);
    return frequentPatterns;
}

//standard recursive quicksort

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {

    var pivot = items[Math.floor((right + left) / 2)], i = left, j = right;
    
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }

        while (items[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}

function quickSort(items, left, right) {

    var index;

    if (items.length > 1) {

        index = partition(items, left, right);

        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }

    }

    return items;
}

//faster quicksort

function qsort(a) {
    if (a.length == 0) return [];
 
    var left = [], right = [], pivot = a[0];
 
    for (var i = 1; i < a.length; i++) {
        a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
    }
 
    return qsort(left).concat(pivot, qsort(right));
}