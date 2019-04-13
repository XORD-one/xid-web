import React from "react";
import axios from "axios";
import uuid from '../../variables/general';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
// const arr = [
//   ["1", "42201-34234483-9", "Pending"],
//   ["2", "42201-34234483-9", "Pending"],
//   ["3", "42201-34234483-9", "Pending"],
//   ["4", "42201-34234483-9", "Pending"],
//   ["5", "42201-34234483-9", "Pending"],
//   ["6", "42201-34234483-9", "Pending"],
//   ["7", "42201-34234483-9", "Pending"],
//   ["8", "42201-34234483-9", "Pending"],
//   ["9", "42201-34234483-9", "Pending"],
//   ["10", "42201-34234483-9", "Pending"]
// ];

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class UserProfile extends React.Component {
  state = {
    cnicInput: "",
    open: false,
    name: false,
    fName: false,
    address: false,
    gender: false,
    idMark: false,
    dateOfBirth: false,
    familyNo: false,
    issuedDate: false,
    expiryDate: false,
    arr: []
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  createData = (id, nic, status) => {
    return { id, nic, status };
  };

  async componentDidMount() {
    let request = await axios.get("http://35.196.79.113:3000/api/Request");
    let tempArr = [];
    let reqObj = request.data;
    for (var i = 0; i < reqObj.length; i++) {
      let innerArr = [];
      innerArr.push(reqObj[i].requestId);
      innerArr.push(reqObj[i].cnicNumber);
      innerArr.push(reqObj[i].status);
      tempArr.push(innerArr);
    }
    this.setState({
      arr: tempArr
    });
  }


  submitRequest = async event => {
    event.preventDefault();
      await axios.post("http://35.196.79.113:3000/api/Request", {
      requestId : uuid.generateUUID(),
      status : "PENDING",
      cnicNumber: this.state.cnicInput,
      owner : "TELENOR_MICRO_FINANCE"
    });
    this.handleClose();
    let request = await axios.get("http://35.196.79.113:3000/api/Request");
    console.log(request);
    let tempArr = [];
    let reqObj = request.data;
    console.log(reqObj[0]);
    for (var i = 0; i < reqObj.length; i++) {
      let innerArr = [];
      innerArr.push(reqObj[i].requestId);
      innerArr.push(reqObj[i].cnicNumber);
      innerArr.push(reqObj[i].status);
      tempArr.push(innerArr);
    }
    console.log(tempArr);
    this.setState({
      arr: tempArr
    });
  };


  render() {
    const { classes } = this.props;
    const {
      name,
      address,
      dateOfBirth,
      expiryDate,
      familyNo,
      fName,
      gender,
      idMark,
      issuedDate,
      open
    } = this.state;

    return (
      <div>
        <Button
          round
          color="#59c89f"
          aria-label="Delete"
          floated="right"
          onClick={this.handleClickOpen}
          className={classes.button}
        >
          <AddIcon/>
          Add Request
        </Button>
        <div>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New Request</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the details of the new request
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                onChange={event =>
                  this.setState({ cnicInput: event.target.value })
                }
                value={this.state.cnicInput}
                id="CNIC"
                label="CNIC Number"
                fullWidth
              />
              <div style={{ marginTop: "20px" }}>
                <div className={classes.root}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Select the details to fetch
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={name}
                            onChange={this.handleChange("name")}
                            value="name"
                          />
                        }
                        label="Name"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={fName}
                            onChange={this.handleChange("fName")}
                            value="fName"
                          />
                        }
                        label="Father Name"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={dateOfBirth}
                            onChange={this.handleChange("dateOfBirth")}
                            value="antoine"
                          />
                        }
                        label="Date of Birth"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={address}
                            onChange={this.handleChange("address")}
                            value="address"
                          />
                        }
                        label="Address"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={expiryDate}
                            onChange={this.handleChange("expiryDate")}
                            value="expiryDate"
                          />
                        }
                        label="Expiry Date"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={gender}
                            onChange={this.handleChange("gender")}
                            value="gender"
                          />
                        }
                        label="Gender"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={idMark}
                            onChange={this.handleChange("idMark")}
                            value="idMark"
                          />
                        }
                        label="Identification Mark"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={familyNo}
                            onChange={this.handleChange("familyNo")}
                            value="familyNo"
                          />
                        }
                        label="Family Number"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={issuedDate}
                            onChange={this.handleChange("issuedDate")}
                            value="issuedDate"
                          />
                        }
                        label="Issued Date"
                      />
                    </FormGroup>
                  </FormControl>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.submitRequest} style={{ backgroundColor: '#59c89f' }}>
                Request
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <GridContainer>
          <Card >
            <CardHeader style={{ backgroundColor: '#59c89f' }} >
              <h4 className={classes.cardTitleWhite}><b>Requests</b></h4>
              <p className={classes.cardCategoryWhite}>
                <b>The requests and their status.</b>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Request ID", "CNIC Number", "Status"]}
                tableData={this.state.arr}
              />
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
