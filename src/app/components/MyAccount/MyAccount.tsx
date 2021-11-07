import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { useStores } from '~app/hooks/useStores';
import SsvStore from '~app/common/stores/Ssv.store';
import DataTable from '~app/common/components/DataTable';
import MyBalance from '~app/components/MyAccount/components/MyBalance';
import { useStyles } from './MyAccount.styles';

const validatorHeaderInit = ['PUBLIC KEY', 'STATUS', 'BALANCE', 'EST. APR', ''];
const operatorHeaderInit = ['PUBLIC KEY', 'STATUS', 'REVENUE', 'VALIDATORS', ''];

const MyAccount = () => {
    const classes = useStyles();
    const stores = useStores();
    const allowanceStore: SsvStore = stores.Allowance;
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakPoints = [
        { width: 768, operatorHeader: ['PUBLIC KEY', 'BALANCE', 'EST. APR', ''], validatorHeaders: ['PUBLIC KEY', 'REVENUE', 'VALIDATORS', ''] },
        { width: 499, operatorHeader: ['PUBLIC KEY', 'REVENUE'], validatorHeaders: ['PUBLIC KEY', 'BALANCE'] },
    ];
    const [validatorsHeader, setValidatorHeader] = useState(validatorHeaderInit);
    const [operatorsHeader, setOperatorHeader] = useState(operatorHeaderInit);

    React.useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
           the "width" state variable when the window size changes */
        window.addEventListener('resize', () => setWidth(window.innerWidth));

        /* passing an empty array as the dependencies of the effect will cause this
           effect to only run when the component mounts, and not each time it updates.
           We only want the listener to be added once */
    }, [allowanceStore]);
    
    React.useEffect(() => {
        let isBigScreen = true;
        breakPoints.forEach((breakPoint) => {
            if (breakPoint.width > width) {
                isBigScreen = false;
                setOperatorHeader(breakPoint.operatorHeader);
                setValidatorHeader(breakPoint.validatorHeaders);
            }
        });
        if (isBigScreen && validatorsHeader.length < 5 && operatorsHeader.length < 5) {
            setValidatorHeader(validatorHeaderInit);
            setOperatorHeader(operatorHeaderInit);
        }
    }, [width]);

    return (
      <Grid container className={classes.Wrapper}>
        {/* <Grid onClick={() => { allowanceStore.checkAllowance(); }}>asdlkasndajndjkasdnjaksnd</Grid> */}
        <Grid container item xs={12} className={classes.Header}>
          <Grid item xs={6}>
            <span className={classes.HeaderText}>
              My Account
            </span>
          </Grid>
          <Grid item xs={6}>
            <button className={classes.AddButton}>
              <span className={classes.AddButtonText}>+ Add</span>
            </button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item className={classes.MyBalanceWrapper}>
            <MyBalance />
          </Grid>
          <Grid container item direction={'column'} className={classes.TablesWrapper}>
            <Grid item className={classes.Table}>
              <DataTable
                title={'Operators'}
                headers={operatorsHeader}
                headersPositions={['left', 'left', 'left', 'left']}
                data={[{}, {}, {}, {}, {}]}
                totalCount={100}
                page={1}
                onChangePage={() => {}}
                isLoading
              />
            </Grid>
            <Grid className={classes.Table}>
              <DataTable
                title={'Validators'}
                headers={validatorsHeader}
                headersPositions={['left', 'left', 'left', 'left']}
                data={[{}, {}, {}, {}, {}]}
                totalCount={100}
                page={1}
                onChangePage={() => {}}
                isLoading
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
};

export default observer(MyAccount);