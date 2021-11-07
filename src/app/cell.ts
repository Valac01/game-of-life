import { Graphics } from 'pixi.js'

export class Cell {
  alive: boolean
  x: number
  y: number
  w: number
  h: number
  rect: Graphics

  constructor(val: boolean, x: number, y: number, w: number, h: number) {
    this.updateAlive(val)
    this.rect = new Graphics()
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  updateAlive(val: boolean) {
    this.alive = val
  }

  draw(color: number, lineColor: number) {
    this.rect.beginFill(color)
    this.rect.alpha = this.alive ? 1 : 0
    this.rect.lineStyle(1, lineColor)
    this.rect.drawRect(this.x, this.y, this.w, this.h)
    this.rect.endFill()
  }

  isAlive(): boolean {
    return this.alive
  }

  updateAlpha() {
    this.rect.alpha = this.alive ? 1 : 0
  }
}