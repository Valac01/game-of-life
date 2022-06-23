import { Application } from 'pixi.js'
import { Cell } from './cell'
import './ui'
import { updateGameStatus } from './ui'

let app: Application
const gameEl = document.querySelector('#game') as HTMLDivElement

let current: Cell[][]
let next: boolean[][]
const rows = 20
const cols = 40
const resolution = 20
const bgColor = 0xF6F7F8
const cellColor = 0x20A4F3
const lineColor = 0xFFFFFF

// App controls
const maxFps = 15
let isTickerFncAdded = false

function setupApp() {
  app = new Application()
  app.ticker.maxFPS = maxFps
  app.renderer.resize(resolution * cols, resolution * rows)
  app.renderer.backgroundColor = bgColor
  gameEl.appendChild(app.view)
}

setupApp()

function createGrid(rows: number, cols: number): Cell[][] {
  const arr = new Array(rows)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols)
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      arr[i][j] = new Cell(false, j * resolution, i * resolution, resolution - 1, resolution - 1)
    }
  }
  return arr
}

function createNextGrid(rows: number, cols: number): boolean[][] {
  const arr = new Array(rows)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols)
  }
  return arr
}

function updateCurrent() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = current[i][j]
      cell.updateAlive(next[i][j])
      cell.updateAlpha()
    }
  }
}


function setup() {
  current = createGrid(rows, cols)
  next = createNextGrid(rows, cols)
  drawCells(current)
}

setup()

function loop() {
  computeNextGen()
  updateCurrent()
  next = createNextGrid(rows, cols)
}

function drawCells(grid: Cell[][]): void {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i][j]
      cell.draw(cellColor, lineColor)
      app.stage.addChild(cell.rect)
    }
  }
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = current[i][j].isAlive() ? 1 : 0
      let neighbors = 0
      neighbors = countNeighbors(current, i, j)
      if (state === 0 && neighbors === 3) {
        next[i][j] = true
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = false
      } else {
        next[i][j] = state ? true : false
      }
    }
  }
}

function countNeighbors(grid: Cell[][], i: number, j: number): number {
  let sum = 0
  const currCell = grid[i][j]
  for (let k = -1; k < 2; k++) {
    for (let l = -1; l < 2; l++) {
      const m = (i + k + rows) % rows
      const n = (j + l + cols) % cols
      const cell = grid[m][n]
      sum += cell.isAlive() ? 1 : 0
    }
  }
  sum -= currCell.isAlive() ? 1 : 0
  return sum
}

export function pauseGame() {
  app.ticker.stop()
  updateGameStatus("Paused")
}

export function startGame() {
  if (!isTickerFncAdded) {
    app.ticker.add(() => loop())
  }
  app.ticker.start()
  isTickerFncAdded = true
  updateGameStatus("Playing")
}

export function resetGame() {
  // Reset the canvas
  isTickerFncAdded = false
  app.destroy()
  gameEl.firstChild?.remove()
  setupApp()
  setup()
  updateGameStatus("Drawing Mode")
}