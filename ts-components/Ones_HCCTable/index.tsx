import React from 'react';
import { Table } from 'antd';

interface TableProps {
    dataSource: Array<Object>;
    loading: boolean;
    columns: Array<Object>;
}


export default function ({ dataSource, columns, loading }: TableProps) {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            loading={loading}
        />
    )
}