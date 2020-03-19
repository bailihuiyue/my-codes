import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

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

// 时间格式化为03/18/2020 13：34这种 MM/DD/YY hh:mm
export const formatDate = (date: Date) => {
  const YY = date.getFullYear();
  const MM = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`;
  const DD = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
  const hh = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}`;
  const mm = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  // const ss = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
  return `${MM}/${DD}/${YY} ${hh}:${mm}`;
}


// 前端解决缓存问题,写在模板html中即可
{/* <script>
  if(!window.sessionStorage.getItem("hasReload")){
    window.sessionStorage.setItem("hasReload","true");
    window.location.reload(true); 
  }
</script> */}