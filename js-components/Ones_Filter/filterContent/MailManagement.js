import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { wordsFormat } from '@/utils/publicWord';
import { Ones_Button, Ones_TextGroup, Ones_Row, Ones_DatePicker, Ones_Input, Ones_Select } from '@/components/Ones_Components';

const dataFormat = "YYYY-MM-DD";

@connect(({ groupTask }) => ({
  groupTask
}))
export default class MailManagement extends PureComponent {

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const rowCfg = { row: { gutter: 16 }, col: new Array(6).fill({ xxl: 6, xl: 8, lg: 12 }) };
    const content = [
      {
        id: "dateFrom",initialValue:moment(),
        element: <Ones_DatePicker format={dataFormat} style={{ width: "100%" }} />
      },
      {
        id: "dateTo",initialValue:moment().add(7, 'days'),
        element: <Ones_DatePicker format={dataFormat} style={{ width: "100%" }} />
      },
      {
        id: "exceptionReason",
        element: <Ones_Select
          data={[{ KeyDesc: "1",valueDesc:wordsFormat('dm.formItem.exceptionReasonSuccess')},{ KeyDesc: "0",valueDesc:wordsFormat('dm.formItem.exceptionReasonFail')}]}
          dataKey="KeyDesc"
          dataVal="valueDesc"
        />
      },
      {
        id: "mailInformation",
        element: <Ones_Input />
      },
      {
        id: "addressee",
        element: <Ones_Input />
      }
    ];
    return (
      <Fragment>
        <Ones_Row {...rowCfg}>
          {content.map(item => {
            let diyInitialValue = {};
            item.id=='dateFrom'||item.id=='dateTo'?diyInitialValue.initialValue = item.initialValue:diyInitialValue = {};
            return (
              <Ones_TextGroup key={item.id} title={`dm.formItem.${item.id}`} rowStyle={{ margin: "5px 0" }}>
                {
                   getFieldDecorator(item.id,diyInitialValue)(item.element)
                }
              </Ones_TextGroup>
            )
          })}
        </Ones_Row>
      </Fragment>
    )
  }

}
