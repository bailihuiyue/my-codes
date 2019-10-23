import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { wordsFormat } from '@/utils/publicWord';

const { Option } = Select;

export default class Ones_Select extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        dataVal: PropTypes.string,
        dataKey: PropTypes.string,
        mode: PropTypes.string,
        needSelectAllOption: PropTypes.bool,
    };

    static defaultProps = {
        data: [],
        dataVal: 'value',
        dataKey: 'id',
        mode: 'default',
        needSelectAllOption: false
    };

    render() {
        const { dataKey, dataVal, data, needSelectAllOption, mode, useSpan, selectedId, ...rest } = this.props;
        const options = needSelectAllOption ? [<Option value='' key=''>{wordsFormat('dm.select.all')}</Option>] : [];
        data.forEach(item => options.push(<Option key={item[dataKey]} value={item[dataKey]}>{item[dataVal]}</Option>));
        return (
            useSpan ?
                data.map(({ valueCode, valueDesc }) => valueCode === selectedId ? valueDesc : "") :
                <Select
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    placeholder={wordsFormat('dm.select.pleaseSelect')}
                    onChange={this.handleChange}
                    className='compo__select'
                    mode={mode}
                    {...rest}
                >
                    {options}
                </Select>
        );
    }
}