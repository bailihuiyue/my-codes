import React, { Fragment } from 'react';
import { Ones_Row, Ones_Title, Ones_TextGroup, } from '@/components/Ones_Components';
import { getDictionValues } from '@/utils/utils';

const violatorInfoRowCfg = { row: { gutter: 16 }, col: new Array(6).fill({ xxl: 6, xl: 8, lg: 12 }) };
const field = ["submissionEnty", "sourceDept", "detectiveApproach", "discussion", "caseNo"];
const key2Value = {
    "submissionEnty": "submissionEntyId",
    "sourceDept": "sourceDeptId",
    "detectiveApproach": "detectiveApproach2Id",
    "discussion": "issue4DiscussionId",
    "caseNo": "caseNo"
}
const fieldVal = getDictionValues();

const SurveyInfo = ({ data }) => {
    const getValue = (item) => {
        if (item === "caseNo") {
            return data.caseNo;
        } else {
            if (fieldVal[item] && data.actRunId) {
                for (let i = 0; i < fieldVal[item].length; i++) {
                    if (fieldVal[item][i].valueCode === data[`${key2Value[item]}`]) {
                        return fieldVal[item][i].valueDesc;
                    }
                }
            }
        }
    }
    return (
        <Fragment>
            <Ones_Title title={['dm.createsignle.surveyInfo']} />
            <Ones_Row {...violatorInfoRowCfg}>
                {
                    field.map(item => (
                        <Ones_TextGroup
                            title={`dm.formItem.${item}`}
                            key={item}
                            smallMargin
                            rowStyle={{ margin: "5px 0" }}
                            value={getValue(item)}
                        />
                    ))
                }
            </Ones_Row>
        </Fragment>
    )
}

export default SurveyInfo;