<template>
  <div class="home">
    <button @click="testChat('oc_c670085f4ce02d8ad544fde82eb41eb6')">
      打开芯铭聊天
    </button>
    <button @click="testChat('oc_f8b681bc93ed99179f9d7a4a70f90e57')">
      打开潘强聊天
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
</template>

<script lang="ts" setup>
import feishuAuth from "@/utils/auth";
import { download } from "@/utils/feishu";
import sha1 from "sha1";

function simulation() {
  const timeNow = new Date();
  const timestamp = timeNow.getTime();
  const nonceStr = "13oEviLbrTo458A3NjrOwS70oTOXVOAm";
  const url = `http://${window.location.host}/`;
  const signature = sha1(
    `jsapi_ticket=g10495dLANMNKP4GTL3YYG3SSDCIUCBZNENJATQQ&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  );

  return {
    timestamp,
    nonceStr,
    signature,
    appId: "cli_a385ae6b73bad00c",
  };
}

feishuAuth(simulation())
  .then((res: string) => {
    // alert("注册成功");
  })
  .catch((err: string) => {
    // alert("注册失败");
    console.log(err);
  });

function testChat(openChatId: string) {
  (window as any).tt.enterChat({
    openChatId,
  });
}

function handleDownload() {
  download().then((res: any) => {
    // window.tt.filePicker({
    //   success(res) {
    //     const filePath = res.list[0].path;
    window.tt.openDocument({
      filePath: res.tempFilePath,
      showMenu: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openDocument fail: ${JSON.stringify(res)}`);
      },
      //   });
      // },
    });
  });
}

function testChooseChat() {
  (window as any).tt.chooseChat({
    allowCreateGroup: true,
    multiSelect: true,
    ignoreSelf: false,
    ignoreBot: false,
    selectType: 0,
    confirmTitle: "确认",
    confirmDesc: "确认发送？",
    externalChat: true,
    showMessageInput: true,
    success(res: any) {
      console.log(JSON.stringify(res));
    },
    fail(res: any) {
      console.log(`chooseChat fail: ${JSON.stringify(res)}`);
    },
  });
}

function handleOpenApp() {
  console.log("打开携程商旅");
  window.open("CorpCtrip://");
}
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
