import React, { Component, Fragment } from 'react'
import rules from '@/utils/formItemRules';
import { Ones_Row, Ones_Title, Ones_Textarea, Ones_RadioGroup } from '@/components/Ones_Components';
import { GroupTaskComponentFlowStatus, setGroupTaskFlowFormStatus, Ones__Names } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';

export default class BOAttachesEvidence extends Component {

    componentWillReceiveProps(nextProps) {
        setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, formItems: ["evidence", "caseCreatorReplies"], component: "BOAttachesEvidence" })
    }

    render() {
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus, lastStep } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required, rules.maxLength1000];
        return (
            show ?
                <Fragment>
                    {
                        lastStep === Ones__Names.Steps.AF_specialist_checks_evidence ?
                            <Fragment>
                                <Ones_Title title="dm.grouptask.title.Ones_EvidenceFeedback" />
                                <Ones_Row col={{ lg: 24 }} wrapItem>
                                    {getFieldDecorator("caseCreatorReplies", {
                                        hidden: disabled
                                    })(
                                        <Ones_Textarea autosize={{ minRows: 3 }} disabled />
                                    )}
                                </Ones_Row>
                            </Fragment> :
                            null
                    }
                    <Ones_Title title="dm.grouptask.title.CaseCreatorReplies" />
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("evidence", {
                            rules: formItemRules,
                            hidden: disabled
                        })(
                            <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled} placeholder={wordsFormat("dm.text.max1000")} />
                        )}
                    </Ones_Row>
                    <hr />
                </Fragment> :
                null
        )
    }
}
