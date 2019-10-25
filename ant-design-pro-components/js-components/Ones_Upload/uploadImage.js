import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Upload, Icon, Modal, message } from 'antd';
import { wordsFormat } from '@/utils/publicWord';
import { createFormData } from '@/utils/utils';
import styles from './index.less';

const imageType = ["image/jpeg", "image/png"];
const limitFileSize = 1024 * 1024 * 5;
let isRightType = true;
const modalWidth = 1000;
@connect(({ upload, createSingle, loading }) => ({
    upload,
    createSingle,
    loading: loading.effects['upload/upload'],
}))
export default class Ones_ImageUpload extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            uploadImage: false,
            imgWidth: 0
        };
    }

    handlePreview = (file) => {
        let img = new Image();
        img.src = file.url || file.thumbUrl;
        img.onload = () => {
            this.setState({
                imgWidth: img.width,
                previewImage: file.url || file.thumbUrl,
                previewVisible: true,
            });
        }
    };

    handleChange = ({ file, fileList }) => {
        const { onChange } = this.props;
        onChange && onChange(fileList.length && isRightType, "image");
    }

    onRemove = (file) => {
        const { onChange } = this.props;
        this.removeFile(file);
        onChange && onChange(false, "image");
    }

    handleCancel = () => this.setState({ previewVisible: false })

    beforeUpload = (file) => {
        const { dataNamespace } = this.props;
        const { beforeUpload, disabled, dispatch } = this.props;
        const isTypeRight = imageType.includes(file.type);
        const isSizeRight = file.size <= limitFileSize;
        if (disabled) {
            return false;
        }
        if (!isTypeRight) {
            message.error(wordsFormat('dm.uploadImage.errorType'));
            return isRightType = false;
        }
        if (!isSizeRight) {
            message.error(wordsFormat('dm.uploadImage.errorSize'));
            return isRightType = false;
        }
        this.uploadFile(file);
        this.setState({ uploadImage: true });
        return isRightType = true;
    }

    uploadFile = file => {
        const { uploadInfo, dispatch, dataNamespace, createSingle: { saveHeaderCb } } = this.props;
        const info = uploadInfo();
        const formData = createFormData("image", info, file, saveHeaderCb);
        if (!info.contractNo) {
            message.error(wordsFormat('dm.text.needContractNO'));
            return;
        }
        dispatch({ type: "upload/upload", payload: { formData, fileType: "image", file, dataNamespace } }).then(res => {
            if (res) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => {
                    dispatch({
                        type: "upload/setImage",
                        payload: {
                            imageList: [{
                                uid: file.uid,
                                name: file.name,
                                status: 'done',
                                url: e.target.result,
                            }],
                            dataNamespace
                        }
                    });
                };
                if (!!window.ActiveXObject || "ActiveXObject" in window){
                    const { onChange } = this.props;
                    onChange && onChange(isRightType, "image");
                }
            }
        });
    }

    removeFile = file => {
        const { uploadInfo, dispatch, dataNamespace, createSingle: { saveHeaderCb } } = this.props;
        const { contractNo } = uploadInfo();
        dispatch({
            type: "upload/setImage",
            payload: {
                imageList: [],
                dataNamespace
            }
        });
        dispatch({ type: "upload/removeFile", payload: { contractNo, ...saveHeaderCb, fileType: "image", dataNamespace } });
        this.setState({ uploadImage: false });
    }

    componentWillMount() {
        const { image, dataNamespace, dispatch } = this.props;
        if(dataNamespace === "CreateSignle_AddNewCase"){
          dispatch({ type: "upload/initUpload", payload: { image, dataNamespace } });
        }
    }

    render() {
        const { upload, disabled, loading, dataNamespace,listType, ...rest } = this.props;
        let imageList = upload[dataNamespace] ? upload[dataNamespace].imageList : [];
        const { previewVisible, previewImage, uploadImage, imgWidth } = this.state;
        const uploadButton = (
            <div>
                <Icon type={loading && uploadImage ? "loading" : "plus"} />
                <div className="ant-upload-text">{wordsFormat('dm.upload.text')}</div>
            </div>
        );

        return (
            <Fragment>
                <Upload
                    className={["clearfix", disabled ? "only-view-pic" : ""].join(" ")}
                    listType={listType || "picture-card"}
                    {...rest}
                    disabled={disabled}
                    fileList={imageList}
                    onPreview={this.handlePreview}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    onRemove={this.onRemove}
                >
                    {imageList && imageList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} width={imgWidth > modalWidth ? modalWidth : (imgWidth + 50)}>
                    <img alt="thumb" style={{ width: imgWidth > modalWidth ? "100%" : imgWidth }} src={previewImage} />
                </Modal>
            </Fragment>
        );
    }
}
