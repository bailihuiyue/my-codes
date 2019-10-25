import React, { PureComponent } from 'react';
import { connect } from 'dva';
import BaseTable from './base';
import './index.less';

@connect(({ dmtable, loading }) => ({
    dmtable,
    loading: loading.effects['dmtable/loadData'],
}))
export default class Ones_Table extends PureComponent {

    setClassName = (record, index) => {
        const { dmtable, dataNamespace } = this.props;
        const { clickedRowIndex } = dmtable[dataNamespace] || {};
        return clickedRowIndex === index ? 'clickRowStyl' : '';
    }

    loadData({ url, urlData, dataSource, filterColum, columns, columnWidth, scroll, needInit = true }) {
        const { dispatch, dataNamespace } = this.props;
        if (needInit) {
            let urlType = "";
            if (url) {
                url = url.match(/\S+/g);
                urlType = url[0];
                url = url[1];
            }
            dispatch({
                type: 'dmtable/initTable',
                payload: {
                    url,
                    urlType,
                    urlData,
                    dataSource,
                    filterColum,
                    columns,
                    columnWidth,
                    scroll,
                    dataNamespace
                },
            });
        }
        dispatch({
            type: 'dmtable/loadData',
            dataNamespace
        });
    }

    handlePagination = ({ current, pageSize, total }) => {
        const { dispatch, onShowSizeChange, dataNamespace } = this.props;
        dispatch({
            type: 'dmtable/changePage',
            payload: {
                current,
                pageSize,
                dataNamespace
            },
        });
        this.loadData({ needInit: false });
        onShowSizeChange && onShowSizeChange({ current, pageSize, total });
        this.resetClickRowStyl();
    };

    handleDoubleClickRow = (row, index) => {
        const { onDoubleClick } = this.props;
        onDoubleClick && onDoubleClick(row, index);
    }

    handleClickRow = (row, index) => {
        const { dmtable: { clickedRow }, dispatch, onClick, dataNamespace } = this.props;
        dispatch({
            type: 'dmtable/setClickedRowIndex',
            payload: {
                clickedRowIndex: index,
                row,
                dataNamespace
            }
        });
        onClick && onClick(row, index);
    }

    resetClickRowStyl = () => {
        const { dispatch, dataNamespace } = this.props;
        dispatch({
            type: 'dmtable/setClickedRowIndex',
            payload: {
                clickedRowIndex: null,
                dataNamespace
            }
        });
    }

    componentWillMount() {
        const { dispatch, flag, columns, dataSource, filterColum, columnWidth, scroll, dataNamespace, urlData } = this.props;
        let { url, pagination } = this.props;
        this.loadData({ url, urlData, dataSource, filterColum, columns, columnWidth, scroll });
    }

    componentWillReceiveProps(nextProps) {
        const { dataSource, url, urlData } = nextProps;
        const { dispatch, filterColum, columns, columnWidth, scroll, dataSource: oldDataSource, dataNamespace, url: oldUrl, urlData: oldUrlData } = this.props;
        if (dataSource !== oldDataSource ||
            url !== oldUrl ||
            urlData !== oldUrlData) {
            this.loadData({ url, urlData, dataSource, filterColum, columns, columnWidth, scroll });
        }
    }

    render() {
        const { filterColum, loading, pagination, dmtable, dataNamespace, noData, ...rest } = this.props;
        let { exp: { dataSource, columns, paginationModel, clickedRowIndex } } = dmtable;
        if (dmtable[dataNamespace]) {
            dataSource = dmtable[dataNamespace].dataSource;
            columns = dmtable[dataNamespace].columns;
            paginationModel = dmtable[dataNamespace].paginationModel;
            clickedRowIndex = dmtable[dataNamespace].clickedRowIndex;
        }
        const defaultPagination = pagination === false ?
            false :
            Object.assign(paginationModel, pagination);
        const tableData = noData && dataSource && dataSource.length === 0 ? noData : dataSource;
        return (
            <BaseTable
                {...rest}
                dataSource={tableData}
                columns={columns}
                pagination={defaultPagination}
                loading={loading}
                rowClassName={this.setClassName.bind(this)}
                onChange={this.handlePagination}
                onClick={this.handleClickRow}
                onDoubleClick={this.handleDoubleClickRow}
            />
        );
    }
}

export function loadTableData() {
    const { getState } = this.props;
    return getState().dmtable.dataSource;
}

export function refreshTableData() {
    const { dispatch } = this.props;
    dispatch({
        type: 'dmtable/loadData',
    });
}

export function getSelections() {
    const { getState } = this.props;
    return getState().dmtable.rows;
}
