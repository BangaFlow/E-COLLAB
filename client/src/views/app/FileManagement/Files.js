import React, { Component, Fragment } from "react";
import { Row,Button } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import $ from 'jquery';
export default class Files extends Component {
  componentDidMount() {
    $(document).ready(function(){
      var clientId = "254783341186-6kkeafblui7v0kpjcecsmm3dpmb3tadq.apps.googleusercontent.com";
      var redirect_uri = "http://localhost:3000/app/FileManagement/uploadview";
   var scope = "https://www.googleapis.com/auth/drive";
  
      
      var url = "";
  
      $("#login").click(function(){
   signIn(clientId,redirect_uri,scope,url);
  
      });
  
      function signIn(clientId,redirect_uri,scope,url){
       
         // the actual url to which the user is redirected to 
  
         url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
         +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
         +"&access_type=offline";
  
         // this line makes the user redirected to the url
  
         window.location = url;
  
  
      }
 
  });
  } 
  
  render() {
        return (
         
            <Fragment>
            
            <Row>
              <Colxx xxs="12">
                <h1>Manage Files</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" className="mb-4">
              </Colxx>  
              
             
                <Button id="login"
                color="primary"
                size="xs"
                block
                className="mb-2">
                 Upload Files to Drive
                </Button>
               
            </Row>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          </Fragment>
        )
    }
}








/*


    <Fragment></Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <Breadcrumb heading="Statistics" match={this.props.match} />
            <div className="float-sm-right">
              
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        
        <Row className="app-row survey-app"></Row>
          <Colxx xxs="12" className="mb-4"></Colxx>
            <div>
              <canvas id="myChart"></canvas>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
            </div>
    
    */



