import React, { PureComponent } from 'react';
import { Upload, Icon, Button, message, Modal } from 'antd';
import { connect } from 'dva';
import { wordsFormat } from '@/utils/publicWord';
import { createFormData } from '@/utils/utils';
import styles from './index.less';

const confirm = Modal.confirm;
const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
const limitFileSize = 1024 * 1024 * 5;
let isRightType = true;

@connect(({ upload, createSingle, loading }) => ({
    upload,
    createSingle,
    loading: loading.effects['upload/contractExcel'],
}))
export default class Ones_FileUpload extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            excel: null
        };
    }

    beforeUpload = (file) => {
        const isTypeRight = fileType.includes(file.type);
        const isSizeRight = file.size <= limitFileSize;
        if (!isTypeRight) {
            message.error(wordsFormat('dm.uploadFile.errorType'));
            return isRightType = false;
        }
        if (!isSizeRight) {
            message.error(wordsFormat('dm.uploadFile.errorSize'));
            return isRightType = false;
        }
        this.uploadFile(file);
        return isRightType = true;
    }

    onPreview = file => {
        this.downloadFile("file");
    }

    uploadFile = file => {
        const { uploadInfo, dispatch, dataNamespace, createSingle: { saveHeaderCb } } = this.props;
        const info = uploadInfo();
        const formData = createFormData("excel", info, file, saveHeaderCb);
        if (!info.contractNo) {
            message.error(wordsFormat('dm.text.needContractNO'));
            return;
        }
        dispatch({ type: "upload/contractExcel", payload: { formData, fileType: "excel", file, dataNamespace, saveHeaderCb } }).then(res => {
            if (!res) {
                this.setState({ excel: file });
                dispatch({
                    type: "upload/setFile",
                    payload: {
                        fileList: [{
                            uid: file.uid,
                            name: file.name,
                            status: 'done',
                            url: "",
                        }],
                        dataNamespace
                    }
                });
            }
        });
    }

    handleChange = ({ file, fileList }) => {
        const { onChange } = this.props;
        if (fileList.length === 0) {
            this.removeFile(file);
        }
        onChange && onChange(fileList.length && isRightType, "file");
    }

    removeFile = (file) => {
        const { uploadInfo, dispatch, dataNamespace, createSingle: { saveHeaderCb } } = this.props;
        const { contractNo } = uploadInfo();
        dispatch({ type: "upload/removeFile", payload: { contractNo, ...saveHeaderCb, fileType: "excel", dataNamespace } });
        dispatch({ type: "upload/setFile", payload: { fileList: null, dataNamespace } });
        this.setState({ excel: null });
    }

    downloadFile = type => {
        const { uploadInfo, dispatch, dataNamespace, createSingle: { saveHeaderCb } } = this.props;
        const { dmId } = saveHeaderCb;
        const { contractNo } = uploadInfo();
        dispatch({ type: "upload/download", payload: { contractNo: Number(contractNo), dmId, fileType: "excel", dataNamespace, operate: "download" } });
    }

    componentWillMount() {
        const { file, dataNamespace, dispatch } = this.props;
        dispatch({ type: "upload/initUpload", payload: { file, dataNamespace } });
    }

    componentWillReceiveProps(nextProps) {
        const { dataNamespace, dispatch, upload } = this.props;
        if (upload[dataNamespace]) {
            const { upload: { [dataNamespace]: { excelError, file } } } = nextProps;
            const { upload: { [dataNamespace]: { excelError: oldError } } } = this.props;
            if (oldError !== excelError && excelError) {
                Modal.error({
                    title: wordsFormat("dm.text.tip"),
                    content: excelError,
                });
            }
        }
    }

    render() {
        const { disabled, loading, file, upload, dataNamespace, ...rest } = this.props;
        const { excel } = this.state;
        let fileList = [];
        if (upload[dataNamespace]) {
            fileList = upload[dataNamespace].fileList;
        }
        return (
            <Upload
                {...rest}
                className={["clearfix", disabled ? "only-view-file" : ""].join(" ")}
                disabled={disabled}
                beforeUpload={this.beforeUpload}
                onPreview={this.onPreview}
                onChange={this.handleChange}
                fileList={fileList}
                accept=".xls,.xlsx"
            >
                <Button disabled={fileList && fileList.length > 0}>
                    <Icon type={loading ? "loading" : "upload"} /> {wordsFormat('dm.upload.text')}
                </Button>
            </Upload>
        );
    }
}