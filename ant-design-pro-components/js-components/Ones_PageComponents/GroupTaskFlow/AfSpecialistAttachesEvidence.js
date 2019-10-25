import React, { Component, Fragment } from 'react'
import rules from '@/utils/formItemRules';
import { Ones_Row, Ones_Title, Ones_Textarea, Ones_RadioGroup } from '@/components/Ones_Components';
import { GroupTaskComponentFlowStatus, setGroupTaskFlowFormStatus } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';

export default class AfSpecialistAttachesEvidence extends Component {

    componentWillReceiveProps(nextProps) {
        setGroupTaskFlowFormStatus({ nextProps, oldProps: this.props, formItems: ["caseCreatorReplies"], component: "AfSpecialistAttachesEvidence" })
    }

    render() {
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required, rules.maxLength1000];
        return (
            show ?
                <Fragment>
                    <Ones_Title title="dm.grouptask.title.Ones_EvidenceFeedback" />
                    {
                        disabled ?
                            null :
                            <Ones_Row col={{ xxl: 6, xl: 8, lg: 12 }} wrapItem>
                                {getFieldDecorator("Ones_AttachesEvidenceStatus", {
                                    rules: formItemRules,
                                    initialValue: 'approve',
                                    hidden: disabled
                                })(
                                    <Ones_RadioGroup
                                        options={[
                                            { label: wordsFormat('dm.grouptaskReview.AF.Approve'), value: "approve" },
                                            { label: wordsFormat('dm.grouptaskReview.AF.Return'), value: "return" },
                                            { label: wordsFormat('dm.grouptaskReview.AF.Cancel'), value: "cancel" },
                                        ]}
                                        disabled={disabled}
                                    />
                                )}
                            </Ones_Row>
                    }
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("caseCreatorReplies", {
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
