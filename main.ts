// 左
input.onButtonPressed(Button.A, function () {
    主角.change(LedSpriteProperty.X, -1)
})
// 發射子彈:
// 先把子彈定位到主角
// 再發射
input.onButtonPressed(Button.AB, function () {
    子彈.set(LedSpriteProperty.X, 主角.get(LedSpriteProperty.X))
    子彈.set(LedSpriteProperty.Y, 主角.get(LedSpriteProperty.Y))
    子彈.set(LedSpriteProperty.Brightness, 255)
    for (let index = 0; index < 4; index++) {
        子彈.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
    }
    子彈.set(LedSpriteProperty.Brightness, 0)
    子彈.set(LedSpriteProperty.X, 4)
    子彈.set(LedSpriteProperty.Y, 4)
})
// 右
input.onButtonPressed(Button.B, function () {
    主角.change(LedSpriteProperty.X, 1)
})
// 設定初始值
let 子彈: game.LedSprite = null
let 主角: game.LedSprite = null
game.setScore(0)
主角 = game.createSprite(2, 4)
let 飛機 = game.createSprite(0, 0)
子彈 = game.createSprite(4, 4)
子彈.set(LedSpriteProperty.Brightness, 0)
// 打到飛機就加分
basic.forever(function () {
    if (子彈.isTouching(飛機)) {
        game.addScore(1)
        soundExpression.happy.play()
        飛機.set(LedSpriteProperty.X, 0)
        飛機.set(LedSpriteProperty.Y, 0)
    }
})
// 飛機移動，速度不固定
basic.forever(function () {
    basic.pause(randint(100, 300))
    飛機.change(LedSpriteProperty.X, 1)
    if (飛機.get(LedSpriteProperty.X) == 4) {
        basic.pause(500)
        飛機.set(LedSpriteProperty.X, 0)
        飛機.change(LedSpriteProperty.Y, 1)
    }
})
// 被打就結束
basic.forever(function () {
    if (飛機.isTouching(主角)) {
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        game.gameOver()
    }
})
control.inBackground(function () {
    music.setVolume(255)
    music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.ForeverInBackground)
})
