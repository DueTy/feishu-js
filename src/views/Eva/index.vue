<template>
  <div>
    <canvas id="canvas" />
  </div>
</template>

<script setup lang="ts">
import { resource, RESOURCE_TYPE, Game, GameObject } from "@eva/eva.js"
import { RendererSystem } from "@eva/plugin-renderer"
import { Img, ImgSystem } from "@eva/plugin-renderer-img"
import { Transition, TransitionSystem } from "@eva/plugin-transition"
import { LottieSystem, Lottie } from "@eva/plugin-renderer-lottie"
import { onMounted } from "vue"

onMounted(async () => {
  const BG_RATIO = 709 / 1888
  const wh = window.screen.height
  const sceneWidth = wh / BG_RATIO

  const bgH = wh
  const bgW = bgH / BG_RATIO

  console.log("尺寸", wh, sceneWidth, bgH, bgW)
  const charaterJson = (await import("./config/character.json")).default

  console.log(charaterJson)

  resource.addResource([
    {
      name: "mapBg",
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: "webp",
          url: require("../../assets/imgs/map.webp"),
        },
      },
      preload: true,
    },
    {
      name: "charater",
      type: "LOTTIE",
      src: {
        json: {
          type: "json",
          url: JSON.stringify(charaterJson),
        },
      },
    },
  ])

  const canvas = document.querySelector("#canvas")

  // 创建渲染系统
  const rendererSystem = new RendererSystem({
    canvas, // 可选，自动生成 canvas 挂在 game.canvas 上
    width: sceneWidth,
    height: wh,
    transparent: false,
    resolution: window.devicePixelRatio / 2, // 可选, 如果是2倍图设计 可以除以2
    enableScroll: true, // 允许页面滚动
    renderType: 0, // 0:自动判断，1: WebGL，2:Canvas，建议android6.1 ios9 以下使用Canvas，需业务判断。
  })

  // 创建游戏对象
  const game = new Game({
    frameRate: 60, // 可选，游戏帧率，默认60
    autoStart: true, // 可选，自动开始
    systems: [
      rendererSystem,
      new ImgSystem(),
      new TransitionSystem(),
      new LottieSystem(),
    ],
  })

  const bgImgObj = new GameObject("bg-map-image", {
    size: { width: bgW, height: bgH },
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  })

  const characterObj = new GameObject("character-lottie", {
    size: { width: 10, height: 10 },
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  })

  bgImgObj.addComponent(new Img({ resource: "mapBg" }))
  const charaterLottie = new Lottie({ resource: "charater" })
  characterObj.addComponent(charaterLottie)

  charaterLottie.play([], { repeats: Infinity })

  game.scene.addChild(bgImgObj)
  game.scene.addChild(characterObj)
  const animation = game.scene.addComponent(new Transition())

  animation.group = {
    move: [
      {
        name: "position.x",
        component: game.scene.transform,
        values: [
          {
            time: 0,
            value: 0,
            tween: "linear",
          },
          {
            time: 2000,
            value: -300,
            tween: "linear",
          },
        ],
      },
      {
        name: "position.y",
        component: game.scene.transform,
        values: [
          {
            time: 0,
            value: 0,
            tween: "linear",
          },
          {
            time: 2000,
            value: -200,
          },
        ],
      },
    ],
  }

  // animation.play("move", 1)
})
</script>

<style scoped>
canvas {
  height: 100vh;
}
</style>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>
