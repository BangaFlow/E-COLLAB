import React, { Component, Fragment } from "react";
import {
    Collapse,
    Button,
    Row,
    Card,
    CardSubtitle,
    ButtonGroup,
    CardBody, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
    CardTitle
} from "reactstrap";
import ReactTable from "react-table";
import DataTablePagination from "../../../components/DatatablePagination";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

import * as eventAction from "../../../redux/actions/eventActions"
import { bindActionCreators } from "redux"
import Event from "../../../components/Calendar/event"

import AddNewModal from '../../../components/Calendar/AddNewModal'



export class QuizPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cSelected :[],
            rSelected :null,
            time :{
              minutes : 0,
              seconds :0}

        }
        this.interval= null
    }




    componentDidMount(){

      this.startTimer();
    }




    startTimer =()=>{
     const countDownTime= Date.now() +3600000  /*18000*/
     console.log(countDownTime)
     this.interval=setInterval(()=> {
       const now = new Date();
      
       const distance = countDownTime - now;
       
       const minutes =Math.floor((distance % (1000*60*60)) /(1000 *60))
          
       const seconds =Math.floor((distance % (1000*60)) / 1000)
       if(distance <0){
         clearInterval(this.interval)
         this.setState({
           time :{ 
             minutes : 0,
             seconds :0
           }
         }, ()=> { alert("quie has ended")
                    this.props.history.push("/")
        })
       } else {
         this.setState({
           time :{
             minutes,
             seconds
           }
         })
       }
     },1000)

    }
   



    render() {
        const {time} =this.state
        const onCheckboxBtnClick = (selected) => {
            const index = this.state.cSelected.indexOf(selected);
            if (index < 0) {
                this.state.cSelected.push(selected);
            } else {
                this.state.cSelected.splice(index, 1);
            }
            this.setState({cSelected:[...this.state.cSelected]});
          }

        const dataTableColumns = [
           
            {
              
            Cell: props =>  <CardBody className="center-block  ">
            <CardTitle className="mb-4">
             React 
            </CardTitle>
           
           
       
              <Button color="primary" size="lg" block onClick={() => this.setState({rSelected :1})} active={this.state.rSelected === 1}>One</Button>
              <Button color="primary" size="lg" block onClick={() => this.setState({rSelected :2})} active={this.state.rSelected === 2}>Two</Button>
              <Button color="primary" size="lg" block onClick={() => this.setState({rSelected :3})} active={this.state.rSelected === 3}>Three</Button>
           
            <p>Selected: {this.state.rSelected}</p>

            
          </CardBody>
            },
           

          ];
const  data = [
    {
      id: 1,
      title: 'Marble Cake',
      img: '/assets/img/marble-cake-thumb.jpg',
      category: 'Cakes',
      createDate: '02.04.2018',
      status: 'ON HOLD',
      statusColor: 'primary',
      description: 'Wedding cake with flowers Macarons and blueberries',
      sales: 1647,
      stock: 62
    },
    {
      id: 2,
      title: 'Fat Rascal',
      category: 'Cupcakes',
      img: '/assets/img/fat-rascal-thumb.jpg',
      createDate: '01.04.2018',
      status: 'PROCESSED',
      statusColor: 'secondary',
      description: 'Cheesecake with chocolate cookies and Cream biscuits',
      sales: 1240,
      stock: 48
    }
  ]
  
  
  

        return (
            <Fragment>
            
          <Card className="mb-4">
      <CardBody>
        <CardTitle >
          <IntlMessages className="left-align"  id="22.3" />
          <p>{time.minutes} :{time.seconds}</p>
          <span className="iconsminds-clock center-block"></span>
        </CardTitle>
        <ReactTable
          data={data}
          columns={dataTableColumns}
          defaultPageSize={1}
          showPageJump={true}
          showPageSizeOptions={false}
          PaginationComponent={DataTablePagination}
          className={"react-table-fixed-height"}
        />
      </CardBody>
    </Card>
  );
        


            </Fragment>
        )
    }
}
QuizPage.propType = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    debugger
    return {
        event: state.event
    }


};

function mapDispatchtoProps(dispatch) {
    return { actions: bindActionCreators(eventAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(QuizPage);