import React, { Fragment } from 'react'
import {
  Ones_Title, Ones_Row,
  Ones_TextGroup, Ones_RadioGroup,
  Ones_Textarea, Ones_Select, Ones_Input
} from '@/components/Ones_Components';
import { getDictionValues, GroupTaskComponentFlowStatus, Ones__Names } from '@/utils/utils';
import { getAuthority } from '@/utils/authority'
import { wordsFormat } from '@/utils/publicWord';
import rules from '@/utils/formItemRules';

const { punishment, punishmentID, bonusDeduction, addIntoBL, lossCompensation, caseCategory } = getDictionValues();
const Ones_TextGroupCol = [{ lg: 12 }, { lg: 12 }];
/* selfStatus: 1 */
export const AfSpecialistInputsDmProposedDecision = ({ showPage, pageInfo, disabled }) => {
  // const show = pageInfo && showPage.includes(pageInfo.stepStatus) ? true : false;
  // if (!show) return null; 
  if (!Ones__Names.pagePermissionLimit.showAFSpecialistInitial.includes(getAuthority()[0])) return null;
  const { afFirstPunishment, afFirstBonus, afFirstBl, afFirstLoss, firstIdFraudCase, afFirstBonus4OperatorCase, afFirstCheckDesc } = pageInfo;
  return (
    <Fragment>
      <Ones_Title title="dm.grouptask.AF.specialist.initial" />
      <Ones_Row row={{ gutter: 16 }} col={new Array(6).fill({ xxl: 6, xl: 8, lg: 12 })}>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishment"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={punishment} dataKey="valueCode" dataVal="valueDesc" value={afFirstPunishment || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeduction"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" value={afFirstBonus || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.AddintoBL"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={addIntoBL} dataKey="valueCode" dataVal="valueDesc" value={pageInfo.afFirstBl || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.LossCompensation"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={lossCompensation} dataKey="valueCode" dataVal="valueDesc" value={afFirstLoss || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishmentForOperator"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={punishmentID} dataKey="valueCode" dataVal="valueDesc" value={firstIdFraudCase || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeductionforOperator"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" value={afFirstBonus4OperatorCase || undefined} disabled={disabled} />
        </Ones_TextGroup>
      </Ones_Row>
      <Ones_Row col={{ lg: 24 }} wrapItem>
        <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled} value={afFirstCheckDesc} placeholder={wordsFormat("dm.text.max50")} />
      </Ones_Row>
    </Fragment>
  )
}

/* selfStatus 9 */
export const SalesCommu = ({ showPage, pageInfo, disabled, scCounts }) => {
  // const show = pageInfo && showPage.includes(pageInfo.stepStatus) ? true : false;
  // if (!show) return null; 
  if (!Ones__Names.pagePermissionLimit.showSalesCommunicationSpecialistFeedback.includes(getAuthority()[0])) return null;
  const { lastStep, salesSpecialistFeedback1, salesSpecialistFeedback2, caseCheckOpinion, afManagerCheckDesc } = pageInfo;
  const again = scCounts > 1;
  return (
    <Fragment>
      <Ones_Title title={`dm.grouptask.title.SalesCommunicationSpecialistFeedback${again ? "2" : "1"}`} />
      <Ones_Row col={{ lg: 24 }} wrapItem>
        <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled} placeholder={wordsFormat("dm.text.max50")} value={salesSpecialistFeedback1} />
      </Ones_Row>
      <Fragment>
        <Ones_Title title="dm.grouptask.title.NeedCaseCreatorExplain" />
        <Ones_Row col={{ lg: 24 }} wrapItem>
          <Ones_Textarea autosize={{ minRows: 3 }} disabled={disabled} value={caseCheckOpinion} placeholder={wordsFormat("dm.text.max1000")} />
        </Ones_Row>
      </Fragment>
    </Fragment>
  )
}

