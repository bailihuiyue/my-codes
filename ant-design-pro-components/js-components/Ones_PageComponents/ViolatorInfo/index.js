import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import { Ones__Names } from '@/utils/utils';
import { Ones_Title, Ones_Row, Ones_TextGroup } from '@/components/Ones_Components';
import { wordsFormat } from '@/utils/publicWord';
import ViolatorDetail from './ViolatorDetail';
import storage from '@/utils/storage';
import { getAuthority } from '@/utils/authority';

const show = {
  "/createsignle": ["Ones__AFSpecialist"],
  "/case": ["Ones__AFSpecialist", "Ones__AFBO", "Ones__SECBOTL", "Ones__SalesCommunication"]
}

@withRouter
@connect(({ createSingle, taskReview, loading }) => ({
  createSingle,
  taskReview,
  loadingVioRec: loading.effects['createSingle/getViolateCreationRecords'] || loading.effects['taskReview/getViolateCreationRecords'],
}))
export default class ViolatorInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showViolationDetail: false,
    }
  }

  handleVerbal = key => {
    const { showViolationDetail } = this.state;
    const { dispatch, salesId, salesType, viewType = "createSingle", data: { pageInfo }, ...params } = this.props;
    let punishmentType = "";
    if (key !== 'close') {
      switch (key) {
        case "verbalCriticism":
          punishmentType = "Verbal criticism";
          break;
        case "verbalWarning":
          punishmentType = "Verbal warning";
          break;
        case "writtenWarning":
          punishmentType = "Written warning";
          break;
        case "termination":
          punishmentType = "Termination";
          break;
        case "na":
          punishmentType = "na";
          break;
        default:
          break;
      }
      const viewTypeArr = {
        createSingle: {
          type: "createSingle/getViolateCreationRecords",
          payload: {
            salesType,
            punishmentType,
            salesId
          }
        },
        groupTaskReview: {
          type: "taskReview/getViolateCreationRecords",
          payload: {
            dmId: params.dmId,
            punishmentType,
            salesId: pageInfo.saleId,
            salesType: pageInfo.saleTypeId
          }
        }
      }
      dispatch(viewTypeArr[viewType]);
    }
    this.setState({ showViolationDetail: !showViolationDetail });
  }

  render() {

    const { data: { pageInfo, saveHeaderCb, dmId }, taskReview: { vioRec: taskReviewVioRec }, children, loadingVioRec, type, pageTitle, createSingle: { vioRec: createSingleVioRec }, viewType, location: { pathname } } = this.props;
    const dataSrcType = viewType || "createSingle";
    const { showViolationDetail } = this.state;
    const { currentStep } = pageInfo;
    const violatorInfoRowCfg = { row: { gutter: 16 }, col: new Array(6).fill({ xxl: 6, xl: 8, lg: 12 }) };
    const vioGroupSaler = ["saleName", "saleType", "cardNo", "posName", "posType"];
    const vioGroupArea = ["province", "region"];
    const vioGroupStatus = ["managerId", "managerName", "onBoardDate", "employmentStatus", "resignationDate"];
    const vioGroupVerbal = ["verbalCriticism", "verbalWarning", "writtenWarning", "termination", "na"];
    return (
      <Fragment>
        <Ones_Title title={[pageTitle || 'dm.createsignle.pageTitle']} center noMarginBottom />
        <Ones_Title
          title={[
            `${wordsFormat('dm.createsignle.Ones_ID')}${saveHeaderCb.dmId || dmId || ""}`,
            `${wordsFormat('dm.createsignle.currentStep')}${type === "createSingle" ? Ones__Names.Steps.Draft_case : currentStep || "loading..."}`,
            `${wordsFormat('dm.createsignle.currentAuth')}${storage.get('antd-pro-authority').join('')}`
          ]}
          noWordsFormat
          noMarginBottom
        />
        <Ones_Title title={['dm.createsignle.violationPersonInfo']} />
        {children}
        <hr />
        <Ones_Row {...violatorInfoRowCfg}>
          {vioGroupSaler.map(
            key => <Ones_TextGroup
              key={key}
              title={`${"dm.formItem."}${key}`}
              value={pageInfo[key]}
            />
          )}
        </Ones_Row>
        <hr />
        <Ones_Row {...violatorInfoRowCfg}>
          {vioGroupArea.map(
            key => <Ones_TextGroup
              key={key}
              title={`${"dm.formItem."}${key}`}
              value={pageInfo[key]}
            />
          )}
        </Ones_Row>
        <hr />
        <Ones_Row {...violatorInfoRowCfg}>
          {vioGroupStatus.map(
            key => <Ones_TextGroup
              key={key}
              title={`${"dm.formItem."}${key}`}
              value={pageInfo[key]}
            />
          )}
        </Ones_Row>
        <hr />
        {
          show[pathname] && show[pathname].includes(getAuthority()[0]) ?
            <Fragment>
              <Ones_Row {...violatorInfoRowCfg}>
                {vioGroupVerbal.map(
                  key => <Ones_TextGroup
                    key={key}
                    title={`${"dm.formItem."}${key}`}
                    onClick={this.handleVerbal.bind(this, key)}
                    value={pageInfo[key]}
                  />
                )}
              </Ones_Row>
              <hr />
            </Fragment> :
            null
        }
        <ViolatorDetail visible={showViolationDetail} loading={loadingVioRec} dataSource={dataSrcType === "createSingle" ? createSingleVioRec : taskReviewVioRec} onClose={this.handleVerbal} />
      </Fragment>
    )
  }
}
