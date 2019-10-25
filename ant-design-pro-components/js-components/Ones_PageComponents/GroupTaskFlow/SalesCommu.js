import React, { PureComponent, Fragment } from 'react'
import {
    Ones_Title, Ones_Row,
    Ones_RadioGroup,
    Ones_Textarea,
} from '@/components/Ones_Components';
import { Form } from 'antd';
import rules from '@/utils/formItemRules';
import { GroupTaskComponentFlowStatus, setGroupTaskFlowFormStatus } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';

const { Item } = Form;

export default class SalesCommu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            NeedCaseCreatorExplainRules: [rules.required, rules.maxLength1000],
            again: false
        }
    }

    setEvidenceNeeded = (e) => {
        const { formObj: { getFieldsValue, resetFields, setFieldsValue } } = this.props;
        const sellectedVal = e.target.value;
        const isEvidenceNeeded = sellectedVal === "needEvidence";
        const fieldsValue = getFieldsValue(["caseCheckOpinion"]);
        this.setState({
            NeedCaseCreatorExplainRules:
                isEvidenceNeeded ?
                    [rules.required, rules.maxLength1000] :
                    [rules.maxLength1000]
        }, () => {
            resetFields(["caseCheckOpinion"]);
            fieldsValue && setFieldsValue(fieldsValue);
        });

    }

    componentWillReceiveProps(nextProps) {
        const { pageInfo: { lastStep, afFinalPunishment, salesSpecialistFeedback1, caseCheckOpinion, salesSpecialistFeedback2, }, scCounts } = nextProps;
        if (scCounts > 1) {
            this.setState({ again: true, NeedCaseCreatorExplainRules: false })
        } else {
            this.setState({ again: false })
        }
        setGroupTaskFlowFormStatus({
            nextProps, oldProps: this.props, specialVal: {
                caseCheckOpinion,
                salesSpecialistFeedback1: (salesSpecialistFeedback1 || "") + (salesSpecialistFeedback2 || ""),
            }, component: "SalesCommu"
        })
    }
    render() {
        const { again } = this.state;
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo, scCounts } = this.props;
        const { NeedCaseCreatorExplainRules } = this.state;
        const { stepStatus, lastStep } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required];
        return (
            show ?
                <Fragment>
                    <Ones_Title title={`dm.grouptask.title.SalesCommunicationSpecialistFeedback${again ? "2" : "1"}`} />
                    {disabled ?
                        null :
                        <Ones_Row col={{ xxl: 6, xl: 8, lg: 12 }} wrapItem>
                            {getFieldDecorator("salesCommunStatus", {
                                initialValue: 'needEvidence',
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_RadioGroup
                                    options={[
                                        { label: wordsFormat('dm.grouptaskReview.EvidenceNeeded'), value: "needEvidence" },
                                        { label: wordsFormat('dm.grouptaskReview.AF.dmMeeting'), value: "dmMeeting" },
                                        { label: wordsFormat('dm.grouptaskReview.AgreeDesicion'), value: "agreeDecision" },
                                    ]}
                                    onChange={this.setEvidenceNeeded}
                                    disabled={disabled}
                                />
                            )}
                        </Ones_Row>
                    }
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("salesSpecialistFeedback1", {
                            rules: [rules.maxLength50],
                            hidden: disabled
                        })(
                            <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled} placeholder={wordsFormat("dm.text.max50")} />
                        )}
                    </Ones_Row>
                    <Ones_Title title="dm.grouptask.title.NeedCaseCreatorExplain" />
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("caseCheckOpinion", {
                            rules: disabled ? false : NeedCaseCreatorExplainRules,
                            hidden: disabled,
                        })(
                            <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled} placeholder={wordsFormat("dm.text.max1000")} />
                        )}
                    </Ones_Row>
                    <hr />
                </Fragment>
                : null
        )
    }
}