/* selfStatus 10 */
export const AfSpecialistInputsFinalOnes_Decision = ({ showPage, pageInfo, disabled }) => {
  // const show = pageInfo && showPage.includes(pageInfo.stepStatus) ? true : false;
  // if (!show) return null; 
  if (!Ones__Names.pagePermissionLimit.showAFSpecialistFinal.includes(getAuthority()[0])) return null;
  const { afFinalPunishment, afFinalBonus, afFinalBl, afFinalLoss, finalIdFraudCase, afFinalBonus4OperatorCase, afManagerCheckDesc } = pageInfo;

  return (
    <Fragment>
      <Ones_Title title="dm.grouptask.AF.specialist.final" />
      <Ones_Row row={{ gutter: 16 }} col={new Array(6).fill({ xxl: 6, xl: 8, lg: 12 })}>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishment"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={punishment} dataKey="valueCode" dataVal="valueDesc" value={afFinalPunishment || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeduction"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" value={afFinalBonus || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.AddintoBL"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={addIntoBL} dataKey="valueCode" dataVal="valueDesc" value={afFinalBl || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.LossCompensation"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={lossCompensation} dataKey="valueCode" dataVal="valueDesc" value={afFinalLoss || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.punishmentForOperator"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={punishmentID} dataKey="valueCode" dataVal="valueDesc" value={finalIdFraudCase || undefined} disabled={disabled} />
        </Ones_TextGroup>
        <Ones_TextGroup wrapItem title={`${"dm.grouptaskReview.AF.BonusDeductionforOperator"}`} col={Ones_TextGroupCol}>
          <Ones_Select data={bonusDeduction} dataKey="valueCode" dataVal="valueDesc" value={afFinalBonus4OperatorCase || undefined} disabled={disabled} />
        </Ones_TextGroup>
      </Ones_Row>
    </Fragment>
  )
}

/* selfStatus [11] */
export const BOAttachesEvidence = ({ showPage, pageInfo, disabled }) => {
  // const show = pageInfo && showPage.includes(pageInfo.stepStatus) ? true : false;
  // if (!show) return null;
  if (!Ones__Names.pagePermissionLimit.showCaseCreatorReplies.includes(getAuthority()[0])) return null;
  const { evidence } = pageInfo;
  return (
    <Fragment>
      <Ones_Title title="dm.grouptask.title.CaseCreatorReplies" />
      <Ones_Row col={{ lg: 24 }} wrapItem>
        <Ones_Textarea autosize={{ minRows: 3 }} value={evidence} disabled={disabled} placeholder={wordsFormat("dm.text.max1000")} />
      </Ones_Row>
    </Fragment>
  )
}

/* selfStatus [12] */
export const AfSpecialistAttachesEvidence = ({ showPage, pageInfo, disabled }) => {
  // const show = pageInfo && showPage.includes(pageInfo.stepStatus) ? true : false;
  // if (!show) return null;
  if (!Ones__Names.pagePermissionLimit.showOnes_EvidenceFeedback.includes(getAuthority()[0])) return null;
  const { caseCreatorReplies } = pageInfo;
  return (
    <Fragment>
      <Ones_Title title="dm.grouptask.title.Ones_EvidenceFeedback" />
      <Ones_Row col={{ lg: 24 }} wrapItem>
        <Ones_Textarea autosize={{ minRows: 3 }} value={caseCreatorReplies} disabled={disabled} placeholder={wordsFormat("dm.text.max1000")} />
      </Ones_Row>
    </Fragment>
  )
}

/* selfStatus [2, 3, 4, 6, 7] */
export const SimpleFlow = ({ showPage, pageInfo, disabled }) => {
  const show = pageInfo && showPage.includes(pageInfo.stepStatus) ? true : false;
  // if (!show) return null;
  const { needCaseExplain, SimpleFlowNeedCaseExplain, lastStep } = pageInfo;

  return (
    <Fragment>
      {
        needCaseExplain
          ?
          <Fragment>
            <Ones_Title noWordsFormat title={`${lastStep} ${wordsFormat("dm.grouptask.title.SimpleFlowReturnReason")}`} />
            <Ones_Textarea autosize={{ minRows: 3 }} disabled value={needCaseExplain} />
          </Fragment>
          :
          null
      }
      {
        SimpleFlowNeedCaseExplain
          ?
          <Ones_Row col={{ lg: 24 }} wrapItem>
            <Ones_Textarea autosize={{ minRows: 3 }} value={SimpleFlowNeedCaseExplain} placeholder={wordsFormat("dm.text.max50")} disabled={disabled} />
          </Ones_Row>
          : null
      }
    </Fragment>
  )
}
