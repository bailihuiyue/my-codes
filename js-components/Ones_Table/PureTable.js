import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { wordsFormat } from '@/utils/publicWord';
import './index.less';

let columnName = [];

export default class Ones_Table extends PureComponent {
    static propTypes = {
        loading: PropTypes.bool
    };

    static defaultProps = {
        loading: false
    };

    constructor(props) {
        super(props);
        this.state = {
            clickedRow: null
        }
    }

    handlePagination = (page) => {
        const { onPaginationChange } = this.props;
        onPaginationChange && onPaginationChange(page);
        this.resetClickRowStyl();
    };

    handleShowSizeChange = (current, size) => {
        const { onShowSizeChange } = this.props;
        onShowSizeChange && onShowSizeChange(current, size);
        this.resetClickRowStyl();
    };

    handleDoubleClickRow = (row, index) => {
        const { onDoubleClickRow } = this.props;
        onDoubleClickRow && onDoubleClickRow(row, index);
    }

    handleClickRow = (row, index) => {
        this.setState({ clickedRow: index });
    }

    setClassName = (record, index) => {
        const { clickedRow } = this.state;
        return clickedRow === index ? 'clickRowStyl' : '';
    }

    resetClickRowStyl = () => {
        this.setState({ clickedRow: null });
    }

    renderColumns = (dataSource) => {
        if (dataSource.length > 0 && !columnName.length) {
            const { columnWidth } = this.props;
            const keys = Object.keys(dataSource[0]);
            const columnsArr = [];
            let keyObj = {};
            keys.forEach((item, index) => {
                keyObj = {
                    title: wordsFormat(`dm.table.${item}`),
                    dataIndex: item,
                    key: item,
                    width: columnWidth && columnWidth[index] || ""
                };
                columnsArr.push(keyObj);
            });
            columnName = columnsArr;
            return columnsArr;
        }
        return [];
    }

    mapDataSource = (dataSource) => {
        const data = [];
        let key = "";
        dataSource.forEach((item, index) => {
            if (item.id) {
                key = item.id;
            } else {
                key = `${new Date().getTime()}${index}`;
            }
            data.push({ ...item, key });
        });
        return data;
    }

    render() {
        const { dataSource, loading, ...rest } = this.props;
        let { pagination, columns } = this.props;
        const mapedDataSource = this.mapDataSource(dataSource);
        const defaultPagination = {
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['25', '50', '100', '200'],
            defaultPageSize: 1,
            onShowSizeChange: this.handleShowSizeChange
        };
        pagination = Object.assign(defaultPagination, pagination);
        columns = !columns && !columnName.length ? this.renderColumns(dataSource) : columnName;

        return (
            <Table
                {...rest}
                dataSource={mapedDataSource}
                columns={columns}
                pagination={pagination}
                onChange={this.handlePagination}
                loading={loading}
                rowClassName={this.setClassName}
                onRow={(record, index) => {
                    return {
                        onClick: this.handleClickRow.bind(this, record, index),
                        onDoubleClick: this.handleDoubleClickRow.bind(this, record, index)
                    };
                }}
            />
        );
    }
}
