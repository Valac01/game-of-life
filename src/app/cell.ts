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
    this.setInteractivity(true)
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

  private setInteractivity(val: boolean) {
    this.rect.interactive = val
    if (!this.rect.interactive) {
      return;
    }
    this.rect.on('pointerover', (e) => {
      if (e.data.originalEvent.ctrlKey || e.data.originalEvent.metaKey) {
        this.updateAlive(true)
        this.updateAlpha()
      }
      if (e.data.originalEvent.shiftKey) {
        this.updateAlive(false)
        this.updateAlpha()
      }
      if (!this.isAlive()) {
        this.rect.alpha = 0.3
      }
    })
    this.rect.on('pointerout', () => {
      if (!this.isAlive()) {
        this.rect.alpha = 0
      }
    })
  }
}