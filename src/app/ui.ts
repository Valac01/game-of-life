import { pauseGame, startGame, resetGame } from "./main"

const gameStatus = document.querySelector(".status") as HTMLHeadingElement
const startBtn = document.querySelector("#start") as HTMLButtonElement
const pauseBtn = document.querySelector("#pause") as HTMLButtonElement
const resetBtn = document.querySelector("#reset") as HTMLButtonElement
const modalBtn = document.querySelector("#modal-btn") as HTMLButtonElement
const modal = document.querySelector(".modal") as HTMLDivElement
const card = document.querySelector(".card") as HTMLDivElement

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

modalBtn.onclick = async () => {
  await card.animate({
    transform: ['scale(1)', 'scale(0.6)'],
  }, 140).finished
  modal.remove()
}