import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class FormInlineComponent extends React.Component {
  numberFormat = e => {
    const { data } = this.props;
    const upper = data.type === 'hex' ? 16 : 10;
    return parseInt(e, 10)
      .toString(upper)
      .toUpperCase();
  };

  render() {
    const { data, onChange, stateId, value } = this.props;
    return (
      <Form.Group>
        <Row>
          <Col md={6} sm={6}>
            <Form.Label className="formLabel">{data.title}</Form.Label>
          </Col>
          <Col md={6} sm={6}>
            {(data.type === 'number' || data.type === 'hex') && (
              <NumericInput
                className="formNumberControl"
                max={data.data.max}
                min={data.data.min}
                value={value}
                onChange={e => onChange(stateId, e)}
                style={{
                  wrap: {
                    height: 38,
                    width: '100%'
                  },
                  input: {
                    height: 38,
                    padding: 4,
                    width: '100%'
                  }
                }}
                format={e => this.numberFormat(e)}
              />
            )}
            {data.type === 'date' && (
              <DatePicker
                className="formatDateControl"
                selected={value}
                onChange={e => onChange(stateId, e)}
              />
            )}
            {data.type === 'select' && (
              <Form.Control
                as={data.type}
                className="formControl"
                onChange={e => onChange(stateId, e.currentTarget.value)}
                value={value}
              >
                {data.type === 'select' &&
                  data.data.map(each => (
                    <option key={each.key} value={each.key}>
                      {each.value}
                    </option>
                  ))}
              </Form.Control>
            )}
          </Col>
        </Row>
      </Form.Group>
    );
  }
}

export default FormInlineComponent;
