import React, { Component, Fragment } from 'react'
import rules from '@/utils/formItemRules';
import { Ones_Row, Ones_RadioGroup, Ones_Textarea, Ones_Title } from '@/components/Ones_Components';
import { GroupTaskComponentFlowStatus, Ones__Names } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';
import styles from './index.less'

const returnObj = {
    2: { returnStep: Ones__Names.Steps.AF_specialist_inputs_Ones__proposed_decision },
    3: { returnStep: Ones__Names.Steps.SEC_BO_TL_checks_case },
    4: { returnStep: Ones__Names.Steps.SEC_BO_checks_case },
    6: { returnStep: Ones__Names.Steps.AF_BO_checks_case },
    7: { returnStep: Ones__Names.Steps.AF_specialist_inputs_Ones__proposed_decision },
}

export default class SimpleFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SimpleFlowFormRules: [rules.maxLength50],
            needCaseExplainDsiabled: true
        }
    }

    setEvidenceNeeded = (e) => {
        const { formObj: { getFieldsValue, resetFields, setFieldsValue } } = this.props;
        const sellectedVal = e.target.value;
        const isEvidenceNeeded = (sellectedVal === "return" || sellectedVal === "cancel");
        if (isEvidenceNeeded) {
            this.setState({
                SimpleFlowFormRules: [rules.required, rules.maxLength50],
                needCaseExplainDsiabled: false
            });
        } else {
            this.setState({
                SimpleFlowFormRules: [rules.maxLength50],
                needCaseExplainDsiabled: true
            });
            resetFields(["SimpleFlowNeedCaseExplain"]);
        }
    }

    render() {
        const { SimpleFlowFormRules, needCaseExplainDsiabled } = this.state;
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus, lastStep, needCaseExplain, currentStep } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const isReturn = returnObj[stepStatus] && returnObj[stepStatus].returnStep === lastStep;
        const formItemRules = disabled ? false : [rules.required, rules.maxLength1000];
        return (
            show ?
                <Fragment>
                    {
                        isReturn && needCaseExplain ?
                            <Fragment>
                                <Ones_Title noWordsFormat title={`${lastStep} ${wordsFormat("dm.grouptask.title.SimpleFlowReturnReason")}`} />
                                <Ones_Textarea autosize={{ minRows: 3 }} disabled value={needCaseExplain} />
                            </Fragment> :
                            null
                    }
                    <Ones_Row col={{ lg: 24 }} className={styles.marginTop} wrapItem>
                        {getFieldDecorator("SimpleFlowStatus", {
                            rules: formItemRules,
                            hidden: disabled,
                            initialValue: 'approve',
                        })(
                            <Ones_RadioGroup
                                options={[
                                    { label: wordsFormat('dm.grouptaskReview.AF.Approve'), value: "approve" },
                                    { label: wordsFormat('dm.grouptaskReview.AF.Return'), value: "return" },
                                    { label: wordsFormat('dm.grouptaskReview.AF.Cancel'), value: "cancel" }
                                ]}
                                onChange={this.setEvidenceNeeded}
                                disabled={disabled}
                            />
                        )}
                    </Ones_Row>
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("SimpleFlowNeedCaseExplain", {
                            hidden: disabled,
                            rules: SimpleFlowFormRules
                        })(
                            <Ones_Textarea autosize={{ minRows: 3 }} placeholder={wordsFormat("dm.text.max50")} disabled={needCaseExplainDsiabled} />
                        )}
                    </Ones_Row>
                </Fragment> :
                null
        )
    }
}
