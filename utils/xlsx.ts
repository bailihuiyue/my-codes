import * as XLSX from 'xlsx';
import _ from 'lodash';

const fixdata = (data: any) => {
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

export const readExcel_old = (file: any, callback: any) => {
  const fileReader = new FileReader();
  const rABS: any = FileReader.prototype.readAsBinaryString;
  fileReader.onload = (event: any) => {
    const { result } = event.target;
    const workbook = rABS ? XLSX.read(result, { type: 'binary' }) : XLSX.read(btoa(fixdata(result)), {
      type: 'base64'
    });
    let data: any = [];
    for (const sheet in workbook.Sheets) {
      if (workbook.Sheets.hasOwnProperty(sheet)) {
        data = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet]);
        break;
      }
    }
    if (callback) {
      callback(data);
    }
  };
  if (rABS) {
    fileReader.readAsBinaryString(file);
  } else {
    fileReader.readAsArrayBuffer(file);
  }
}

export const readExcel = (file: any, callback: any) => {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;
  reader.onload = (e) => {
    /* Parse data */
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    data = _.flattenDeep(data);
    if (callback) {
      callback(data);
    }
  };
  if (rABS) {
    reader.readAsBinaryString(file);
  } else {
    reader.readAsArrayBuffer(file);
  }
}

export const exportExcel = (data: []) => {
  const arr = data.map(item => _.values(item));
  const ws = XLSX.utils.aoa_to_sheet(arr);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "phones");
  XLSX.writeFile(wb, "export.xlsx");
}
