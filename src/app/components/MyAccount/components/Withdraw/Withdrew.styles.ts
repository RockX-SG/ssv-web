import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    FirstSquare: {
      marginBottom: theme.spacing(6),
    },
    currentBalance: {
        fontSize: 28,
        fontWeight: 800,
        lineHeight: 1.24,
        letterSpacing: -0.5,
        color: theme.colors.black,
        marginBottom: theme.spacing(1),
    },
    currentBalanceDollar: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
    BalanceWrapper: {
        height: 93,
        borderRadius: 8,
        margin: '8px 0 0',
        padding: theme.spacing(4, 5, 4, 5),
        backgroundColor: theme.colors.gray0,
        border: `solid 1px ${theme.colors.gray20}`,
    },
    MaxButtonWrapper: {
        justifyContent: 'right',
    },
    MaxButton: {
        width: 80,
        height: 36,
        fontSize: 16,
        borderRadius: 8,
        fontWeight: 600,
        lineHeight: 1.25,
        cursor: 'pointer',
        padding: '8px 22px 8px 23px',
        color: theme.colors.primaryBlue,
        backgroundColor: theme.colors.tint90,
    },
    Balance: {
        fontSize: 28,
        fontWeight: 500,
        lineHeight: 0.86,
        border: 'none !important',
        color: theme.colors.black,
        backgroundColor: theme.colors.gray0,
        '&:focus': {
            '-webkit-appearance': 'none',
            outline: 'none',
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            display: 'none',
        },
    },
    BalanceInput: {
        backgroundColor: 'transparent',
        fontSize: '28px',
        fontWeight: 500,
        lineHeight: '0.86',
        color: '#a1acbe',
        outline: 'none',
        '&:focus': {
            border: 'none !important',
            outline: 'none',
        },
    },
    MaxButtonText: {
        width: 52,
        height: 35,
        fontSize: 28,
        fontWeight: 500,
        lineHeight: 1.24,
        letterSpacing: -0.5,
        margin: theme.spacing(0, 0, 1, 5),
        color: theme.colors.black,
    },
    BalanceInputDollar: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.43,
        color: '#5b6c84',
        marginTop: '10px',
    },
    CheckboxWrapper: {
        width: '16px',
        height: '16px',
        padding: '2px',
        marginLeft: '11px',
        marginRight: '11px',
        border: '1px solid #5b6c84',
    },
    Checkbox: {
        backgroundColor: '#5b6c84',
        margin: 'auto',
        width: '10px',
        height: '10px',
    },
    Agreement: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.43,
        color: '#5b6c84',
    },
}));
