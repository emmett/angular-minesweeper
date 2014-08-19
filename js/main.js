function createMineField(){
	var minefield = {};
	minefield.rows = [];

	for (var i = 0; i < 9; i ++) {
		var row = {};
		row.spots = [];
	
		for (var j = 0; j < 9; j ++) {
			var spot = {};
			spot.isCovered = true;
			spot.content = 'empty';
			row.spots.push(spot);
		}

		minefield.rows.push(row);
	}
	placeManyMines(minefield);
	calculateAllNumber(minefield);
	return minefield;
}

function getSpot(minefield, row, column){
	return minefield.rows[row].spots[column];
}

function placeManyMines(minefield){
	for ( var i = 0; i < 10; i ++){
		placeRandomMine(minefield)
	}
}

function calculateNumber(minefield, row, column){
	var thisSpot = getSpot(minefield, row, column)
	
	if (thisSpot.content == "mine") {
		return;
	}
	
	var mineCount = 0;
	var neighbors = neighboring(minefield, row, column);
	
	neighbors.forEach (function(spot){
		if (spot.content == 'mine'){
			mineCount ++;
		}
	})
	
	if (mineCount > 0) {
		thisSpot.content = mineCount;
	}
}

function calculateAllNumber(minefield){
	for (var i = 0; i < 9; i ++){
		for(var j = 0; j < 9; j ++){
			calculateNumber(minefield, i, j)
		}
	}
}

function neighboring(minefield, row, column){
	var neighbors = [];
	for ( var i = -1; i <= 1; i ++) {
		var newRow = row + i;
		if ( newRow < 9 && newRow > 0){
			for (var j = -1; j <= 1; j ++) {
				var newColumn = column + j;
				if (newColumn < 9 && newColumn > 0){
					var neighbor = getSpot(minefield, newRow, newColumn);
					neighbors.push(neighbor);
				}
			}
		}
	}
	return neighbors;
}

function hasWon(minefield){
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			var spot = getSpot(minefield, i, j);
			if(spot.isCovered && spot.content != "mine"){
				return false;
			}
		}
	}
	return true;
}

function hasLost(minefield){
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			var spot = getSpot(minefield, i, j);
			if(!spot.isCovered && spot.content == "mine"){
				return false;
			}
		}
	}
	return true;
}


function placeRandomMine(minefield){
	var row = Math.round(Math.random() * 8);
	var column = Math.round(Math.random() * 8);
	var spot = getSpot(minefield, row, column);
	if (spot.content == 'empty'){
		spot.content = "mine";
	} else {
		placeRandomMine(minefield);
	}
}

function MinesweeperController($scope) {
	$scope.minefield = createMineField();
	$scope.uncoverSpot = function(spot){
		spot.isCovered = false;
		
		if(hasWon($scope.minefield)) {
			$scope.isWinMessageVisable = true;
		}
		if(hasLost($scope.minefield)){
			$scope.isLossMessageVisable = true;
		}
	}
	
	
}

