import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './SsvAndSubTitle.styles';

type Props = {
    ssv: any,
    bold?: boolean,
    fade?: boolean,
    subText?: string,
    gray80?: boolean,
    subTextCenter?: boolean,
    leftTextAlign?: boolean,
};
const SsvAndSubTitle = (props: Props) => {
    const { ssv, subText, gray80, bold, fade, subTextCenter } = props;
    const classes = useStyles({ bold, gray80, fade });
    let textAlign: any = 'right';
    if (subTextCenter) {
        textAlign = 'center';
    } else if (props.leftTextAlign) {
        textAlign = 'left';
    }

    return (
      <Grid container item style={{ textAlign, flexDirection: 'column' }}>
        <Grid item xs className={classes.Balance}>{ssv} SSV</Grid>
        {subText && <Grid item className={classes.DollarBalance}>{subText}</Grid>}
      </Grid>
    );
};

export default SsvAndSubTitle;
