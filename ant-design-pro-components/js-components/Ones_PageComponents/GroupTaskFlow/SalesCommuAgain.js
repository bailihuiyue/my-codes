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

export default class SalesCommuAgain extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            again: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const { again } = this.state;
        const { pageInfo: { afFinalPunishment, afFinalBonus, afFinalBl, afFinalLoss, finalIdFraudCase, afFinalBonus4OperatorCase, status, caseCheckOpinion, stepStatus, lastStep }, scCounts } = nextProps;
        if (scCounts > 1) {
            this.setState({ again: true });
            if (stepStatus === 9) {
                setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, formItems: ["afFinalPunishment", "afFinalBonus", "afFinalBl", "afFinalLoss", "finalIdFraudCase", "afFinalBonus4OperatorCase", "afManagerCheckDesc", "caseCheckOpinion"], component: "SalesCommuAgain" })
            }
        } else {
            this.setState({ again: false });
        }
    }

    render() {
        const { again } = this.state;
        const { formObj, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { getFieldDecorator } = formObj;
        const { stepStatus, afFinalPunishment } = pageInfo;
        const { punishment, punishmentID, bonusDeduction, addIntoBL, lossCompensation } = getDictionValues();
        const disabled = true;
        const formItemRules = false;
        const show = stepStatus === 9 && again;
        return (
            show ?
                <Fragment>
                    <Ones_Title title="dm.grouptask.AF.specialist.final" />
                    <Ones_Row row={{ gutter: 16 }} col={new Array(6).fill({ xxl: 6, xl: 8, lg: 12 })}>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishment"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalPunishment", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={punishment} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeduction"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalBonus", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.AddintoBL"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalBl", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={addIntoBL} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.LossCompensation"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalLoss", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={lossCompensation} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishmentForOperator"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("finalIdFraudCase", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={punishmentID} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeductionforOperator"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalBonus4OperatorCase", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} />
                            )}
                        </Ones_TextGroup>
                    </Ones_Row>
                    {
                        again ?
                            <Fragment>
                                <Ones_Row col={{ lg: 24 }} wrapItem>
                                    {getFieldDecorator("afManagerCheckDesc", {
                                        hidden: disabled
                                    })(
                                        <Ones_Textarea autosize={{ minRows: 3 }} disabled placeholder={wordsFormat("dm.text.max50")} />
                                    )}
                                </Ones_Row>
                            </Fragment> :
                            null
                    }
                    <hr />
                </Fragment>
                : null
        )
    }
}