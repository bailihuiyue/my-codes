import React, { PureComponent, Fragment } from 'react'
import {
    Ones_Title, Ones_Row,
    Ones_TextGroup, Ones_RadioGroup,
    Ones_Textarea, Ones_Select,
} from '@/components/Ones_Components';
import rules from '@/utils/formItemRules';
import { getDictionValues, GroupTaskComponentFlowStatus, setGroupTaskFlowFormStatus } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';

const Ones_TextGroupCol = [{ lg: 12 }, { lg: 12 }];

export default class AfSpecialistInputsDmProposedDecision extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isSamePerson: false,
            hasSetIdFraud: false
        }
    }

    componentWillReceiveProps(nextProps) {
        setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, formItems: ["afFirstPunishment", "afFirstBonus", "afFirstBl", "afFirstLoss", "firstIdFraudCase", "afFirstBonus4OperatorCase", "afFirstCheckDesc"], component: "AfSpecialistInputsDmProposedDecision" })
        const { dispatch, idFraud, formObj: { setFieldsValue, resetFields }, voteInfo } = nextProps;
        const { hasSetIdFraud } = this.state;
        if (idFraud && !hasSetIdFraud && voteInfo.samePersonVoteResult) {
            if (voteInfo.samePersonVoteResult === 'not the same person') {
                setFieldsValue({
                    firstIdFraudCase: 'PID0002',
                });
                this.setState({ isSamePerson: false });
            } else if (voteInfo.samePersonVoteResult === 'the same person') {
                setFieldsValue({
                    firstIdFraudCase: 'PID0001',
                });
                this.setState({ isSamePerson: true });
            } else {
                resetFields(['firstIdFraudCase']);
                this.setState({ isSamePerson: true });
            }
            this.setState({ hasSetIdFraud: true })
        }
    }

    render() {
        const { isSamePerson } = this.state;
        const { formObj, showPage, selfStatus, selfAuth, currentAuth, pageInfo, idFraud } = this.props;
        const { getFieldDecorator } = formObj;
        const { punishment, punishmentID, bonusDeduction, addIntoBL, lossCompensation } = getDictionValues();
        const { stepStatus, isIdFruad } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required];
        return (
            show ?
                <Fragment>
                    <Ones_Title title="dm.grouptaskReview.AF.specialist.first" />
                    <Ones_Row row={{ gutter: 16 }} col={new Array(6).fill({ xxl: 6, xl: 8, lg: 12 })}>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishment"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFirstPunishment", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={punishment} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeduction"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFirstBonus", {
                                hidden: disabled
                            })(
                                <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.AddintoBL"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFirstBl", {
                                hidden: disabled
                            })(
                                <Ones_Select data={addIntoBL} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.LossCompensation"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFirstLoss", {
                                hidden: disabled
                            })(
                                <Ones_Select data={lossCompensation} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishmentForOperator"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("firstIdFraudCase", {
                                rules: idFraud && isSamePerson ? formItemRules : false,
                                hidden: disabled
                            })(
                                <Ones_Select data={punishmentID} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeductionforOperator"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFirstBonus4OperatorCase", {
                                hidden: disabled
                            })(
                                <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                    </Ones_Row>
                    {
                        disabled ?
                            null :
                            <Ones_Row col={{ xxl: 6, xl: 8, lg: 12 }} wrapItem>
                                {getFieldDecorator("status", {
                                    rules: formItemRules,
                                    initialValue: 'approve',
                                    hidden: disabled
                                })(
                                    <Ones_RadioGroup
                                        options={[
                                            { label: wordsFormat('dm.grouptaskReview.AF.Approve'), value: "approve" },
                                            { label: wordsFormat('dm.grouptaskReview.AF.Return'), value: "return" },
                                            { label: wordsFormat('dm.grouptaskReview.AF.Pending'), value: "pending" },
                                        ]}
                                        disabled={disabled}
                                    />
                                )}
                            </Ones_Row>
                    }
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("afFirstCheckDesc", {
                            rules: disabled ? false : [rules.required, rules.maxLength50],
                            hidden: disabled
                        })(
                            <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled} placeholder={wordsFormat("dm.grouptaskReview.AF.addInfo")} />
                        )}
                    </Ones_Row>
                    <hr />
                </Fragment>
                : null
        )
    }
}