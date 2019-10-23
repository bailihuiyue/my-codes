import React, { PureComponent, Fragment } from 'react';
import { getAuthority } from '@/utils/authority';

const all_auth = ["Ones__Admin", "Ones__SECManager", "Ones__SECBO", "Ones__SECBOTL", "Ones__AFRegionalTL", "Ones__AFBO", "Ones__AFSpecialist", "Ones__AFSupervisor", "Ones__AFRegionalOperator", "Ones__SECSupervisor"];
const auth = {
    groupTask_SECBO: ['Ones__SECBO']
}

export default class Ones_Hidden extends PureComponent {

    render() {
        const currentAuth = getAuthority()[0];
        const { children, dataNamespace, ...rest } = this.props;
        return (
            <Fragment>
                {
                    auth[dataNamespace].includes(currentAuth) ?
                        null
                        :
                        <div
                            {...rest}
                        >
                            {children}
                        </div>
                }
            </Fragment>
        )
    }
}