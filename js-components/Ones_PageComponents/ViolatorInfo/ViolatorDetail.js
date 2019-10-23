import React, { PureComponent } from 'react';
import { Ones_Modal, Ones_Table, Ones_Loading } from '@/components/Ones_Components';
import { wordsFormat } from '@/utils/publicWord';
import { createSingle_ViolationDetail } from '@/utils/tableHeaders';

export default class ViolatorDetail extends PureComponent {
    onClose = () => {
        const { onClose } = this.props;
        onClose("close");
    }

    render() {
        const { dataSource, loading, ...rest } = this.props;
        const btns = [{ txt: wordsFormat("dm.text.close"), onClick: () => { this.onClose() } }];
        return (
            <Ones_Modal closable={false} title={wordsFormat("dm.createsignle.violationDetail")} {...rest} footer={null} width="90%" btns={btns}>
                <Ones_Loading show={loading}>
                    <Ones_Table pagination={false} dataSource={dataSource} columns={createSingle_ViolationDetail} dataNamespace="createSingle_ViolationDetail" />
                </Ones_Loading>
            </Ones_Modal>
        )
    }
}