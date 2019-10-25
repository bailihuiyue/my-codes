import React, { Component, Fragment } from 'react'
import rules from '@/utils/formItemRules';
import { Ones_Row, Ones_RadioGroup, Ones_Textarea, Ones_Title } from '@/components/Ones_Components';
import { GroupTaskComponentFlowStatus, setGroupTaskFlowFormStatus } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';
import styles from './index.less'
export default class SECDistrictManagerChecksCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SECDistrictManagerChecksCase: [rules.maxLength50],
            needCaseExplainDsiabled: true
        }
    }

    componentWillReceiveProps(nextProps) {
        const { pageInfo: { lastStep, needCaseExplain } } = nextProps;
        if (lastStep === "SEC BO checks case") {
            const specialVal = {
                SECDistrictManagerChecksCase: needCaseExplain
            }
            setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, specialVal, component: "SECDistrictManagerChecksCase" })
        }
    }

    setEvidenceNeeded = (e) => {
        const { formObj: { getFieldsValue, resetFields, setFieldsValue } } = this.props;
        const sellectedVal = e.target.value;
        const isEvidenceNeeded = (sellectedVal === "return" || sellectedVal === "cancel");
        if (isEvidenceNeeded) {
            this.setState({
                SECDistrictManagerChecksCase: [rules.required, rules.maxLength50],
                needCaseExplainDsiabled: false
            });
        } else {
            this.setState({
                SECDistrictManagerChecksCase: [rules.maxLength50],
                needCaseExplainDsiabled: true
            });
            resetFields(["SECDistrictManagerReturnReason"]);
        }
    }

    render() {
        const { SECDistrictManagerChecksCase, needCaseExplainDsiabled } = this.state;
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus, lastStep, needCaseExplain } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required, rules.maxLength1000];
        return (
            show ?
                <Fragment>
                    {
                        lastStep === "SEC BO checks case" ?
                            <Fragment>
                                <Ones_Title title={"dm.grouptask.title.SECBOReturnReason"} />
                                <Ones_Row col={{ lg: 24 }}>
                                    {getFieldDecorator("SECDistrictManagerChecksCase", {
                                        hidden: disabled
                                    })(
                                        <Ones_Textarea autosize={{ minRows: 3 }} disabled />
                                    )}
                                </Ones_Row>
                            </Fragment> :
                            null
                    }
                    <Ones_Row col={{ lg: 24 }} className={styles.marginTop} wrapItem>
                        {getFieldDecorator("secDistrictManagerChecksCaseStatus", {
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
                        {getFieldDecorator("SECDistrictManagerReturnReason", {
                            hidden: disabled,
                            rules: SECDistrictManagerChecksCase
                        })(
                            <Ones_Textarea autosize={{ minRows: 3 }} placeholder={wordsFormat("dm.text.max50")} disabled={needCaseExplainDsiabled} />
                        )}
                    </Ones_Row>
                </Fragment> :
                null
        )
    }
}
