import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import DarkModeSwitcher from '~app/common/components/AppBar/components/DarkModeSwitcher';
import ConnectWalletButton from '~app/common/components/AppBar/components/ConnectWalletButton';
import { useStyles } from './AppBar.styles';

const AppBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const wrapperRef = useRef(null);
    const buttonsRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [menuBar, openMenuBar] = useState(false);
    const [showMobileBar, setMobileBar] = useState(false);

    // Add event listener on screen size change
    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    useEffect(() => {
        if (width < 1200 && !showMobileBar) {
            setMobileBar(true);
        } else if (width >= 1200 && showMobileBar) {
            openMenuBar(false);
            setMobileBar(false);
        }
    }, [width]);

    useEffect(() => {
        /**
         * Close menu drop down when click outside
         */
        const handleClickOutside = (e: any) => {
            // @ts-ignore
            if (menuBar && wrapperRef.current && (!wrapperRef.current.contains(e.target) && !buttonsRef.current.contains(e.target))) {
                openMenuBar(false);
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, buttonsRef, menuBar]);

    return (
      <Grid container className={classes.AppBarWrapper}>
        <Grid item className={`${classes.AppBarIcon} ${width < 500 ? classes.SmallLogo : ''}`} onClick={() => { history.push('/'); }} />
        <Grid item className={classes.Wrapper}>
          <ConnectWalletButton />
        </Grid>
        {!showMobileBar && (
          <Grid item>
            <DarkModeSwitcher margin />
          </Grid>
        )}
      </Grid>
    );
};

export default observer(AppBar);
