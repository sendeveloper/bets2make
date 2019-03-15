import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

class FormTwoInputsGroupComponent extends React.Component {
  render() {
    const { data, onChange, stateId1, value1, stateId2, value2 } = this.props;
    return (
      <Form.Group>
        <Row>
          <Col md={4} sm={4}>
            <Form.Label className="formLabel">{data.title}</Form.Label>
          </Col>
          <Col md={4} sm={4}>
            {data.type === 'text' && (
              <Form.Control
                type="text"
                className="formControl"
                onChange={e => onChange(stateId1, e.currentTarget.value)}
                value={value1}
              />
            )}
            {data.type === 'select' && (
              <Form.Control
                as={data.type}
                className="formControl"
                onChange={e => onChange(stateId1, e.currentTarget.value)}
                value={value1}
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
          <Col md={4} sm={4}>
            {data.type === 'text' && (
              <Form.Control
                type="text"
                className="formControl"
                onChange={e => onChange(stateId2, e.currentTarget.value)}
                value={value2}
              />
            )}
            {data.type === 'select' && (
              <Form.Control
                as={data.type}
                className="formControl"
                onChange={e => onChange(stateId2, e.currentTarget.value)}
                value={value2}
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

export default FormTwoInputsGroupComponent;
