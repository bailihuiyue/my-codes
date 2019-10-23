import React, { PureComponent, Fragment } from 'react';
import AfSpecialistInputsDmProposedDecision from './AfSpecialistInputsDmProposedDecision';
import SalesCommu from './SalesCommu';
import BOAttachesEvidence from './BOAttachesEvidence';
import AfSpecialistAttachesEvidence from './AfSpecialistAttachesEvidence';
import AfSpecialistInputsFinalOnes_Decision from './AfSpecialistInputsFinalOnes_Decision';
import PendingStatus from './PendingStatus';
import SalesCommuAgain from './SalesCommuAgain';
import SimpleFlow from './SimpleFlow';
import { Ones_Row, Ones_RadioGroup } from '@/components/Ones_Components';

export default class GroupTaskFlow extends PureComponent {
    render() {
        const { formObj, pageInfo, currentAuth, idFraud, voteInfo, scCounts, stepStatus } = this.props;
        return (
            <Fragment>
                {/* selfStatus: 1 */}
                <AfSpecialistInputsDmProposedDecision idFraud={idFraud} selfStatus={[1]} showPage={[0, 1, 9, 10, 11, 12, 8]} currentAuth={currentAuth} selfAuth={["Ones__SECSupervisor", "Ones__SECManager", "Ones__SECBO", "Ones__SECBOTL", "Ones__AFBO", "Ones__AFRegionalOperator", "Ones__AFRegionalTL", "Ones__AFSpecialist", "Ones__AFSpecialist", "Ones__SalesCommunication"]} pageInfo={pageInfo} formObj={formObj} voteInfo={voteInfo} />
                {
                    stepStatus === 11 || stepStatus === 12 ?
                        null :
                        <Fragment>
                            {/* 11 */}
                            <BOAttachesEvidence selfStatus={[11]} showPage={[11, 12]} currentAuth={currentAuth} selfAuth={["Ones__SECSupervisor", "Ones__SECManager", "Ones__SECBO", "Ones__SECBOTL", "Ones__AFBO", "Ones__AFRegionalOperator", "Ones__AFRegionalTL", "Ones__AFSpecialist"]} pageInfo={pageInfo} formObj={formObj} />
                            {/* 12 */}
                            <AfSpecialistAttachesEvidence selfStatus={[12]} showPage={[10, 9, 12]} currentAuth={currentAuth} selfAuth={["Ones__AFBO", "Ones__AFSpecialist", "Ones__SalesCommunication"]} pageInfo={pageInfo} formObj={formObj} />
                        </Fragment>
                }
                {/* 9again */}
                <SalesCommuAgain selfStatus={[9]} showPage={[9]} currentAuth={currentAuth} selfAuth={["Ones__SECSupervisor", "Ones__SECManager", "Ones__SECBO", "Ones__SECBOTL", "Ones__AFBO", "Ones__AFRegionalOperator", "Ones__AFRegionalTL", "Ones__AFSpecialist", "Ones__SalesCommunication"]} pageInfo={pageInfo} formObj={formObj} scCounts={scCounts} />
                {/* 9 */}
                <SalesCommu selfStatus={[9]} showPage={[9, 10, 11, 12]} currentAuth={currentAuth} selfAuth={["Ones__SECSupervisor", "Ones__SECManager", "Ones__SECBO", "Ones__SECBOTL", "Ones__AFBO", "Ones__AFRegionalOperator", "Ones__AFRegionalTL", "Ones__AFSpecialist", "Ones__SalesCommunication"]} pageInfo={pageInfo} formObj={formObj} scCounts={scCounts} />
                {/* 10 */}
                <AfSpecialistInputsFinalOnes_Decision selfStatus={[10]} showPage={[10]} currentAuth={currentAuth} selfAuth={["Ones__AFSpecialist", "Ones__SalesCommunication"]} pageInfo={pageInfo} formObj={formObj} />
                {
                    stepStatus === 11 || stepStatus === 12 ?
                        <Fragment>
                            <BOAttachesEvidence selfStatus={[11]} showPage={[11, 12]} currentAuth={currentAuth} selfAuth={["Ones__SECSupervisor", "Ones__SECManager", "Ones__SECBO", "Ones__SECBOTL", "Ones__AFBO", "Ones__AFRegionalOperator", "Ones__AFRegionalTL", "Ones__AFSpecialist"]} pageInfo={pageInfo} formObj={formObj} />
                            <AfSpecialistAttachesEvidence selfStatus={[12]} showPage={[9, 12]} currentAuth={currentAuth} selfAuth={["Ones__AFBO", "Ones__AFSpecialist", "Ones__SalesCommunication"]} pageInfo={pageInfo} formObj={formObj} />
                        </Fragment> :
                        null
                }
                {/* 8 */}
                <PendingStatus selfStatus={[8]} showPage={[9, 8]} currentAuth={currentAuth} selfAuth={["Ones__AFSpecialist"]} pageInfo={pageInfo} formObj={formObj} />
                {/* 2,3,4,6,7 */}
                <SimpleFlow selfStatus={[2, 3, 4, 6, 7]} showPage={[2, 3, 4, 6, 7]} currentAuth={currentAuth} selfAuth={["Ones__SECManager", "Ones__SECBOTL", "Ones__SECBO", "Ones__AFRegionalTL", "Ones__AFBO"]} pageInfo={pageInfo} formObj={formObj} />
            </Fragment>
        )
    }
}
