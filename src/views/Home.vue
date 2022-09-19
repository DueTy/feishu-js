<template>
  <div class="home">
    <button @click="testChat('ou_76bbe03962c3164e99c4a132ab716e72')">
      打开芯铭聊天
    </button>
    <button @click="testChat('ou_21b3f6b16082a883e120c4cbb28b775f')">
      打开潘强聊天
    </button>
    <button @click="testChat('ou_d9ff56dcf42ee37cd68fd81298b94976')">
      打开俊飞聊天
    </button>
    <div>
      <button @click="testChooseChat">选择聊天</button>
    </div>
  </div>
  <div>
    <button @click="handleOpenApp">打开携程商旅</button>
  </div>
  <div>
    <button @click="handleDownload">测试下载</button>
  </div>
  <div>
    <a
      href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=be8v3e8c-64a4-4fb8-ae09-5ff4b25c8bd1"
      target="_blank"
    >
      打开群聊
    </a>
  </div>
  <div>
    <button @click="router.push({ path: '/about' })">前往about</button>
  </div>
</template>

<script lang="ts" setup>
import feishuAuth from "@/utils/auth"
import { download } from "@/utils/feishu"
import sha1 from "sha1"
import { useRouter } from "vue-router"

const router = useRouter()

function simulation() {
  const timeNow = new Date()
  const timestamp = timeNow.getTime()
  const nonceStr = "13oEviLbrTo458A3NjrOwS70oTOXVOAm"
  const url = `http://${window.location.host}/`
  const signature = sha1(
    `jsapi_ticket=g1049fdKHZ5YNN6H3BBDVZEOAAI5G3JJSFDHOK3N&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  )

  return {
    timestamp,
    nonceStr,
    signature,
    appId: "cli_a385ae6b73bad00c",
  }
}

feishuAuth(simulation())
  .then((res: string) => {
    // alert("注册成功");
  })
  .catch((err: string) => {
    // alert("注册失败");
    console.log(err)
  })

function testChat(openid: string) {
  ;(window as any).tt.enterChat({
    openid,
  })
}

function handleDownload() {
  download().then((res: any) => {
    // window.tt.filePicker({
    //   success(res) {
    //     const filePath = res.list[0].path;
    window.tt.openDocument({
      filePath: res.tempFilePath,
      showMenu: true,
      success(res: any) {
        console.log(JSON.stringify(res))
      },
      fail(res: any) {
        console.log(`openDocument fail: ${JSON.stringify(res)}`)
      },
      //   });
      // },
    })
  })
}

function testChooseChat() {
  ;(window as any).tt.chooseContact({
    multi: true,
    ignore: false,
    maxNum: 10,
    limitTips: "选择人数达到上限了",
    externalContact: true,
    enableChooseDepartment: true,
    // disableChosenIds: ["ou_7dab8a3d3cdcc9da365777c7ad535d64"],
    success(res: any) {
      console.log(JSON.stringify(res))
    },
    fail(res: any) {
      console.log(`chooseContact fail: ${JSON.stringify(res)}`)
    },
  })
}

function handleOpenApp() {
  console.log("打开携程商旅")
  window.open("CorpCtrip://")
}

window.tt.setNavigationBar({
  left: {
    items: [
      // 显示图片
      {
        id: "left_one",
        text: "left_xxx",
        imageBase64:
          "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADn0lEQVRoge3ZS2hcVRzH8U/SakxSjSLUViWtqLFIqWgtYmPdRBGsiAsXLoSKBR9YofhYaFGsIijiwroSX9CFFFwoCuIDRFARg4IUS7W+KqKt+KzYqk3HcXGScOfcO3PvzL0zCdgvHMjJnPM7v3Pvef4vRznK/5u+CnXOw+W4ECtwOhahhl/xC3bhQ7yPj1GvqP2OGcS9+Fow007agy1Y0nPXCfrwgfbNJ9NBPIKRHnufZY0wTMp0oo4fMNFj77M8I4zz7diIdRjDsDDMThM6ugk7cEh2J2rYqqK5uQTj2ICH8AImhcl4XFR2GMe2oX0CbsF3sjvyNPo7Nb4K+5sIz6SlnYpHDApPfCqjjeeUeBOrsS9DdCadW8Z1Bpfg+4x27iojugxfZYjWsbaMcBPOxN6onSlc2qngycLEzOrA+pJmm3EGfo7a2qO9+TXLE5oPoesrMNuMCRyJ2rtz+rc1eBz35YmcisORyCf4d/rvTVW7jngyavsAvkjkV+cJbIkEfhOG1A1Cx3KfQEkukL0y1fFRXuU+6bPNA4nfJ3B/tX4RDn93CHtNqyX8pjyhlVGFGkajMsdU5TrBOcLaHw/dZPoDx+cJ3R5VeqcLZlsxim3CIS/uwFNFBHZElbZ2xWY+i/Ewfk94yZ28hAtHsgNXdslgUUZwD14rWiE+Qqzsjq/u8ZfGDiyeWzutyTqyHilQZt6wMON/U1F+qBdGmjAsBAhmOIjP8ip9qnEIXdYVa8VYH3l5MS6QNTx2R/lV1fsqzFiU3xkXyOrArig/l29gPMq/V6TSxRpf2z84sVpfhRjSuIkdkr6LZ9IvfScudbXrkI1yxn8rtkWV9+vtajSIbyMPV7UjMCp9KnywWo8teSxq+3MsaFdku/RcKHSYKsk66UjfdZ0ILRPO30mhvbobjD0LP0ZtvqlEfOjmSKwubHSnFKzfTjRhuXQY54D0ZaptnpfuxDdCHKcV5+PVgm2MSz/5Gq7twG+KAbwRif+Ek5qUXyhc+g/j5RztITwq+wJ/W1njSQbwSkK82cV6hcYLUbPb3Ajulh3crenSvrNAiFJPSh9B+rFZOmy+QQjHjAmfnzbjdfydYXzm0n51N8wniTe05Xi7iaF20ls4u9vms1gr7BGdGt+tw3W+Sm7Vnuk/8RKuUPJrTFWfWeFZ3JjI7xO+exHmxpfTaRLvCm9tXjGgcQXKDQHOR5YKT72Oi+bYS8eMC8vkork2UoZretXQf4MZqV9JCxyjAAAAAElFTkSuQmCC",
      },
      // 显示文本
      { id: "left_two", text: "left_xxx" },
    ],
  },
  right: {
    items: [
      // 显示图片
      {
        id: "right_one",
        text: "right_xxx",
        imageBase64:
          "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADn0lEQVRoge3ZS2hcVRzH8U/SakxSjSLUViWtqLFIqWgtYmPdRBGsiAsXLoSKBR9YofhYaFGsIijiwroSX9CFFFwoCuIDRFARg4IUS7W+KqKt+KzYqk3HcXGScOfcO3PvzL0zCdgvHMjJnPM7v3Pvef4vRznK/5u+CnXOw+W4ECtwOhahhl/xC3bhQ7yPj1GvqP2OGcS9+Fow007agy1Y0nPXCfrwgfbNJ9NBPIKRHnufZY0wTMp0oo4fMNFj77M8I4zz7diIdRjDsDDMThM6ugk7cEh2J2rYqqK5uQTj2ICH8AImhcl4XFR2GMe2oX0CbsF3sjvyNPo7Nb4K+5sIz6SlnYpHDApPfCqjjeeUeBOrsS9DdCadW8Z1Bpfg+4x27iojugxfZYjWsbaMcBPOxN6onSlc2qngycLEzOrA+pJmm3EGfo7a2qO9+TXLE5oPoesrMNuMCRyJ2rtz+rc1eBz35YmcisORyCf4d/rvTVW7jngyavsAvkjkV+cJbIkEfhOG1A1Cx3KfQEkukL0y1fFRXuU+6bPNA4nfJ3B/tX4RDn93CHtNqyX8pjyhlVGFGkajMsdU5TrBOcLaHw/dZPoDx+cJ3R5VeqcLZlsxim3CIS/uwFNFBHZElbZ2xWY+i/Ewfk94yZ28hAtHsgNXdslgUUZwD14rWiE+Qqzsjq/u8ZfGDiyeWzutyTqyHilQZt6wMON/U1F+qBdGmjAsBAhmOIjP8ip9qnEIXdYVa8VYH3l5MS6QNTx2R/lV1fsqzFiU3xkXyOrArig/l29gPMq/V6TSxRpf2z84sVpfhRjSuIkdkr6LZ9IvfScudbXrkI1yxn8rtkWV9+vtajSIbyMPV7UjMCp9KnywWo8teSxq+3MsaFdku/RcKHSYKsk66UjfdZ0ILRPO30mhvbobjD0LP0ZtvqlEfOjmSKwubHSnFKzfTjRhuXQY54D0ZaptnpfuxDdCHKcV5+PVgm2MSz/5Gq7twG+KAbwRif+Ek5qUXyhc+g/j5RztITwq+wJ/W1njSQbwSkK82cV6hcYLUbPb3Ajulh3crenSvrNAiFJPSh9B+rFZOmy+QQjHjAmfnzbjdfydYXzm0n51N8wniTe05Xi7iaF20ls4u9vms1gr7BGdGt+tw3W+Sm7Vnuk/8RKuUPJrTFWfWeFZ3JjI7xO+exHmxpfTaRLvCm9tXjGgcQXKDQHOR5YKT72Oi+bYS8eMC8vkork2UoZretXQf4MZqV9JCxyjAAAAAElFTkSuQmCC",
      },
      // 显示文本
      { id: "right_two", text: "right_xxx" },
    ],
  },
  success(res: any) {
    console.log("success")
  },
  fail(err: any) {
    console.log(`${JSON.stringify(err)}`)
  },
})

window.tt.onLeftNavigationBarClick((ev: any) => {
  router.back()
})
window.tt.onRightNavigationBarClick((ev: any) => {
  alert(`你点击了右上角 id 为 ${ev.id} 的按钮`)
})
</script>

<style scoped>
.home {
  font-size: 20px;
}

button {
  font-size: 20px;
}

.mt-15 {
  margin-top: 15px;
}
</style>
