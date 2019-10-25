import React, { PureComponent, Fragment } from 'react';
import { Modal } from 'antd';
import { wordsFormat } from '@/utils/publicWord';
import PropTypes from 'prop-types';
import Button from '@/components/Ones_Button';

const { confirm } = Modal;
export const Ones_confirm = ({ message, callback, ...props }) => {
    confirm({
        title: wordsFormat('dm.text.please.confirm'),
        content: message,
        className: '',
        okText: wordsFormat('dm.text.ok'),
        onOk: callback,
        cancelText: wordsFormat('dm.text.cancel'),
        ...props,
    });
}

export class Ones_Modal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    static propTypes = {
        visible: PropTypes.bool,
        loading: PropTypes.bool,
        maskClosable: PropTypes.bool,
    };

    static defaultProps = {
        visible: false,
        loading: false
    };

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        this.setState({ visible });
    };

    setModalVisible = visible => {
        this.setState({ visible });
    }

    handleCancel = () => {
        this.setModalVisible(false);
    }


    render() {
        let footerBtns;
        const { title, handleOk, handleCancel, children, btns, ...rest } = this.props;
        const { visible } = this.state;
        if (btns) {
            footerBtns = (
                <Fragment>
                    {btns.map(({ type, txt, onClick, disabled, loading, ...rest }) =>
                        <Button onClick={onClick} type={type} key={txt} disabled={disabled} loading={loading} {...rest}>{txt}</Button>
                    )}
                </Fragment>
            )
        }
        return (
            <Modal
                destroyOnClose
                {...rest}
                title={title}
                visible={visible}
                onOk={handleOk}
                footer={footerBtns}
            >
                {children}
            </Modal>
        );
    }
}
