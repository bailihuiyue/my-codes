import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// 判断是否是正确的手机串号
export const isIMEI = (imei: string) => {
  const etal = /^[0-9]{15}$/;

  if (!etal.test(imei)) {
    return false;
  }
  let sum = 0;
  let mul = 2;
  let l = 14;
  for (let i = 0; i < l; i++) {

    let digit = imei.substring(l - i - 1, l - i);
    let tp = parseInt(digit, 10) * mul;
    if (tp >= 10)
      sum += (tp % 10) + 1;
    else
      sum += tp;
    if (mul == 1)
      mul++;
    else
      mul--;
  }
  let chk = ((10 - (sum % 10)) % 10);
  if (chk != parseInt(imei.substring(14, 15), 10))
    return false;
  return true;
}

// 下载后台传过来的流文件(兼容ie11)
export const download = (response, fileName) => {
  return response.blob().then((blob) => {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      const body = document.getElementsByTagName("body")[0];
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(link.href);
      body.removeChild(link);
    }
    return true;
  })
}