import { message } from 'ant-design-vue';

export default class GloMethods {
  static async commonReqHandler(method, reqData) {
    const { data: res } = await method(reqData);
    const { code, msg, data } = res;
    let resObj = {
      isSuc: code === 200,
      msg,
      data,
    };

    if (code !== 200) {
      message.error(msg);
    }
    return resObj;
  }
};
