import React, { PureComponent, Fragment } from 'react';
import {
    AfSpecialistInputsDmProposedDecision,
    AfSpecialistInputsFinalOnes_Decision,
    SalesCommu,
    AfSpecialistAttachesEvidence,
    BOAttachesEvidence,
    SimpleFlow,
} from './stepAllFlow';

export default class CaseSearchFlow extends PureComponent {
    render() {
        const { formObj, pageInfo, currentAuth, scCounts } = this.props;
        return (
            <Fragment>
                {/* 2,3,4,6,7 */}
                <SimpleFlow showPage={[2, 3, 4, 6, 7]} pageInfo={pageInfo} disabled={true} />
                {/* selfStatus: 1 */}
                <AfSpecialistInputsDmProposedDecision showPage={[0, 1, 9, 10, 11, 12, 8]} pageInfo={pageInfo} disabled={true} />
                {/* 9 */}
                <SalesCommu showPage={[9, 10, 11, 12]} pageInfo={pageInfo} disabled={true} scCounts={scCounts} />
                {/* 11 */}
                <BOAttachesEvidence showPage={[9, 11, 12]} pageInfo={pageInfo} disabled={true} />
                {/* 12 */}
                <AfSpecialistAttachesEvidence showPage={[9, 11, 12]} pageInfo={pageInfo} disabled={true} />
                {/* 10 */}
                <AfSpecialistInputsFinalOnes_Decision showPage={[10]} pageInfo={pageInfo} disabled={true} />
            </Fragment>
        )
    }
}
