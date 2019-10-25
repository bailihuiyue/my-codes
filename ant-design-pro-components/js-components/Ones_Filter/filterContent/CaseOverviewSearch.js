import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Ones_TextGroup, Ones_Row, Ones_DatePicker} from '@/components/Ones_Components';
const dataFormat = "YYYY-MM-DD";
export default class CaseOverviewSearch extends PureComponent {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const rowCfg = { row: { gutter: 16 }, col: new Array(2).fill({ xxl: 6, xl: 8, lg: 12 }) };
    return (
      <Fragment>
        <Ones_Row {...rowCfg}>
          <Ones_TextGroup title="dm.formItem.dateFrom" rowStyle={{ margin: "20px 0" }}>
            {getFieldDecorator("dateFrom", {
              initialValue: moment().subtract(1, 'months')
            })(
              <Ones_DatePicker format={dataFormat} />
            )}
          </Ones_TextGroup>
          <Ones_TextGroup title="dm.formItem.dateTo" rowStyle={{ margin: "20px 0" }}>
            {getFieldDecorator("dateTo", {
              initialValue: moment()
            })(
              <Ones_DatePicker format={dataFormat} />
            )}
          </Ones_TextGroup>
        </Ones_Row>
      </Fragment>
    )
  }
}
