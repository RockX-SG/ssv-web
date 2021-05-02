import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useStores } from '~app/hooks/useStores';
import Header from '~app/common/components/Header';
import SSVStore from '~app/common/stores/SSV.store';
import config, { translations } from '~app/common/config';
import TextInput from '~app/common/components/TextInput';
import InputLabel from '~app/common/components/InputLabel';
import { useStyles } from '~app/components/Home/Home.styles';
import BackNavigation from '~app/common/components/BackNavigation';

// TODO:
//  1. Create SSVStore to keep validator private key during the process
//  2. Cleanup SSVStore once the process is finished or route changed to other flows
//  3. Use SSVStore on further steps
const EnterValidatorPrivateKey = () => {
  const classes = useStyles();
  const history = useHistory();
  const stores = useStores();
  const ssv: SSVStore = stores.ssv;
  const registerButtonStyle = { width: '100%', marginTop: 30 };
  const [inputsData, setInputsData] = useState({ validatorPrivateKey: '' });
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

  // Inputs validation
  // TODO: add validation of proper formats
  useEffect(() => {
    setNextButtonEnabled(!!inputsData.validatorPrivateKey);
    return () => {
      setNextButtonEnabled(false);
    };
  }, [inputsData]);

  const onInputChange = (name: string, value: string) => {
    setInputsData({ ...inputsData, [name]: value });
  };

  const goToSelectOperators = () => {
    ssv.setValidatorPrivateKey(inputsData.validatorPrivateKey);
    history.push(config.routes.VALIDATOR.SELECT_OPERATORS);
  };

  return (
    <Paper className={classes.mainContainer}>
      <BackNavigation to={config.routes.OPERATOR.HOME} text="Join SSV Network" />
      <Header title={translations.VALIDATOR.ENTER_KEY.TITLE} subtitle={translations.VALIDATOR.ENTER_KEY.DESCRIPTION} />

      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        <Grid item xs zeroMinWidth className={classes.gridContainer}>
          <br />
          <br />
          <InputLabel title="Validator Private key">
            <TextInput type="text" onChange={(event) => { onInputChange('validatorPrivateKey', event.target.value); }} />
          </InputLabel>

          <Button
            disabled={!nextButtonEnabled}
            variant="contained"
            color="primary"
            style={registerButtonStyle}
            onClick={goToSelectOperators}
          >
            Next
          </Button>
          <Typography style={{ textAlign: 'center', fontSize: 12, marginTop: 30 }}>I don’t have a validator key</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(EnterValidatorPrivateKey);
