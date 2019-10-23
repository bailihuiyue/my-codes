import React, { PureComponent } from 'react';
import { Upload, Icon, Button, message, Modal, DMMessage } from 'antd';
import { connect } from 'dva';
import { wordsFormat } from '@/utils/publicWord';
import styles from './index.less';

const confirm = Modal.confirm;
const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
const limitFileSize = 1024 * 1024 * 5;

export default (props: any) => {

    const { uploadFile, loading, ...rest } = props;

    const beforeUpload = (file: File) => {
        const isTypeRight = fileType.includes(file.type);
        const isSizeRight = file.size <= limitFileSize;

        if (!isTypeRight) {
            message.error(wordsFormat('uploadFile.errorType'));
        }
        if (!isSizeRight) {
            message.error(wordsFormat('uploadFile.errorSize'));
        }
        return uploadFile && uploadFile(file);
    }
    return (
        <Upload
            {...rest}
            style={{ color: "#000001", display: "inline-block" }}
            beforeUpload={beforeUpload}
            accept=".xls,.xlsx"
            showUploadList={false}
        >
            <Button>
                <Icon type={loading ? "loading" : "upload"} /> {wordsFormat('upload.text')}
            </Button>
        </Upload>
    );
}