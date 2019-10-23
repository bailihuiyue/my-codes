import React, { PureComponent } from 'react';
import { Upload, Icon, Button, message, Modal, Ones_Message } from 'antd';
import { connect } from 'dva';
import { wordsFormat } from '@/utils/publicWord';
import styles from './index.less';

const confirm = Modal.confirm;
const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
const limitFileSize = 1024 * 1024 * 5;

export default class Ones_OnlyUpload extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            excel: null
        };
    }

    beforeUpload = (file) => {
        const isTypeRight = fileType.includes(file.type);
        const isSizeRight = file.size <= limitFileSize;
        const { uploadFile } = this.props;
        if (!isTypeRight) {
            message.error(wordsFormat('dm.uploadFile.errorType'));
        }
        if (!isSizeRight) {
            message.error(wordsFormat('dm.uploadFile.errorSize'));
        }
        return uploadFile && uploadFile(file);
    }

    render() {
        const { loading, ...rest } = this.props;
        return (
            <Upload
                {...rest}
                style={{ color: "#000001", display: "inline-block" }}
                beforeUpload={this.beforeUpload}
                accept=".xls,.xlsx"
                showUploadList={false}
            >
                <Button>
                    <Icon type={loading ? "loading" : "upload"} /> {wordsFormat('dm.upload.text')}
                </Button>
            </Upload>
        );
    }
}