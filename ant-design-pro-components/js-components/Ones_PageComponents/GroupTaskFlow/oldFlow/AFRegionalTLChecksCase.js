import React, { Component, Fragment } from 'react'
import rules from '@/utils/formItemRules';
import { Ones_Row, Ones_RadioGroup, Ones_Textarea } from '@/components/Ones_Components';
import { GroupTaskComponentFlowStatus } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';
import styles from './index.less';

export default class AFRegionalTLChecksCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rulesState: [rules.maxLength50],
            needCaseExplainDsiabled: true
        }
    }

    setEvidenceNeeded = (e) => {
        const { formObj: { getFieldsValue, resetFields, setFieldsValue } } = this.props;
        const sellectedVal = e.target.value;
        const isEvidenceNeeded = (sellectedVal === "return" || sellectedVal === "cancel");
        if (isEvidenceNeeded) {
            this.setState({
                rulesState: [rules.required, rules.maxLength50],
                needCaseExplainDsiabled: false
            });
        } else {
            this.setState({
                rulesState: [rules.maxLength50],
                needCaseExplainDsiabled: true
            });
            resetFields(["AFRegionalTLChecksCaseNeedCaseExplain"]);
        }
    }

    render() {
        const { rulesState, needCaseExplainDsiabled } = this.state;
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required, rules.maxLength1000];
        return (
            show ?
                <Fragment>
                    <Ones_Row col={{ lg: 24 }} wrapItem className={styles.marginTop}>
                        {getFieldDecorator("AFRegionalTLChecksCaseStatus", {
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
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("AFRegionalTLChecksCaseNeedCaseExplain", {
                            rules: rulesState,
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
