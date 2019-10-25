import React, { PureComponent, Fragment } from 'react';
import { Popconfirm } from 'antd';
import { Ones_Modal, Ones_Button, Ones_Row, Ones_TextGroup, Ones_Input, Ones_Message } from '@/components/Ones_Components';
import { GroupTaskSearch, OpsGroupTaskSearch, CreatCasesSearch, CaseSearch, BatchUploadSearch, CaseOverviewSearch, MailManagement } from './filterContent/index';
import { Form } from 'antd';
import { wordsFormat } from '@/utils/publicWord';
import styles from './index.less';
import { errorDateTo } from '@/utils/utils';

@Form.create()
export default class Ones_Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clear: false,
        }
    }

    getFormValue = () => {
        const { form: { getFieldsValue, resetFields }, getFormData, dataFormat } = this.props;
        const values = getFieldsValue();
        const { dateFrom, dateTo } = values;
        if (!errorDateTo(dateFrom, dateTo, dataFormat)) {
            return;
        }
        getFormData && getFormData(values);
    }

    resetPage = () => {
        const { resetPage, form: { resetFields } } = this.props;
        resetFields();
        this.setState({ clear: true });
        resetPage && resetPage();
    }

    cleared = () => {
        this.setState({ clear: false });
    }

    render() {
        const { clear } = this.state;
        const { form, contentName, btns, customBtn = false } = this.props;
        const { getFieldDecorator } = form;
        let content = null;
        switch (contentName) {
            case "GroupTaskSearch":
                content = <GroupTaskSearch form={form} clear={clear} cleared={this.cleared} />;
                break;
            case "OpsGroupTaskSearch":
            case "OpsCaseSearch":
                content = <OpsGroupTaskSearch form={form} />;
                break;
            case "CreatCasesSearch":
                content = <CreatCasesSearch form={form} />;
                break;
            case "CaseSearch":
                content = <CaseSearch form={form} clear={clear} cleared={this.cleared} />;
                break;
            case "BatchUploadSearch":
                content = <BatchUploadSearch form={form} />;
                break;
            case "CaseOverviewSearch":
                content = <CaseOverviewSearch form={form} />;
                break;
            case "MailManagement":
                content = <MailManagement form={form} />;
                break;
            default:
                break;
        }
        return (
            <div style={{ marginBottom: "10px" }}>
                <Form>
                    {content}
                </Form>
                <div className={styles.btnStyle}>
                    {
                        customBtn ?
                            null
                            :
                            <Fragment>
                                <Ones_Button type="info" onClick={this.getFormValue}>{wordsFormat("dm.text.search")}</Ones_Button>
                                <Ones_Button onClick={this.resetPage}>{wordsFormat("dm.text.reset")}</Ones_Button>
                            </Fragment>
                    }
                    {btns && btns.map(({ onClick, type, words, needConfirm, disabled, ele, href, ...rest }, index) => {
                        return (
                            onClick ?
                                (
                                    needConfirm ?
                                        <Popconfirm
                                            key={index}
                                            title={wordsFormat('dm.text.confirmOperate')}
                                            onConfirm={onClick}
                                            okText={wordsFormat('dm.text.yes')}
                                            cancelText={wordsFormat('dm.text.no')}
                                        >
                                            <Ones_Button disabled={disabled} type={type} {...rest}>{wordsFormat(words)}</Ones_Button>
                                        </Popconfirm> :
                                        <Ones_Button key={index} onClick={onClick} type={type} href={href} {...rest}>{wordsFormat(words)}</Ones_Button>
                                ) :
                                ele
                        )
                    })}
                </div>
            </div>
        )
    }
}
