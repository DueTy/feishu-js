export interface FeishuAuthConfig {
  signature: string;
  nonceStr: string;
  timestamp: number;
  appId: string;
}

export default function (config: FeishuAuthConfig): any {
  return new Promise<any>((resolve, reject) => {
    (window as any).h5sdk.config({
      ...config,
      onSuccess(res: string) {
        resolve(res);
      },
      onFail(error: string) {
        reject(error);
      },
    });
  });
}
