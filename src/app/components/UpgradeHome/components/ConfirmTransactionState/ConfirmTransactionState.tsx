import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStores } from '~app/hooks/useStores';
import ProgressStepper from '~app/common/components/ProgressStepper';
import NotificationsStore from '~app/common/stores/Notifications.store';
import UpgradeStore, { UpgradeSteps } from '~app/common/stores/Upgrade.store';
import { ActionButton } from '~app/components/UpgradeHome/components/ConversionState/ConversionState';
import { useStyles } from '~app/components/UpgradeHome/components/ConversionState/ConversionState.styles';

const ConfirmTransactionInfoRow = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  color: #5B6C84;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ConfirmTransactionInfoLabel = styled.div`
  margin-left: 0;
  margin-right: auto;
`;

const ConfirmTransactionInfo = styled.div`
  margin-right: 0;
  margin-left: auto;
`;

const CustomCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: #5B6C84;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0;

  & > ${ActionButton} {
    width: calc(50% - 15px);

    &:first-child {
      margin-left: 0;
      margin-right: 15px;
    }

    &:last-child {
      margin-left: auto;
      margin-right: 0;
    }
  }
`;

const ApprovingProgress = styled(CircularProgress)`
  color: #5B6C84;
  position: absolute;
  right: 20px;
`;

