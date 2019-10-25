import React, { PureComponent } from 'react';
import { setLocale, getLocale } from 'umi/locale';
import { Select } from 'antd';
import { langWord } from '../../utils/publicWord'

const { Option } = Select;

export default class SelectLang extends PureComponent {
  changeLang = (key) => {
    setLocale(key);
  };

  render() {
    const { style } = this.props;
    const selectedLang = getLocale();
    return (
      <Select style={style} defaultValue={[selectedLang]} onChange={this.changeLang}>
        <Option value="zh-CN" key="zh-CN">{langWord.cn}</Option>
        <Option value="en-US" key="en-US">{langWord.en}</Option>
      </Select>
    );
  }
}
