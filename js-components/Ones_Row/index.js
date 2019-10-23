import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';

const { Item } = Form;

export default class Ones_Row extends PureComponent {
    static propTypes = {
        row: PropTypes.object,
        col: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };

    static defaultProps = {
        row: {
            gutter: 16
        },
        col: {
            lg: 8
        }
    };

    render() {
        const { row, col, wrapItem, children, ...rest } = this.props;
        return (
            <Row {...row} {...rest}>
                {
                    children && children.length > 0 ?
                        children.map((item, index) => {
                            return <Col {...col[index]} key={index}>
                                {
                                    wrapItem ?
                                        <Item>{item}</Item>
                                        :
                                        item
                                }
                            </Col>
                        }
                        )
                        :
                        <Col {...col}>
                            {
                                wrapItem ?
                                    <Item>{children}</Item>
                                    :
                                    children
                            }
                        </Col>
                }
            </Row>
        )
    }
}
