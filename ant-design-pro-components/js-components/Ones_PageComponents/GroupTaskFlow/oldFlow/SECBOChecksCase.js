import React, { Component, Fragment } from 'react'
import rules from '@/utils/formItemRules';
import { Ones_Row, Ones_RadioGroup, Ones_Textarea } from '@/components/Ones_Components';
import { GroupTaskComponentFlowStatus, setGroupTaskFlowFormStatus } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';
import styles from './index.less';
export default class SECBOChecksCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SECBOChecksCaseNeedCaseExplainRules: [rules.maxLength50],
            needCaseExplainDsiabled: true
        }
    }

    componentWillReceiveProps(nextProps) {
        const { pageInfo: { stepStatus, needCaseExplain } } = nextProps;
        if (stepStatus === 3 && needCaseExplain) {
            const specialVal = {
                SECBOTLReturnReason: needCaseExplain
            }
            setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, specialVal, component: "SECBOChecksCase" })
        }
    }

    setEvidenceNeeded = (e) => {
        const { formObj: { getFieldsValue, resetFields, setFieldsValue } } = this.props;
        const sellectedVal = e.target.value;
        const isEvidenceNeeded = (sellectedVal === "return" || sellectedVal === "cancel");
        if (isEvidenceNeeded) {
            this.setState({
                SECBOChecksCaseNeedCaseExplainRules: [rules.required, rules.maxLength50],
                needCaseExplainDsiabled: false
            });
        } else {
            this.setState({
                SECBOChecksCaseNeedCaseExplainRules: [rules.maxLength50],
                needCaseExplainDsiabled: true
            });
            resetFields(["SECBOChecksCaseNeedCaseExplain"]);
        }
    }

    render() {
        const { SECBOChecksCaseNeedCaseExplainRules, needCaseExplainDsiabled } = this.state;
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus, needCaseExplain } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required];
        return (
            show ?
                <Fragment>
                    <Ones_Row col={{ lg: 24 }} className={styles.marginTop} wrapItem>
                        {getFieldDecorator("secBOChecksCaseStatus", {
                            rules: formItemRules,
                            hidden: disabled,
                            initialValue: 'approve',
                        })(
                            <Ones_RadioGroup
                                options={[
                                    { label: wordsFormat('dm.grouptaskReview.AF.Approve'), value: "approve" },
                                    { label: wordsFormat('dm.grouptaskReview.AF.Return'), value: "return" },
                                    { label: wordsFormat('dm.grouptaskReview.AF.Cancel'), value: "cancel" },
                                ]}
                                onChange={this.setEvidenceNeeded}
                                disabled={disabled}
                            />
                        )}
                    </Ones_Row>
                    {
                        needCaseExplain ?
                            <Ones_Row col={{ lg: 24 }} wrapItem>
                                {getFieldDecorator("SECBOTLReturnReason", {
                                    rules: SECBOChecksCaseNeedCaseExplainRules,
                                    hidden: disabled
                                })(
                                    <Ones_Textarea autosize={{ minRows: 3}} disabled={disabled || needCaseExplainDsiabled} placeholder={wordsFormat("dm.text.max50")} />
                                )}
                            </Ones_Row> :
                            null
                    }

                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("SECBOChecksCaseNeedCaseExplain", {
                            rules: SECBOChecksCaseNeedCaseExplainRules,
                            hidden: disabled
                        })(
                            <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled || needCaseExplainDsiabled} placeholder={wordsFormat("dm.text.max50")} />
                        )}
                    </Ones_Row>
                </Fragment> :
                null
        )
    }
}
