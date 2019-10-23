import React, { Component, Fragment } from 'react'
import rules from '@/utils/formItemRules';
import { Ones_Row, Ones_RadioGroup } from '@/components/Ones_Components';
import { GroupTaskComponentFlowStatus } from '@/utils/utils';
import { wordsFormat } from '@/utils/publicWord';

export default class PendingStatus extends Component {
    render() {
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus } = pageInfo;
        const { show, disabled } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        const formItemRules = disabled ? false : [rules.required, rules.maxLength1000];
        return (
            show ?
                <Fragment>
                    <Ones_Row col={{ lg: 24 }} wrapItem>
                        {getFieldDecorator("pendingStatus", {
                            rules: formItemRules,
                            hidden: disabled,
                            initialValue: 'approve',
                        })(
                            <Ones_RadioGroup
                                options={[
                                    { label: wordsFormat('dm.grouptaskReview.AF.Approve'), value: "approve" },
                                    { label: wordsFormat('dm.grouptaskReview.AF.Return'), value: "return" }
                                ]}
                                disabled={disabled}
                            />
                        )}
                    </Ones_Row>
                </Fragment> :
                null
        )
    }
}
