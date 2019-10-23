import React, { PureComponent, Fragment } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import {
  Ones_Modal,
  Ones_Table,
  Ones_Button,
  Ones_Row,
  Ones_TextGroup,
  Ones_Select,
  Ones_UploadImage,
  Ones_UploadFile,
  Ones_Textarea,
  Ones_Loading,
  Ones_Input,
  Ones_Message,
  Ones_Title,
} from '@/components/Ones_Components';
import { wordsFormat } from '@/utils/publicWord';
import { getDictionValues } from '@/utils/utils';
import { ReviewNewCaseHeader } from '@/utils/tableHeaders';
import rules from '@/utils/formItemRules';
import storage from '@/utils/storage';
import { Form } from 'antd';
import styles from './index.less';

const { Item } = Form;
const dataNamespace = 'TaskReview_AddNewCase';
const productPickUpStatus = {
  Y: wordsFormat('dm.text.yes'),
  N: wordsFormat('dm.text.no'),
  I: wordsFormat('dm.text.notInvolved'),
  R: wordsFormat('dm.text.unconfirmed'),
  C: wordsFormat('dm.text.couldNotConfirm'),
};
let imageList = null;

@connect(({ upload, loading }) => ({
  upload,
  loading: loading,
}))
@Form.create()
export default class ReviewNewCase extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgFileName: null,
    };
  }
  static defaultProps = {
    disabled: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      dataSource: { setContractMaintainenceInfo },
      visible,
      dispatch,
    } = nextProps;
    const { image, imgFileName } = setContractMaintainenceInfo;
    if (!visible) {
      return { imgFileName: null };
    }
    if (imgFileName !== prevState.imgFileName && image && imgFileName) {
      imageList = [
        {
          uid: '-1',
          name: imgFileName,
          status: 'done',
          url: `data:image/${imgFileName.split('.')[1]};base64,${image}`,
        },
      ];
      dispatch({
        type: 'upload/setImage',
        payload: { dataNamespace, image: imageList, imageList },
      });
      return { imgFileName };
    }
    if (!imgFileName) imageList = null;
    return null;
  }
  closeModal = () => {
    imageList = null;
    const { onClose } = this.props;
    onClose('close');
  };
  downloadExcel = () => {
    const {
      dispatch,
      dataSource: {
        saveHeaderCb: { dmId },
        contractInfo: { contractNo, virtualContractNo },
      },
    } = this.props;
    dispatch({
      type: 'upload/download',
      payload: {
        contractNo: Number(contractNo || virtualContractNo),
        dmId,
        fileType: 'excel',
        dataNamespace,
        operate: 'download',
      },
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      dataSource: { contractInfo, saveHeaderCb, pageInfo, setContractMaintainenceInfo },
      disabled,
      loadingSaveModal,
      loading,
      isAddNewCase,
      ...rest
    } = this.props;
    const { id, idviolationListent, saleId, posName, saleName, managerName, managerId } = pageInfo;
    const {
      voteRate1,
      voteRate2,
      voteResult1,
      voteResult2,
      virtualContractNo,
      contractNo,
    } = contractInfo;
    const { violationList } = setContractMaintainenceInfo;
    const { dataSource, rowData, rowIndex, isShowNewViolation } = this.state;
    const { dmDicVal, mainViolation, radioOptions } = getDictionValues();
    const columns = ReviewNewCaseHeader(mainViolation, dmDicVal, radioOptions, styles);
    const rowCfg = { row: { gutter: 16 }, col: new Array(14).fill({ lg: 12 }) };
    const addNewGroup = [
      'contractSalesId',
      'contractSalesName',
      'contractPosCode',
      'contractPosName',
      'managerId',
      'managerName',
    ];
    const btns = [
      {
        type: '',
        txt: wordsFormat('dm.text.close'),
        onClick: this.closeModal,
        disabled: loadingSaveModal,
      },
    ];

    return (
      <Fragment>
        <Ones_Modal
          btns={btns}
          destroyOnClose={false}
          className={styles.addNewCase}
          closable={false}
          title={wordsFormat('dm.createsignle.maintainViolation')}
          {...rest}
          footer={null}
          width="74%"
          btns={btns}
        >
          <Ones_Loading show={loading.global}>
            <Ones_Row {...rowCfg}>
              <Ones_TextGroup title={`${'dm.formItem.dmHeaderId'}`} value={saveHeaderCb.dmId} />
              <Ones_TextGroup
                title={`${
                  virtualContractNo ? 'dm.table.virtualContractNo' : 'dm.formItem.contractNo'
                }`}
                value={contractNo || virtualContractNo}
              />
            </Ones_Row>
            <Ones_Row {...rowCfg}>
              <Ones_TextGroup title={`${'dm.formItem.mergeId'}`} value={saleId} />
              <Ones_TextGroup title={`${'dm.formItem.mergeName'}`} value={saleName || posName} />
            </Ones_Row>
            <Ones_Row {...rowCfg}>
              {addNewGroup.map(key => (
                <Ones_TextGroup
                  key={key}
                  title={`${'dm.formItem.'}${key}`}
                  value={contractInfo ? contractInfo[key] : ''}
                />
              ))}
            </Ones_Row>

            <Ones_Row {...rowCfg} className={styles.margin10}>
              <Ones_TextGroup
                title={`${'dm.formItem.productPickUpStatus'}`}
                smallMargin
                wrapItem
                value={contractInfo ? productPickUpStatus[contractInfo['productPickUpStatus']] : ''}
              />
              <Ones_TextGroup
                title={`${'dm.formItem.uploadExcel'}`}
                smallMargin
                wrapItem
                value={
                  setContractMaintainenceInfo ? (
                    <a href="javascript:;" onClick={this.downloadExcel}>
                      {setContractMaintainenceInfo.contractFileName}
                    </a>
                  ) : null
                }
              />
            </Ones_Row>
            <Ones_Table
              pagination={false}
              columns={columns}
              dataSource={violationList}
              dataNamespace={dataNamespace}
            />
            <Ones_Row
              {...rowCfg}
              className={styles.margin20}
              style={{ display: imageList ? '' : 'none' }}
            >
              <Ones_TextGroup title={`${'dm.formItem.uploadImage'}`} smallMargin wrapItem>
                {getFieldDecorator('image')(
                  <Ones_UploadImage image={imageList} disabled={true} dataNamespace={dataNamespace} />
                )}
              </Ones_TextGroup>
              <div />
            </Ones_Row>
            {imageList ? <Ones_Title title={['dm.table.ops.VoteOutcome']} /> : null}
            <Ones_Row
              {...rowCfg}
              className={styles.margin20}
              style={{ display: imageList ? '' : 'none' }}
            >
              <Ones_TextGroup title={'dm.table.ops.IsTheSamePerson'} value={voteRate1} />
              <Ones_TextGroup title={'dm.table.ops.ps'} value={voteRate2} />
            </Ones_Row>
            <Ones_Row
              {...rowCfg}
              className={styles.margin20}
              style={{ display: imageList ? '' : 'none' }}
            >
              <Ones_TextGroup
                title={'dm.grouptaskReview.voteResult'}
                value={voteResult1 || voteResult2 ? `${voteResult1}/${voteResult2}` : ''}
              />
              <div />
            </Ones_Row>
          </Ones_Loading>
        </Ones_Modal>
      </Fragment>
    );
  }
}
