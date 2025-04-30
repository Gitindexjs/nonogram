function fillGrid() {
	for(let i = 0; i < gridSize; i++) {
		grid.push([])
		for(let j = 0; j < gridSize; j++) {
			grid[i][j] = Math.floor(Math.random() * 2)
		}
	}
}

function encodePattern(g) {
	let r = []
	for(let l = 0; l < 2; l++) {
		r.push([])
		for(let i = 0; i < g.length; i++) {
			let line = []
			let blob = 0;
			for(let j = 0; j < g.length; j++) {
				if(g[i*((l+1)%2)+j*l][j*((l+1)%2)+i*l] === 1) {
					blob+=1;
				}
				if(g[i*((l+1)%2)+j*l][j*((l+1)%2)+i*l] === 0 && blob !== 0) {
					line.push(blob)
					blob = 0;
				}
				if(j + 1 === g.length && blob !== 0) {
					line.push(blob)
					blob = 0;
				}
			}
			r[l].push(line)
		}
	}
	return r;
}

function hideAway(g) {
	for(let i = 0; i < g.length; i++) {
		for(let j = 0; j < g.length; j++) {
			if(g[i][j] === 1 && Math.random() >= 0.5) {
				g[i][j] = 0;
			}
		}
	}
}

function crossOut(g) {
	for(let i = 0; i < g.length; i++) {
		let c = 0;
		let blob = 0;
		let match = true;
		for(let j = 0; j < g.length; j++) {
			if(g[i][j] === 1) {
				blob += 1;
			}
			if(g[i][j] === 0 && blob !== 0) {
				if(pattern[0][i][c] !== blob){
					match = false;
					break;
				}
				c ++;
				blob = 0;
			}
			if(j + 1 === g.length) {
			    if(g[i][j]) {
			        c++
			    }
			    if(pattern[0][i].length !== c) {
			        match = false;
			        break;
			    }
			}
		}
		if(match) {
			for(let j = 0; j < g.length; j++) {
				if(g[i][j] === 0) {
					g[i][j] = -1;
				}
			}
		}
	}
}

let grid = []

let pattern = []

let gridSize = 5;

let scratch = []

fillGrid();
console.log(grid)
console.log("===============")
console.log(encodePattern(grid))
pattern = encodePattern(grid)
console.log("===============")
hideAway(grid)
console.log(grid)
console.log("===============")
crossOut(grid)
console.log(grid)
