export function download() {
  return new Promise((resolve, reject) => {
    (window as any).tt.downloadFile({
      url: "http://www.gov.cn/zhengce/zhengceku/2022-09/04/5708231/files/05b4d2caa0254c878c9859ed3b859e53.pdf",
      success(res: any) {
        console.log(JSON.stringify(res));
        resolve(res);
      },
      fail(res: any) {
        console.log(`downloadFile fail: ${JSON.stringify(res)}`);
        reject(res);
      },
    });
  });
}
