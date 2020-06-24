import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import { Redirect, Link } from 'react-router-dom';
import HistoryIcon from '@material-ui/icons/History';




const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const History = ({ client }) => {
    const classes = useStyles();
    return (
        <Fragment>
            <br />
            <br />
            <br />
            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Client</StyledTableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>{client.name}</StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell>Registration No.</StyledTableCell>
                                    <StyledTableCell>{client.regNo}</StyledTableCell>
                                </TableRow>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>


            </TableContainer>



            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Payment</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Id</StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            client.model.map((mod) => (
                                mod.payments.map((pay) => (
                                    <StyledTableRow >
                                        <StyledTableCell>{pay.interest}</StyledTableCell>
                                        <StyledTableCell>{new Date(pay.currentDate).toDateString()}</StyledTableCell>
                                        <StyledTableCell>{pay.id}</StyledTableCell>

                                    </StyledTableRow>
                                ))
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

History.propTypes = {

}

const mapStateToProps = state => ({
    client: state.client.client
})

export default connect(mapStateToProps)(History)
