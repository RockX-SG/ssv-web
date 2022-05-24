import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import Operator from '~lib/api/Operator';
import { useStores } from '~app/hooks/useStores';
import SsvAndSubTitle from '~app/common/components/SsvAndSubTitle';
import { formatNumberToUi, multiplyNumber } from '~lib/utils/numbers';
import WalletStore from '~app/common/stores/applications/SsvWeb/Wallet.store';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import BorderScreen from '~app/components/MyAccount/common/componenets/BorderScreen';
import PrimaryButton from '~app/common/components/Button/PrimaryButton/PrimaryButton';
import ApplicationStore from '~app/common/stores/applications/SsvWeb/Application.store';
import ReactStepper from '~app/components/MyAccount/components/UpdateFee/components/Stepper';
import { useStyles } from './index.styles';

const FeeUpdated = () => {
    const stores = useStores();
    // @ts-ignore
    const { operator_id } = useParams();
    const [operator, setOperator] = useState(null);
    const walletStore: WalletStore = stores.Wallet;
    const operatorStore: OperatorStore = stores.Operator;
    const applicationStore: ApplicationStore = stores.Application;

    useEffect(() => {
        applicationStore.setIsLoading(true);
        Operator.getInstance().getOperator(operator_id).then((response: any) => {
            if (response) {
                setOperator(response);
                applicationStore.setIsLoading(false);
            }
        });
    }, []);

    // @ts-ignore
    const classes = useStyles({ lastStep: true });

    if (!operator) return null;

    // @ts-ignore
    const currentOperatorFee = formatNumberToUi(multiplyNumber(walletStore.fromWei(operatorStore.operatorCurrentFee), config.GLOBAL_VARIABLE.BLOCKS_PER_YEAR));
    // @ts-ignore
    const operatorFutureFee = formatNumberToUi(multiplyNumber(walletStore.fromWei(operatorStore.operatorFutureFee), config.GLOBAL_VARIABLE.BLOCKS_PER_YEAR));

    return (
      <BorderScreen
        blackHeader
        withoutNavigation
        body={[
          <Grid container item>
            <Grid container item className={classes.HeaderWrapper}>
              <Grid item>
                <Typography className={classes.Title}>Update Fee</Typography>
              </Grid>
              <Grid item className={classes.Step}>
                Success
              </Grid>
            </Grid>
            <ReactStepper step={3} subTextAlign={'center'} />
            <Grid item container className={classes.TextWrapper}>
              <Grid item>
                <Typography>You have successfully updated your fee. The new fee will take effect immediately.</Typography>
              </Grid>
            </Grid>
            <Grid item container className={classes.FeesChangeWrapper}>
              <Grid item>
                <SsvAndSubTitle bold leftTextAlign ssv={currentOperatorFee} subText={'~$78.56'} />
              </Grid>
              <Grid item className={classes.Arrow} />
              <Grid item>
                <SsvAndSubTitle bold leftTextAlign ssv={operatorFutureFee} subText={'~$98.56'} />
              </Grid>
            </Grid>
            <Grid item container className={classes.ButtonsWrapper}>
              <PrimaryButton disable={false} text={'Back to My Account'} submitFunction={console.log} />
            </Grid>
          </Grid>,
        ]}
      />
    );
};

export default observer(FeeUpdated);