import React, { Component, Fragment } from 'react'
import { Ones_Row, Ones_Checkbox } from '@/components/Ones_Components';
import { wordsFormat } from '@/utils/publicWord';
import { GroupTaskComponentFlowStatus } from '@/utils/utils';

export default class LeadToTermination extends Component {

    handleChange = (e) => {
        const { formObj: { setFieldsValue, resetFields } } = this.props;
        const checked = e.target.checked;
        if (checked) {
            setFieldsValue({ afFirstPunishment: "P0006", afFirstBl: "AIB0001" });
        } else {
            resetFields(['afFirstPunishment', 'afFirstBl']);
        }
    }

    render() {
        const { formObj: { getFieldDecorator }, showPage, selfStatus, selfAuth, currentAuth, pageInfo } = this.props;
        const { stepStatus } = pageInfo;
        const { show } = GroupTaskComponentFlowStatus({ showPage, selfStatus, stepStatus, selfAuth, currentAuth });
        return (
            show ?
                <Fragment>
                    <Ones_Row row={{ gutter: 16 }} col={{ lg: 24 }}>
                        {getFieldDecorator("terminationFlag")(
                            <Ones_Checkbox onChange={this.handleChange} style={{ margin: "10px" }} >
                                {wordsFormat("dm.grouptaskReview.leadToTermination")}
                            </Ones_Checkbox>
                        )}
                    </Ones_Row>
                </Fragment> :
                null
        )
    }
}
