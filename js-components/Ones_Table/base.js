import React, { PureComponent } from 'react';
import { Table } from 'antd';
import './index.less';

export default class BaseTable extends PureComponent {

    render() {
        const { dataSource, rowClassName, filterColum, pagination, columns, loading, onChange, onClick, onDoubleClick, ...rest } = this.props;
        
        return (
            <Table
                {...rest}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                loading={loading}
                rowClassName={rowClassName}
                onChange={onChange}
                onRow={(record, index) => ({
                    onClick: onClick.bind(this, record, index),
                    onDoubleClick: onDoubleClick.bind(this, record, index)
                })}
            />
        );
    }
}
