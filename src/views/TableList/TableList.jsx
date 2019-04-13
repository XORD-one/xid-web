import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios";
import Table from "../../components/Table/Table";

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

class TableList extends React.Component {

  state = {
    requests : []
  };

  async componentDidMount() {
    let acceptedRequests = [];
    let request = await axios.get("http://35.196.79.113:3000/api/Request");
    for(let i = 0 ; i < request.data.length ; i++){
      if(request.data[i].status === "ACCEPTED")
      acceptedRequests.push(request.data[i].cnicNumber)
    }
    let acceptedRequestsData = [];
    for (let y = 0 ; y < acceptedRequests.length ;y++){
      let requestData = await axios.get("http://35.196.79.113:3000/api/Cnic/"+"4220138891449")
      acceptedRequestsData.push(requestData.data);
    }

    let tempArr = [];
    for (var i = 0; i < acceptedRequestsData.length; i++) {
      let innerArr = [];
      innerArr.push(acceptedRequestsData[i].idNumber);
      innerArr.push(acceptedRequestsData[i].fullName);
      innerArr.push("Name : "+acceptedRequestsData[i].fullName+" Country : "+acceptedRequestsData[i].country + " Date of Birth : "+acceptedRequestsData[i].dob );
      tempArr.push(innerArr);
    }

    console.log(tempArr)
    this.setState({
      requests: tempArr
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <Card>
            <CardHeader  style={{ backgroundColor: '#59c89f' }}>
              <h4 className={classes.cardTitleWhite}><b>Approved Requests</b></h4>
              <p className={classes.cardCategoryWhite}>
                <b>   Approved data fetched from user</b>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["CNIC Number", "Name", "Fetched Data"]}
                tableData={this.state.requests}
              />
            </CardBody>
          </Card>
        </GridContainer>

      </div>
    );
  }
}

export default withStyles(styles)(TableList);
