import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
// import { useTheme } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import LastPageIcon from '@material-ui/icons/LastPage';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useStyles } from '~app/common/components/DataTable/components/PaginationActions/PaginationAction.styles';
import IntegerInput from '~app/common/components/IntegerInput';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    totalPages: number;
    rowsPerPage: number;
    onChangeRowsPerPage?: any;
    // eslint-disable-next-line no-unused-vars
    onChangePage: (newPage: number) => void;
}

const PaginationActions = (props: TablePaginationActionsProps) => {
    const { count, page, rowsPerPage, totalPages, onChangePage, onChangeRowsPerPage } = props;
    const classes = useStyles({ firstPage: page === 1, lastPage: page === totalPages });
    const startAt = rowsPerPage * (page - 1) + 1;
    const [currentPage, setCurrentPage] = useState(page);
    const endAt = startAt + rowsPerPage - 1 > count ? count : startAt + rowsPerPage - 1;

    useEffect(() => {
        if (page !== currentPage) setCurrentPage(page);
    }, [page]);

    const handleFirstPageButtonClick = () => {
        if (page !== 1) onChangePage(1);
    };

    const handleBackButtonClick = () => {
        if (page !== 1) onChangePage(page - 1);
    };
    const handleNextButtonClick = () => {
        onChangePage(page + 1);
    };

    const handleLastPageButtonClick = () => {
        onChangePage(totalPages);
    };
    const handlePerPage = (event: any) => {
        const perPage = event.target.value;
        onChangeRowsPerPage(perPage);
    };

    const handleSetPage = (event: any) => {
        let desiredPage = event.target.value.trim();
        if (desiredPage > totalPages) desiredPage = totalPages;
        if (desiredPage < 1) desiredPage = 1;
        setCurrentPage(desiredPage);
    };
    const changePageNumber = (event: any) => {
        const desiredPage = event.target.value.trim();
        if (Number(desiredPage) !== page) onChangePage(desiredPage);
    };
    
    return (
      <Grid container className={classes.Root}>
        <Grid item className={classes.PageRangeText}>
          {startAt} - {endAt} of {count}
        </Grid>
        <Grid container item xs={9} spacing={1} style={{ marginLeft: 'auto' }}>
          <Grid container item className={classes.SelectFormWrapper} xs={5}>
            <Grid item className={classes.PageRangeText}>Rows per page:</Grid>
            <Grid item>
              <select defaultValue={rowsPerPage === 5 ? '5' : '10'} onChange={handlePerPage}>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </Grid>
          </Grid>
          <Grid container item xs justify={'space-between'}>
            <Grid item className={classes.LeftArrows} onClick={handleFirstPageButtonClick}>
              <Grid className={classes.ManyLeft} />
            </Grid>
            <Grid item className={classes.LeftArrows} onClick={handleBackButtonClick}>
              <Grid className={classes.SingleLeft} />
            </Grid>
          </Grid>
          <Grid container item xs={3} style={{ alignItems: 'center' }} justify={'space-around'}>
            <Grid item className={classes.PageNumber}>
              <IntegerInput
                value={currentPage}
                onChange={handleSetPage}
                className={classes.PageEditor}
                onBlur={changePageNumber}
              />
            </Grid>
            <Grid item>
              of {totalPages}
            </Grid>
          </Grid>
          <Grid container item xs justify={'space-between'}>
            <Grid item className={classes.RightArrows} onClick={handleNextButtonClick}>
              <Grid className={classes.SingleRight} />
            </Grid>
            <Grid item className={classes.RightArrows} onClick={handleLastPageButtonClick}>
              <Grid className={classes.ManyRight} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
};

export default PaginationActions;
