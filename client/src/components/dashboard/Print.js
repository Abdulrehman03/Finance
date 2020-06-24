import React, { useEffect } from 'react'
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
import Container from '@material-ui/core/Container';



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



const Print = ({ paymentData, paymentMethod ,chequeNo}) => {
    useEffect(() => {
        window.print()
    }, [])

    const classes = useStyles();

    return (

        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" colSpan={3}>Finance Company</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <div className="date">
                        <b>Date : </b><span> {new Date().toDateString()}</span>
                    </div>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell >
                                <StyledTableRow>
                                    <StyledTableCell><b>Name</b></StyledTableCell>
                                    <StyledTableCell>{paymentData.client.name}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell><b>Registration Number</b></StyledTableCell>
                                    <StyledTableCell>{paymentData.client.regNo}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell><b>Plan</b></StyledTableCell>
                                    <StyledTableCell>{paymentData.data.plan}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell><b>Interest</b></StyledTableCell>
                                    <StyledTableCell>{paymentData.client.interest}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell><b>Payment Method</b></StyledTableCell>
                                    <StyledTableCell>{paymentMethod}{paymentMethod == "CHEQUE" && <span> ( #{chequeNo} )</span>}</StyledTableCell>
                                </StyledTableRow>


                            </StyledTableCell>
                            <TableCell><span></span></TableCell>
                            <TableCell>
                                <span><b>_____________________</b></span>
                            </TableCell>
                        </StyledTableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>


    )
}

Print.propTypes = {

}
const mapStateToProps = state => ({
    paymentData: state.client.paymentData,
    paymentMethod: state.client.paymentMethod,
    chequeNo:state.client.chequeNo
})

export default connect(mapStateToProps)(Print)
