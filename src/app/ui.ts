import { pauseGame, startGame, resetGame } from "./main"

const gameStatus = document.querySelector(".status") as HTMLHeadingElement
const startBtn = document.querySelector("#start") as HTMLButtonElement
const pauseBtn = document.querySelector("#pause") as HTMLButtonElement
const resetBtn = document.querySelector("#reset") as HTMLButtonElement

export const updateGameStatus = (s: string) => {
  gameStatus.innerText = s
}

startBtn.onclick = () => {
  startGame()
}

pauseBtn.onclick = () => {
  pauseGame()
}

resetBtn.onclick = () => {
  resetGame()
}