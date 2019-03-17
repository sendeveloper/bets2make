import React from 'react';
import { Col, Row, Form, Button, Modal } from 'react-bootstrap';
import FormInlineComponent from './FormInlineComponent';
import FormTwoInputsGroupComponent from './FormTwoInputsGroupComponent';
import { BET_STYLE_DATA } from '../utils/constants';
import { convertFloatToFraction, toDecimal, getEV } from '../utils/functions';

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
      return {
        isOpenCalculatorModal: nextProps.calc,
        modalBetAmount: '',
        modalMoneyLine: '',
        modalFractional: '',
        modalDecimal: '',
        modalImpliedProbability: '',
        modalWinnings: ''
      };
    } else {
      return null;
    }
  }

  refreshCalculation = () => {
    const { modalBetAmount, modalMoneyLine } = this.state;
    const betAmount = Number.parseFloat(modalBetAmount) || 0;
    const moneyline = Number.parseFloat(modalMoneyLine) || 0;
    let impProb = 0;
    let winnings = 0;
    this.setBackground('modalBetAmount', betAmount === 0);
    if (moneyline !== 0) {
      if (moneyline < 0) {
        impProb = Math.abs(moneyline) / (Math.abs(moneyline) + 100);
        winnings = betAmount / (Math.abs(moneyline) / 100);
      } else {
        impProb = 100 / (Math.abs(moneyline) + 100);
        winnings = betAmount * (Math.abs(moneyline) / 100);
      }
    }

    this.setState({
      modalWinnings: `$ ${winnings.toFixed(2)}`,
      modalImpliedProbability: `${(impProb * 100).toFixed(2)} %`
    });
  };

  onMoneyLineChange = () => {
    const { modalMoneyLine } = this.state;
    const moneyline = Number.parseFloat(modalMoneyLine) || 0;
    let decVal = 0;
    let fracVal = 0;
    if (moneyline !== 0) {
      this.setBackground('modalMoneyLine', false);
      if (moneyline < 0) {
        decVal = 100 / Math.abs(moneyline) + 1;
        fracVal = 100 / Math.abs(moneyline);
      } else {
        decVal = moneyline / 100 + 1;
        fracVal = moneyline / 100;
      }
    } else {
      this.setBackground('modalMoneyLine', true);
    }
    this.setState(
      {
        modalDecimal: decVal.toFixed(4),
        modalFractional: convertFloatToFraction(fracVal)
      },
      () => {
        this.refreshCalculation();
      }
    );
  };

  onFractionalChange = () => {
    const { modalFractional } = this.state;
    console.log('modalFractional', modalFractional);
    const fracVal = toDecimal(modalFractional);
    let decVal = 0;
    let mlVal = 0;
    if (fracVal > 0) {
      decVal = fracVal + 1;
      mlVal = 100 / fracVal;
      this.setBackground('modalFractional', false);
    } else {
      this.setBackground('modalFractional', true);
    }
    this.setState(
      {
        modalDecimal: decVal.toFixed(4),
        modalMoneyLine: mlVal.toFixed(0)
      },
      () => {
        this.refreshCalculation();
      }
    );
  };

  onDecimalChange = () => {
    const { modalDecimal } = this.state;
    const decVal = Number.parseFloat(modalDecimal) || 0;
    let mlVal = 0;
    let fracVal = 0;
    if (decVal > 1) {
      mlVal = 100 / (decVal - 1);
      fracVal = decVal - 1;
      this.setBackground('modalDecimal', false);
    } else {
      this.setBackground('modalDecimal', true);
    }
    this.setState(
      {
        modalMoneyLine: mlVal.toFixed(0),
        modalFractional: convertFloatToFraction(fracVal)
      },
      () => {
        this.refreshCalculation();
      }
    );
  };

  setBackground = (id, isIncorrect) => {
    console.log(id, isIncorrect);
    // if(text != txtBetAmount)
    // {
    //     txtDecimal.BackColor = txtImpProb.BackColor;
    //     txtFractional.BackColor = txtImpProb.BackColor;
    //     txtMoneyline.BackColor = txtImpProb.BackColor;
    // }

    // if(isIncorrect)
    //     text.BackColor = Color.FromArgb(255, 90, 64, 64);
    // else
    //     text.BackColor = txtImpProb.BackColor;
  };

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
    this.setState({ [key]: e }, () => {
      if (key === 'modalBetAmount') {
        this.refreshCalculation();
      } else if (key === 'modalMoneyLine') {
        this.onMoneyLineChange();
      } else if (key === 'modalFractional') {
        this.onFractionalChange();
      } else if (key === 'modalDecimal') {
        this.onDecimalChange();
      }
    });
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

  refreshCalculations = () => {
    // modalBetStyle1: '',
    // modalBetStyle2: '',
    // modalOddWinning1: '',
    // modalOddWinning2: '',
    // modalOddPush1: '',
    // modalOddPush2: '',
    // modalLine1: '',
    // modalLine2: '',
    // modalJuice1: '',
    // modalJuice2: '',
    // modalEV1: '',
    // modalEV2: ''
    const {
      modalBetStyle1,
      modalBetStyle2,
      modalOddWinning1,
      modalOddWinning2,
      modalOddPush1,
      modalOddPush2,
      modalLine1,
      modalLine2,
      modalJuice1,
      modalJuice2
    } = this.state;
    // txtJuice1.BackColor = txtOdds1.BackColor;
    // if (Utils.GetDecimalValueFromUserInput(txtJuice1.Text) <= 0 && cboStyle1.SelectedIndex == 1)
    //     txtJuice1.BackColor = Color.FromArgb(255, 90, 64, 64);
    // txtJuice2.BackColor = txtOdds1.BackColor;
    // if (Utils.GetDecimalValueFromUserInput(txtJuice2.Text) <= 0 && cboStyle2.SelectedIndex == 1)
    //     txtJuice2.BackColor = Color.FromArgb(255, 90, 64, 64);
    const ev1 = this.calcEV(
      modalBetStyle1,
      modalOddWinning1,
      modalOddPush1,
      modalLine1,
      modalJuice1
    );
    const ev2 = this.calcEV(
      modalBetStyle2,
      modalOddWinning2,
      modalOddPush2,
      modalLine2,
      modalJuice2
    );
    this.setState(
      {
        modalEV1: ev1.toFixed(2),
        modalEV2: ev2.toFixed(2)
      },
      () => {
        // txtEV1.ForeColor = txtJuice1.ForeColor;
        // txtEV2.ForeColor = txtJuice1.ForeColor;
        // txtEV1.BackColor = Color.FromArgb(255, 64, 64, 64);
        // txtEV2.BackColor = Color.FromArgb(255, 64, 64, 64);
        // if (ev1 > ev2)
        // {
        //     txtEV1.ForeColor = Color.Lime;
        //     txtEV1.BackColor = Color.FromArgb(255, 0, 64, 0);
        // }
        // else
        // {
        //     txtEV2.ForeColor = Color.Lime;
        //     txtEV2.BackColor = Color.FromArgb(255, 0, 64, 0);
        // }
      }
    );
  };

  calcEV = (style, oddsWin, oddsPush, line, juice) => {
    const valWin = (Number.parseFloat(oddsWin) || 0) / 100;
    const valPush = (Number.parseFloat(oddsPush) || 0) / 100;
    const valLine = Number.parseFloat(line) || 0;
    const valJuice = -((Number.parseFloat(juice) || 0) + 100);
    if (valJuice >= -100 && style === 1) {
      return 0;
    }
    if (valLine === 0 && style === 0) {
      return 0;
    }
    return getEV(
      style === 0 ? 'moneyline' : 'spread',
      valLine,
      valWin,
      valJuice,
      valPush
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
    this.refreshCalculations();
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
              <Form.Label className="formLabel form-control labelEV">
                {modalEV1}
              </Form.Label>
            </Col>
            <Col md={4} sm={4}>
              <Form.Label className="formLabel form-control labelEV">
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
