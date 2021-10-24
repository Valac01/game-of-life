import * as PIXI from 'pixi.js'

const app = new PIXI.Application()

let current: number[][]
let next: number[][]
const rows = 20
const cols = 40
const resolution = 20

app.renderer.resize(resolution * cols, resolution * rows)
app.renderer.backgroundColor = 0xE9F9FC

document.getElementById('game').appendChild(app.view)

function make2DArray(rows: number, cols: number): number[][] {
  const arr = new Array(rows)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols)
  }
  return arr
}

function setup() {
  current = make2DArray(rows, cols)
  next = current
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      current[i][j] = Math.floor(Math.random() * 2)
    }
  }
}

setup()
drawCells(current)

// app.ticker.add(delta => loop(delta))

function loop(delta) {
  app.stage.removeChildren()
  computeNextGen()
  drawCells(next)
  current = next
  next = make2DArray(rows, cols)
}

function drawCells(grid: number[][]): void {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const rect = new PIXI.Graphics()
      if (grid[i][j]) {
        rect.beginFill(0x10505D)
      } else {
        rect.beginFill(0x10505D, 0)
      }
      rect.lineStyle(1, 0xFFFFFF)
      rect.drawRect(j * resolution, i * resolution, resolution - 1, resolution - 1)
      rect.endFill()

      app.stage.addChild(rect)
    }
  }
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = current[i][j]
      let neighbors = 0
      neighbors = countNeighbors(current, i, j)
      console.log(i, j, neighbors)
      if (state === 0 && neighbors === 3) {
        next[i][j] = 1
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0
      } else {
        next[i][j] = state
      }
    }
  }
}

function countNeighbors(grid: number[][], i: number, j: number): number {
  let sum = 0
  for (let k = -1; k < 2; k++) {
    for (let l = -1; l < 2; l++) {
      const m = (i + k + rows) % rows
      const n = (j + l + cols) % cols
      sum += grid[m][n]
    }
  }
  sum -= grid[i][j]
  return sum
}