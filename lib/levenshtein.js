//slow ass recursive version
levenshteinDistR = function(firstword, secword) {
	var flength = firstword.length;
	var slength = secword.length;

	//if firstword length is 0 return secword length
	if(flength == 0) {
		return slength;
	}
	//if secword length is 0 return firstword length
	else if (slength == 0) {
		return flength;
	}
	else {
		//if last character of firstword is equal to last character of secword cost = 0 else cost = 1
		
		if(firstword.charAt(flength-1) == secword.charAt(slength-1)){
			var cost = 0;
		}
		else {
			var cost = 1;
		}
		//return the minimum of fristword less one, secword +1, secword lessone, firstword +1, firstword-1, secword-1 + cost

		return Math.min(
			levenshteinDistR(firstword.substring(0,flength-1), secword.substring(0,slength))+1,
			levenshteinDistR(firstword.substring(0,flength), secword.substring(0,slength-1))+1,
			levenshteinDistR(firstword.substring(0,flength-1), secword.substring(0,slength-1))+cost			
		);
	}
}

//quadratic iterative version
levenshteinDist = function(firstword, secword) {
	var flength = firstword.length;
	var slength = secword.length;
	//make it case insensitive
	var firstword = firstword.toLowerCase();
	var secword = secword.toLowerCase();
	//make d(flength+1, slength+1) 		//and set it to 0
	var dMatrix = createInitMatrix(flength+1, slength+1, 0);
	//set d(i,0) to i 
	for(var i=1; i<flength+1; i++) {
		dMatrix[i][0] = i;
	}
	//set d(0,j) to j
	for(var j=1; j<slength+1; j++) {
		dMatrix[0][j] = j;
	}
	//for each letter in secword
	for(var j=1; j<slength+1; j++) {
		for(var i=1; i<flength+1; i++) {
			//if letter in first == letter in second, d(i, j) = d(i-1, j-1)
			if(firstword.charAt(i-1) == secword.charAt(j-1)) {
				dMatrix[i][j] = dMatrix[i-1][j-1];
			}
			//else, d(i, j) = min(d(i-1, j) +1 (deletion), d(i,j-1)+1 (insertion), d(i-1, j-1) +1 (substitution))	
			else {
				dMatrix[i][j] = Math.min(dMatrix[i-1][j]+1, dMatrix[i][j-1]+1, dMatrix[i-1][j-1]+1);
			}
		}
	}
	return dMatrix[flength][slength];
}


createInitMatrix = function(numrows, numcols, initValue) {
	var matrix = []
	for(var i=0; i<numrows; i++) {
		var newrow = []
		matrix.push(newrow);
		for(var j=0; j<numcols; j++) {
			matrix[i].push(initValue);
		}
	}
	return matrix;
}


exports.levenshtein = levenshteinDist;