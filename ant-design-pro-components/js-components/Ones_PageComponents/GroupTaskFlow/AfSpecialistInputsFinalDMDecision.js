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

export default class AfSpecialistInputsFinalOnes_Decision extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            afFinalPunishmentColor: false,
            afFinalBonusColor: false,
            afFinalBlColor: false,
            afFinalLossColor: false,
            finalIdFraudCaseColor: false,
            afFinalBonus4OperatorCaseColor: false,
            hasInitColor: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const { hasInitColor } = this.state;
        const { pageInfo: { afFirstPunishment, afFirstBonus, afFirstBl, afFirstLoss, firstIdFraudCase, afFirstBonus4OperatorCase, status, stepStatus, afFinalPunishment, afFinalBonus, afFinalBl, afFinalLoss, finalIdFraudCase, afFinalBonus4OperatorCase } } = nextProps;
        if (!afFinalPunishment) {
            const specialVal = {
                afFinalPunishment: afFirstPunishment,
                afFinalBonus: afFirstBonus,
                afFinalBl: afFirstBl,
                afFinalLoss: afFirstLoss,
                finalIdFraudCase: firstIdFraudCase,
                afFinalBonus4OperatorCase: afFirstBonus4OperatorCase,
            }
            setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, specialVal, component: "AfSpecialistInputsFinalOnes_Decision" })
        } else if (stepStatus === 10) {
            setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, formItems: ["afFinalPunishment", "afFinalBonus", "afFinalBl", "afFinalLoss", "finalIdFraudCase", "afFinalBonus4OperatorCase", "afManagerCheckDesc"], component: "AfSpecialistInputsFinalOnes_DecisionAgain" })
            if (!hasInitColor) {
                this.setState({
                    afFinalPunishmentColor: afFinalPunishment !== afFirstPunishment,
                    afFinalBonusColor: afFinalBonus !== afFirstBonus,
                    afFinalBlColor: afFinalBl !== afFirstBl,
                    afFinalLossColor: afFinalLoss !== afFirstLoss,
                    finalIdFraudCaseColor: finalIdFraudCase !== firstIdFraudCase,
                    afFinalBonus4OperatorCaseColor: afFinalBonus4OperatorCase !== afFirstBonus4OperatorCase,
                    hasInitColor: true
                })
            }
        }
    }

    changeSelect = (name, val) => {
        const { pageInfo } = this.props;
        const componentName = name.replace("First", "Final").replace("first", "final");
        this.setState({ [`${componentName}Color`]: pageInfo[name] !== val ? true : false });
    }

    render() {
        const { afFinalPunishmentColor, afFinalBonusColor, afFinalBlColor, afFinalLossColor, finalIdFraudCaseColor, afFinalBonus4OperatorCaseColor } = this.state;
        const { formObj, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { getFieldDecorator } = formObj;
        const { punishment, punishmentID, bonusDeduction, addIntoBL, lossCompensation } = getDictionValues();
        const { stepStatus, afFinalPunishment } = pageInfo;
        let { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required];
        disabled = disabled;
        return (
            show ?
                <Fragment>
                    <Ones_Title title={`dm.grouptask.AF.specialist.final`} />
                    <Ones_Row row={{ gutter: 16 }} col={new Array(6).fill({ xxl: 6, xl: 8, lg: 12 })}>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishment"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalPunishment", {
                                rules: formItemRules,
                                hidden: disabled
                            })(
                                <Ones_Select data={punishment} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} onChange={this.changeSelect.bind(this, "afFirstPunishment")} style={{ color: afFinalPunishmentColor ? "red" : null }} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeduction"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalBonus", {
                                hidden: disabled
                            })(
                                <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} onChange={this.changeSelect.bind(this, "afFirstBonus")} style={{ color: afFinalBonusColor ? "red" : null }} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.AddintoBL"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalBl", {
                                hidden: disabled
                            })(
                                <Ones_Select data={addIntoBL} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} onChange={this.changeSelect.bind(this, "afFirstBl")} style={{ color: afFinalBlColor ? "red" : null }} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.LossCompensation"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalLoss", {
                                hidden: disabled
                            })(
                                <Ones_Select data={lossCompensation} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} onChange={this.changeSelect.bind(this, "afFirstLoss")} style={{ color: afFinalLossColor ? "red" : null }} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishmentForOperator"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("finalIdFraudCase", {
                                hidden: disabled
                            })(
                                <Ones_Select data={punishmentID} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} onChange={this.changeSelect.bind(this, "firstIdFraudCase")} style={{ color: finalIdFraudCaseColor ? "red" : null }} />
                            )}
                        </Ones_TextGroup>
                        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeductionforOperator"}`} col={Ones_TextGroupCol}>
                            {getFieldDecorator("afFinalBonus4OperatorCase", {
                                hidden: disabled
                            })(
                                <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" disabled={disabled} onChange={this.changeSelect.bind(this, "afFirstBonus4OperatorCase")} style={{ color: afFinalBonus4OperatorCaseColor ? "red" : null }} />
                            )}
                        </Ones_TextGroup>
                    </Ones_Row>
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("afManagerCheckDesc", {
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