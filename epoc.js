let grid = []
let sides = [
    [[3],[3],[1],[3],[2,1]],
    [[2],[2],[4],[2],[2,1]]
]

let iMap = []

function validTotal() {
    let equivalent = true;
    for(let i = 0; i < sides.length; i++) {
        equivalent &&= sides[i].length === sides[0].length
    }
    if(equivalent) {
        return sides[0].length
    } else {
        return -1;
    }
}

let total = validTotal();

for(let i = 0; i < total; i++){
    grid.push([])
    for(let j = 0; j < total; j++) {
        grid[i].push(0)
    }
}

function lineSum(i, j) {
    let sum = 0;
    for(let k = 0; k < sides[i][j].length; k++){
        sum += sides[i][j][k]
    }
    return sum;
}

function cumulativeUntil(i, j, e, d) {
    let sum = 0;
    if(d === 0) {
        for(let k = 0; k < e; k++) {
            sum += sides[i][j][k]
        }
    } else {
        for(let k = sides[i][j].length; k > e; k--) {
            sum += sides[i][j][k]
        }
    }
    return sum;
}

function clearIntersections() {
    for(let i = 0; i < sides.length; i++) {
        for(let j = 0; j < total; j++){
            let cSum = lineSum(i,j) + sides[i][j].length - 1
            for(let k = 0; k < sides[i][j].length; k++){
                let bounds = [cumulativeUntil(i, j, k, 0), total-cumulativeUntil(i, j, k, 1)]
                let halfway = Math.floor((bounds[0] + bounds[1])/2)
                let iSpace = 2 * sides[i]][j][k] - (bounds[1]-bounds[0])
                if((bounds[0] + bounds[1]) % 2 !== 0) {
                    iSpace =  2 * sides[i][j][k] - (bounds[1]-1-bounds[0])
                    let halfway = Math.floor((bounds[0] + bounds[1]-1)/2)
                }
                let iBounds = [halfway - Math.floor(iSpace/2), halfway + Math.floor(iSpace/2)]
                if(iSpace > 0) {
                    for(let l = 0; l < total; l++) {
                        let orientation = [((i+1)%2)*l+(i%2)*j, ((i+1)%2)*j+(i%2)*l]
                        if(bounds[0] <= l && l <= bounds[1]) {
                            grid[orientation[1]][orientation[0]] = 1;
                        } else {
                            grid[orientation[1]][orientation[0]] = -1;
                        }
                    }
                }
            }
        }
    }
}

function clearTrivial() {
    for(let i = 0; i < sides.length; i++) {
        for(let j = 0; j < total; j++) {
            let tSum = cSum(i, j) + sides[i][j].length - 1
            if(tSum === total) {
                let current = 0;
                let blocks = 0;
                for(let k = 0; k < total; k++) {
                    let orientation = [((i+1)%2)*k+(i%2)*j, ((i+1)%2)*j+(i%2)*k]
                    if(blocks <= sides[i][j][current]) {
                        grid[orientation[1]][orientation[0]] = 1;
                    } else {
                        grid[orientation[1]][orientation[0]] = -1;
                    }
                    blocks ++
                    if(blocks > sides[i][j][k]) {
                        blocks = 0
                        current ++;
                    }
                }
            }
        }
    }
}

function identifyConsequent() {
    for(let a = 0; a < 2; a++) {
        for(let i = 0; i < total; i++) {
            let blockCount = 0;
            for(let j = 0; j < total; j++) {
                if(grid[i*((a+1)%2)+j*a][j*((a+1)%2)+i*a] === 1) {
                    blockCount ++;
                } else {
                    iMap.push({c: [i,j-blockCount], l: blockCount, d: a, p: [sides[a][i]]})
                    blockCount = 0;
                }
            }
        }
    }
}
