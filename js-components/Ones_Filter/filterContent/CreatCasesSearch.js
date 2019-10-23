import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Ones_Button, Ones_TextGroup, Ones_Row, Ones_DatePicker, Ones_Input, Ones_Select } from '@/components/Ones_Components';

const dataFormat = "YYYY-MM-DD";

@connect(({ groupTask }) => ({
    groupTask
}))
export default class GroupTaskSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            region: [],
        }
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { region } = this.state;
        const rowCfg = { row: { gutter: 16 }, col: new Array(2).fill({ xxl: 6, xl: 8, lg: 12 }) };
        const content = [
            {
                id: "dateFrom",
                element: <Ones_DatePicker format={dataFormat} style={{ width: "100%" }} />
            },
            {
                id: "dateTo",
                element: <Ones_DatePicker format={dataFormat} style={{ width: "100%" }} />
            }
        ];
        return (
            <Fragment>
                <Ones_Row {...rowCfg}>
                    {content.map(item => {
                        return (
                            <Ones_TextGroup key={item.id} title={`dm.formItem.${item.id}`} smallMargin rowStyle={{ margin: "20px 0" }}>
                                {
                                    getFieldDecorator(item.id)(item.element)
                                }
                            </Ones_TextGroup>
                        )
                    })}
                </Ones_Row>
            </Fragment>
        )
    }
}






