import React from 'react';
import { Col, Row, Form, Button, Modal } from 'react-bootstrap';
import FormInlineComponent from './FormInlineComponent';
import FormTwoInputsGroupComponent from './FormTwoInputsGroupComponent';
import { BET_STYLE_DATA } from '../utils/constants';

class CalculatorModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenCalculatorModal: false,
      modalBetAmount: '',
      modalMoneyLine: '',
      modalFractional: '',
      modalDecimal: '',
      modalImpliedProbability: '',
      modalWinnings: '',

      isOpenBetCalculatorModal: false,
      modalBetStyle1: '',
      modalBetStyle2: '',
      modalOddWinning1: '',
      modalOddWinning2: '',
      modalOddPush1: '',
      modalOddPush2: '',
      modalLine1: '',
      modalLine2: '',
      modalJuice1: '',
      modalJuice2: '',
      modalEV1: '',
      modalEV2: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.calc !== prevState.isOpenCalculatorModal) {
      return { isOpenCalculatorModal: nextProps.calc };
    } else {
      return null;
    }
  }

  closeCalculatorModal = () => {
    const { onChangeStatus } = this.props;
    onChangeStatus(false);
  };

  openCalculatorModal = () => {
    const { onChangeStatus } = this.props;
    onChangeStatus(true);
    this.setState({
      modalBetAmount: '',
      modalMoneyLine: '',
      modalFractional: '',
      modalDecimal: '',
      modalImpliedProbability: '',
      modalWinnings: ''
    });
  };

  switchCalculatorModal = () => {
    this.closeCalculatorModal();
    this.openBetCalculatorModal();
  };

  onCalclatorModalChangeInput = (key, e) => {
    this.setState({ [key]: e });
  };

  showCalculatorModal = () => {
    const {
      isOpenCalculatorModal,
      modalBetAmount,
      modalMoneyLine,
      modalFractional,
      modalDecimal,
      modalImpliedProbability,
      modalWinnings
    } = this.state;
    return (
      <Modal show={isOpenCalculatorModal} onHide={this.closeCalculatorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payoff Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FormInlineComponent
              data={{ type: 'text', title: 'Bet Amount:' }}
              stateId="modalBetAmount"
              value={modalBetAmount}
              onChange={this.onCalclatorModalChangeInput}
            />
            <FormInlineComponent
              data={{ type: 'text', title: 'Moneyline:' }}
              stateId="modalMoneyLine"
              value={modalMoneyLine}
              onChange={this.onCalclatorModalChangeInput}
            />
            <FormInlineComponent
              data={{ type: 'text', title: 'Fractional:' }}
              stateId="modalFractional"
              value={modalFractional}
              onChange={this.onCalclatorModalChangeInput}
            />
            <FormInlineComponent
              data={{ type: 'text', title: 'Decimal:' }}
              stateId="modalDecimal"
              value={modalDecimal}
              onChange={this.onCalclatorModalChangeInput}
            />
            <Form.Group>
              <Row>
                <Col md={6} sm={6}>
                  <Form.Label className="formLabel labelBold">
                    Implied Probability:
                  </Form.Label>
                </Col>
                <Col md={6} sm={6}>
                  <Form.Label className="formResult form-control">
                    {modalImpliedProbability}
                  </Form.Label>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={6} sm={6}>
                  <Form.Label className="formLabel labelBold">
                    Winnings:
                  </Form.Label>
                </Col>
                <Col md={6} sm={6}>
                  <Form.Label className="formResult form-control">
                    {modalWinnings}
                  </Form.Label>
                </Col>
              </Row>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={this.switchCalculatorModal}>
            Switch to Best Line Calculator
          </Button>
          <Button variant="primary" onClick={this.closeCalculatorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  closeBetCalculatorModal = () => {
    this.setState({ isOpenBetCalculatorModal: false });
  };

  openBetCalculatorModal = () => {
    this.setState({
      isOpenBetCalculatorModal: true,
      modalBetStyle1: '',
      modalBetStyle2: '',
      modalOddWinning1: '',
      modalOddWinning2: '',
      modalOddPush1: '',
      modalOddPush2: '',
      modalLine1: '',
      modalLine2: '',
      modalJuice1: '',
      modalJuice2: '',
      modalEV1: '',
      modalEV2: ''
    });
  };

  switchBetCalculatorModal = () => {
    this.openCalculatorModal();
    this.setState({ isOpenBetCalculatorModal: false });
  };

  onBetModalChangeInput = (key, e) => {
    this.setState({ [key]: e });
  };

  showBetCalculatorModal = () => {
    const {
      isOpenBetCalculatorModal,
      modalBetStyle1,
      modalBetStyle2,
      modalOddWinning1,
      modalOddWinning2,
      modalOddPush1,
      modalOddPush2,
      modalLine1,
      modalLine2,
      modalJuice1,
      modalJuice2,
      modalEV1,
      modalEV2
    } = this.state;
    return (
      <Modal
        show={isOpenBetCalculatorModal}
        onHide={this.closeBetCalculatorModal}
        className="betModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Best Line Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} />
            <Col md={4} className="betHeaderLabel">
              LINE 1
            </Col>
            <Col md={4} className="betHeaderLabel">
              LINE 2
            </Col>
          </Row>
          <FormTwoInputsGroupComponent
            data={BET_STYLE_DATA}
            stateId1="modalBetStyle1"
            stateId2="modalBetStyle2"
            value1={modalBetStyle1}
            value2={modalBetStyle2}
            onChange={this.onBetModalChangeInput}
          />
          <FormTwoInputsGroupComponent
            data={{ title: 'Odds of Winning %:', type: 'text' }}
            stateId1="modalOddWinning1"
            stateId2="modalOddWinning2"
            value1={modalOddWinning1}
            value2={modalOddWinning2}
            onChange={this.onBetModalChangeInput}
          />
          <FormTwoInputsGroupComponent
            data={{ title: 'Odds of Push %:', type: 'text' }}
            stateId1="modalOddPush1"
            stateId2="modalOddPush2"
            value1={modalOddPush1}
            value2={modalOddPush2}
            onChange={this.onBetModalChangeInput}
          />
          <FormTwoInputsGroupComponent
            data={{ title: 'Line:', type: 'text' }}
            stateId1="modalLine1"
            stateId2="modalLine2"
            value1={modalLine1}
            value2={modalLine2}
            onChange={this.onBetModalChangeInput}
          />
          <FormTwoInputsGroupComponent
            data={{ title: 'Juice %:', type: 'text' }}
            stateId1="modalJuice1"
            stateId2="modalJuice2"
            value1={modalJuice1}
            value2={modalJuice2}
            onChange={this.onBetModalChangeInput}
          />
          <Row>
            <Col md={4} sm={4}>
              <Form.Label className="formLabel">EV:</Form.Label>
            </Col>
            <Col md={4} sm={4}>
              <Form.Label className="formLabel form-control">
                {modalEV1}
              </Form.Label>
            </Col>
            <Col md={4} sm={4}>
              <Form.Label className="formLabel form-control">
                {modalEV2}
              </Form.Label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={this.switchBetCalculatorModal}>
            Switch to Payoff Calculator
          </Button>
          <Button variant="primary" onClick={this.closeBetCalculatorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        {this.showCalculatorModal()}
        {this.showBetCalculatorModal()}
      </div>
    );
  }
}

export default CalculatorModal;