const ConfirmTransactionState = () => {
  const classes = useStyles();
  const stores = useStores();
  const upgradeStore: UpgradeStore = stores.Upgrade;
  const notificationsStore: NotificationsStore = stores.Notifications;

  // Process states
  const [approving, setApproving] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [allowanceApproved, setAllowanceApproved] = useState(false);
  const [estimationValue, setEstimationValue] = useState('0.0');

  // Button states
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [approveButtonDisabled, setApproveButtonDisabled] = useState(true);
  const [twoStepsUpgradeButtonDisabled, setTwoStepsUpgradeButtonDisabled] = useState(true);
  const [oneStepUpgradeButtonDisabled, setOneStepUpgradeButtonDisabled] = useState(true);

  const onCheckboxChange = (event: any) => {
    setCheckboxChecked(event.target.checked);
  };

  const navigateToDisclaimer = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    upgradeStore.setStep(UpgradeSteps.disclaimer);
  };

  /**
   * Call approve allowance with estimation or in real.
   * @param estimate
   */
  const approveAllowance = (estimate: boolean = false) => {
    if (!estimate) {
      setApproving(true);
    }
    return upgradeStore.approveAllowance(undefined, estimate).then((estimation: number) => {
      if (!estimate) {
        setAllowanceApproved(true);
      }
      return estimation;
    }).catch((error: any) => {
      if (!estimate) {
        console.error('Approving allowance error:', error);
        notificationsStore.showMessage(error.message, 'error');
        setAllowanceApproved(false);
      }
    }).finally(() => {
      if (!estimate) {
        setApproving(false);
      }
    });
  };

  /**
   * Upgrade CDT to SSV - estimation and real modes.
   * @param estimate
   */
  const upgradeCdtToSsv = (estimate: boolean = false) => {
    if (!estimate) {
      setUpgrading(true);
    }
    return upgradeStore.convertCdtToSsv(estimate).then((result: any) => {
      if (!estimate) {
        console.debug('Conversion result:', result);
        setUpgraded(true);
        upgradeStore.setStep(UpgradeSteps.upgradeSuccess);
      }
      return result;
    }).catch((error: any) => {
      console.error('Upgrading Error:', error);
      if (!estimate) {
        notificationsStore.showMessage(error.message, 'error');
      }
    }).finally(() => {
      if (!estimate) {
        setUpgrading(false);
      }
    });
  };

  const renderApproveButtonText = (props: { approving: boolean, approved: boolean }) => {
    // eslint-disable-next-line react/prop-types
    if (props.approved) {
      return 'Approved';
    }
    // eslint-disable-next-line react/prop-types
    if (props.approving) {
      return (
        <>
          Approving... <ApprovingProgress size={20} />
        </>
      );
    }
    return 'Approve';
  };

  const renderUpgradeButtonText = (props: { upgrading: boolean, upgraded: boolean }) => {
    // eslint-disable-next-line react/prop-types
    if (props.upgraded) {
      return 'Upgraded';
    }
    // eslint-disable-next-line react/prop-types
    if (props.upgrading) {
      return (
        <>
          Upgrading... <ApprovingProgress size={20} />
        </>
      );
    }
    return 'Upgrade';
  };

  // Allowance effect
  useEffect(() => {
    if (upgradeStore.approvedAllowance === null) {
      upgradeStore.checkAllowance().then((allowance: any) => {
        console.debug('Allowance value:', allowance);
      });
      let finalEstimation = 0.0;
      upgradeCdtToSsv(true).then((exchangeEstimation: any) => {
        if (!Number.isNaN(parseFloat(String(exchangeEstimation)))) {
          finalEstimation += parseFloat(String(exchangeEstimation));
          console.debug('Upgrade CDT to SSV estimation:', finalEstimation, 'ETH');
        }
      }).finally(() => {
        approveAllowance(true).then((allowanceEstimation: any) => {
          if (!Number.isNaN(parseFloat(String(allowanceEstimation)))) {
            finalEstimation += parseFloat(String(allowanceEstimation));
            console.debug('Allowance Estimation:', parseFloat(String(allowanceEstimation)), 'ETH');
          }
        }).finally(() => {
          setEstimationValue(finalEstimation.toFixed(18));
          console.debug('Final Estimation:', finalEstimation.toFixed(18));
        });
      });
    }
  }, [upgradeStore.approvedAllowance]);

  // Buttons states
  useEffect(() => {
    setApproveButtonDisabled(!checkboxChecked || allowanceApproved || approving);
    setTwoStepsUpgradeButtonDisabled(!allowanceApproved || !checkboxChecked || upgraded || upgrading);
    setOneStepUpgradeButtonDisabled(!checkboxChecked || upgraded || upgrading);
  }, [checkboxChecked, allowanceApproved, approving, upgraded, upgrading]);

  return (
    <Grid container spacing={0} justify="center" className={classes.root}>
      <Grid item xs={12} md={12} lg={12}>
        <ConfirmTransactionInfoRow>
          <ConfirmTransactionInfoLabel>From</ConfirmTransactionInfoLabel>
          <ConfirmTransactionInfo>{upgradeStore.cdtValue} CDT</ConfirmTransactionInfo>
        </ConfirmTransactionInfoRow>

        <ConfirmTransactionInfoRow>
          <ConfirmTransactionInfoLabel>To</ConfirmTransactionInfoLabel>
          <ConfirmTransactionInfo>{upgradeStore.ssvValue} SSV</ConfirmTransactionInfo>
        </ConfirmTransactionInfoRow>

        <ConfirmTransactionInfoRow>
          <ConfirmTransactionInfoLabel>Rate</ConfirmTransactionInfoLabel>
          <ConfirmTransactionInfo>1 CDT = 0.01 SSV</ConfirmTransactionInfo>
        </ConfirmTransactionInfoRow>

        <ConfirmTransactionInfoRow>
          <ConfirmTransactionInfoLabel>Transaction fee</ConfirmTransactionInfoLabel>
          <ConfirmTransactionInfo>{estimationValue} ETH</ConfirmTransactionInfo>
        </ConfirmTransactionInfoRow>

        <ConfirmTransactionInfoRow style={{ padding: 20 }} />

        <InputLabel style={{ width: '100%' }}>
          <CustomCheckbox
            checked={checkboxChecked}
            onChange={onCheckboxChange}
            color="primary"
            style={{ padding: 0, marginRight: 10 }}
            disabled={upgrading || approving}
          />
          I acknowledge that I read and understood the upgrade <a href="/" onClick={navigateToDisclaimer}>disclaimer</a>
        </InputLabel>
        <ConfirmTransactionInfoRow style={{ padding: 5 }} />

        {upgradeStore.approvedAllowance !== null ? (
          <>
            {!upgradeStore.approvedAllowance ? (
              <>
                <ActionButtonsContainer>
                  <ActionButton
                    disabled={approveButtonDisabled}
                    onClick={() => approveAllowance()}
                  >
                    {renderApproveButtonText({ approving, approved: allowanceApproved })}
                  </ActionButton>
                  <ActionButton
                    disabled={twoStepsUpgradeButtonDisabled}
                    onClick={() => upgradeCdtToSsv()}
                  >
                    {renderUpgradeButtonText({ upgrading, upgraded })}
                  </ActionButton>
                </ActionButtonsContainer>

                <ProgressStepper
                  step={!allowanceApproved ? 1 : 2}
                  steps={2}
                  done={upgraded}
                />
              </>
            ) : (
              <ActionButton
                disabled={oneStepUpgradeButtonDisabled}
                onClick={() => upgradeCdtToSsv()}
              >
                {renderUpgradeButtonText({ upgrading, upgraded })}
              </ActionButton>
            )}
          </>
        ) : ''}
      </Grid>
    </Grid>
  );
};

export default observer(ConfirmTransactionState);