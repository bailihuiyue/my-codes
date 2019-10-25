import React from 'react';
import { Descriptions } from 'antd';
import styles from './index.less';

interface DescriptionsProps {
    size: 'default' | 'middle' | 'small';
    title: string;
    bordered: boolean;
    column: number | object;
    dataSource: any;
}


export default ({ size, title, bordered, column, dataSource }: DescriptionsProps) => {
    return (
        <Descriptions
            size={size}
            title={title}
            bordered={bordered}
            column={column}
        >
            <Descriptions.Item label="IMEI">{dataSource.IMEI}</Descriptions.Item>
            <Descriptions.Item label="STANDARDISED DEVICE VENDOR（市场品牌名称）">{dataSource.STANDARDISED_DEVICE_VENDOR}</Descriptions.Item>
            <Descriptions.Item label="STANDARDISED DEVICE MODEL（市场型号名称）">{dataSource.STANDARDISED_DEVICE_MODEL}</Descriptions.Item>
            <Descriptions.Item label="STANDARDISED FULL NAME（标准手机全称）">{dataSource.STANDARDISED_FULL_NAME}</Descriptions.Item>
            <Descriptions.Item label="MARKETING NAME（标准市场名称）">{dataSource.STANDARDISED_MARKETING_NAME}</Descriptions.Item>
            <Descriptions.Item label="VENDOR ALLOCATION DATE（型号分配日期）">{dataSource.VENDOR_ALLOCATION_DATE}</Descriptions.Item>
            <Descriptions.Item label="GSMA BRAND NAME（品牌名称）">{dataSource.GSMA_Brand_Name}</Descriptions.Item>
            <Descriptions.Item label="GSMA MODEL NAME（型号名称）">{dataSource.GSMA_Model_Name}</Descriptions.Item>
        </Descriptions>
    )
}