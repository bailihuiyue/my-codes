import React, { PureComponent, Fragment } from 'react';
import { getAuthority } from '@/utils/authority';

const all_auth = ["Ones__Admin", "SECManager", "SECBO", "SECBOTL", "AFRegionalTL", "AFBO", "AFSpecialist", "AFSupervisor", "Ones__AFRegionalOperator", "Ones__SECSupervisor"];
const auth = {
    createSingle_Main: ["Ones__Admin", "Ones__AFSpecialist", "Ones__AFSupervisor"],
    createSingle_Approval: ["Ones__AFRegionalOperator", "Ones__SECSupervisor"],
    createSingle_Submit: ["Ones__SECBOTL", "Ones__AFBO","Ones__AFRegionalOperator","Ones__AFSpecialist","Ones__AFRegionalTL","Ones__SECManager","Ones__SECBO","Ones__SECSupervisor"],
    showSurveyInfo: ["Ones__AFRegionalTL","Ones__SECSupervisor","Ones__SECManager","Ones__SECBO","Ones__AFBO","Ones__SECBOTL","Ones__AFSpecialist"]
}

export default class Ones_Authorized extends PureComponent {

    render() {
        const currentAuth = getAuthority()[0];
        const { children, dataNamespace, ...rest } = this.props;
        return (
            <Fragment>
                {
                    auth[dataNamespace].includes(currentAuth) ?
                        <div
                            {...rest}
                        >
                            {children}
                        </div> :
                        null
                }
            </Fragment>
        )
    }
}