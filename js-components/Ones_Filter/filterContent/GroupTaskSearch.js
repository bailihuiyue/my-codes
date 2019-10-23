import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import moment from 'moment';
import { Ones_Button, Ones_TextGroup, Ones_Row, Ones_DatePicker, Ones_Input, Ones_Select } from '@/components/Ones_Components';
import { getDictionValues } from '@/utils/utils';

const dataFormat = "YYYY-MM-DD HH:mm:ss";

@connect(({ groupTask }) => ({
    groupTask
}))
export default class GroupTaskSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            region: [],
            oldProvinceSelected: []
        }
    }

    changeSelect = (type, value) => {
        const { dmDicVal } = getDictionValues();
        const { form: { getFieldValue, setFieldsValue } } = this.props;
        const { oldProvinceSelected } = this.state;
        let selectedRegions = getFieldValue("region");
        switch (type) {
            case "province":
                const regionsKeys = [...value];
                const regionArr = [];
                regionsKeys.forEach(item => {
                    dmDicVal[item] && regionArr.push(...dmDicVal[item])
                })

                if (value.length < oldProvinceSelected.length && selectedRegions) {
                    const deletedProvinceCode = _.difference(oldProvinceSelected, value);
                    const deletedRegionsArr = dmDicVal[deletedProvinceCode.join("")];
                    deletedRegionsArr.forEach(delRegion => {
                        if (selectedRegions.includes(delRegion.valueDesc)) {
                            selectedRegions = _.pull(selectedRegions, delRegion.valueDesc);
                        }
                    })
                    setFieldsValue({ region: selectedRegions });
                }

                this.setState({ region: regionArr, oldProvinceSelected: value });
                break;

            default:
                break;
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { clear, cleared } = nextProps;
        const { region } = prevState;
        if (clear) {
            cleared();
            return { region: [] };
        }
        return null;
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        const { region } = this.state;
        const rowCfg = { row: { gutter: 16 }, col: new Array(15).fill({ xxl: 6, xl: 8, lg: 12 }) };
        const { mainViolation, submissionEnty, discussion, violatorType, currentStep, punishment, status, province } = getDictionValues();
        const content = [
            {
                id: "dateFrom",
                element: <Ones_DatePicker showTime format={dataFormat} style={{ width: "100%" }} />
            },
            {
                id: "dateTo",
                element: <Ones_DatePicker showTime format={dataFormat} style={{ width: "100%" }} />
            },
            {
                id: "dmId",
                element: <Ones_Input />
            },
            {
                id: "violatorID",
                element: <Ones_Input />
            },
            {
                id: "violatorName",
                element: <Ones_Input />
            },
            {
                id: "violatorType",
                element: <Ones_Select
                    mode="tags"
                    data={violatorType}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "province",
                element: <Ones_Select
                    mode="tags"
                    data={province}
                    onChange={this.changeSelect.bind(this, "province")}
                    dataKey="valueCode"
                    dataVal="valueDesc"
                />
            },
            {
                id: "region",
                element: <Ones_Select
                    mode="tags"
                    data={region}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "mainViolation1",
                element: <Ones_Select
                    mode="tags"
                    data={mainViolation}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "punishment",
                element: <Ones_Select
                    mode="tags"
                    data={punishment}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "issue4Discussion",
                element: <Ones_Select
                    mode="tags"
                    data={discussion}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "submissionentity",
                element: <Ones_Select
                    mode="tags"
                    data={submissionEnty}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "status",
                element: <Ones_Select
                    mode="tags"
                    data={status}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "currentStep",
                element: <Ones_Select
                    mode="tags"
                    data={currentStep}
                    onChange={this.changeSelect}
                    dataKey="valueDesc"
                    dataVal="valueDesc"
                />
            },
            {
                id: "lastOperator",
                element: <Ones_Input />
            }
        ];
        return (
            <Fragment>
                <Ones_Row {...rowCfg}>
                    {content.map(item => {
                        return (
                            <Ones_TextGroup key={item.id} title={`dm.formItem.${item.id}`} rowStyle={{ margin: "2px 0" }}>
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






