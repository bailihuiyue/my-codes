import React, { useContext, createContext } from 'react';
import { Upload, Icon, Button, message } from 'antd';
import { wordsFormat } from '@/utils/publicWord';
const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
const limitFileSize = 1024 * 1024 * 5;

interface UploadProps {
    loading: boolean;
    rest: any[];
    uploadFile: any;
}

const beforeUpload: Function = (file: File, uploadFile: Function) => {
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

export default function (props: any) {
    const { Context } = props;
    return (
        <Context.Consumer>
            {
                ({ uploadFile, loading, ...rest }: any) => {
                    return (<Upload
                        {...rest}
                        style={{ color: "#000001", display: "inline-block" }}
                        beforeUpload={(file) => beforeUpload(file, uploadFile)}
                        accept=".xls,.xlsx,.csv"
                        showUploadList={false}
                    >
                        <Button>
                            <Icon type={loading ? "loading" : "upload"} /> {wordsFormat('upload.text')}
                        </Button>
                    </Upload>)
                }
            }

        </Context.Consumer>
    );
}