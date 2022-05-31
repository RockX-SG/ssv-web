import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

    ProductQuestionsWrapper: {
        marginTop: 24,
    },
    SubHeaderWrapper: {
        gap: 8,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        paddingBottom: 30,
        color: theme.colors.gray80,
    },
    TextFieldWrapper: {
        marginBottom: 24,
    },
    ButtonsWrapper: {
      gap: 24,
    },
}));