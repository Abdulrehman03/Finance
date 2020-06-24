import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getClients, paymentData,history } from '../../actions/client'
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

let clientsLoaded = false;

const AllClients = ({ getClients, allClients, paymentData ,history}) => {


    // useEffect(() => {
    if (!clientsLoaded) {
        getClients();
        clientsLoaded = true;
    }

    // })

    const hist = (client) => {

        history(client)

    }
    
    
    
    const onClick = (c, client) => {
        paymentData(c, client)
    }
    
    var today = new Date();
    const classes = useStyles();
    return (
        <Fragment>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Registration No.</StyledTableCell>
                            <StyledTableCell align="right">Investment</StyledTableCell>
                            <StyledTableCell align="left">Plan / Installments</StyledTableCell>
                            <StyledTableCell align="right">Interest</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">History</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {/* {client.plan.join(" ,")} */}
                    <TableBody>
                        {allClients.map((client) => (
                            <StyledTableRow key={client.regNo}>
                                <StyledTableCell component="th" scope="row">
                                    {client.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{client.regNo}</StyledTableCell>
                                <StyledTableCell align="right">{client.investment}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <TableHead>
                                        <TableRow >
                                            <StyledTableCell align="right">Plan</StyledTableCell>
                                            <StyledTableCell align="right">Installments</StyledTableCell>


                                        </TableRow>
                                    </TableHead>
                                    {
                                        client.model.map((c) => (
                                            <TableBody>
                                                <StyledTableCell align="right">{c.plan}</StyledTableCell> <StyledTableCell align="right">{new Date(c.installmentDate).toDateString()}</StyledTableCell>
                                                <StyledTableCell align="right">{+today >= +new Date(c.installmentDate) && <Link to="/main/pay"><ReportProblemIcon onClick={e => onClick(c, client)} /></Link>}</StyledTableCell>

                                            </TableBody>
                                        ))
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">{client.interest}</StyledTableCell>
                                <StyledTableCell align="right" >{new Date(client.date).toDateString()}</StyledTableCell>
                                <StyledTableCell align="right" ><Link to="/main/history"><HistoryIcon onClick={e => hist(client)} /></Link></StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

AllClients.propTypes = {
    getClients: PropTypes.func.isRequired,
    allClients: PropTypes.array.isRequired,
    history:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    allClients: state.client.allClients
})

export default connect(mapStateToProps, { getClients, paymentData ,history})(AllClients)


