import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import { Ones_Select, Ones_Input } from '@/components/Ones_Components';
import { wordsFormat } from '@/utils/publicWord';

export default class Ones_CreateSingleSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: "userName",
            input: ""
        }
    }

    getValues = () => {
        const { getValues } = this.props;
        return getValues && getValues(this.state);
    }

    resetValues = () => {
        this.setState({ select: "userName", input: "" });
    }

    changeSelect = value => {
        const { getValues } = this.props;
        this.setState({ select: value }, () => getValues && getValues(this.state));
    }

    changeInput = e => {
        this.setState({ input: e.target.value });
    }

    componentWillReceiveProps(nexpProps) {
        const { resetValue, hasReset, salesId, salesType, needUpdateCreateSingleSearch } = nexpProps;
        const { resetValue: oldResetValue } = this.props;
        if (resetValue !== oldResetValue && resetValue) {
            resetValue && this.resetValues()
            hasReset()
        }
        if ((salesId !== this.state.input) && salesId && needUpdateCreateSingleSearch) {
            this.setState({ input: salesId, select: salesType === 1 ? "userName" : "posId" });
        }
    }

    render() {
        const { select, input } = this.state;
        const { readonly, salesType } = this.props;
        const text = salesType == 1 ? "SALE ID" : "POS ID";
        const selectData = [{ id: "userName", value: "Sales ID" }, { id: "posId", value: "POS ID" }];
        return (
            <Fragment>
                {
                    readonly ?
                        <Row gutter={16}>
                            <Col span={8} style={{ textAlign: "right" }}>
                                {text}
                            </Col>
                            <Col span={16}>
                                {input}
                            </Col>
                        </Row> :
                        <Row gutter={16}>
                            <Col span={8}>
                                <Ones_Select
                                    data={selectData}
                                    onChange={this.changeSelect}
                                    value={select}
                                    style={{ marginRight: "5px" }}
                                    dataKey="id"
                                    dataVal="value"
                                />
                            </Col>
                            <Col span={16}>
                                <Ones_Input
                                    onBlur={this.getValues}
                                    onChange={this.changeInput}
                                    value={input}
                                    placeholder={wordsFormat('dm.input.placeholder')}
                                />
                            </Col>
                        </Row>
                }
            </Fragment>
        )
    }
}
