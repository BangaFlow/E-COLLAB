import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Link } from 'react-router-dom'

import * as CategoriesActions from "../../../redux/actions/categories.actions";
import Category from "../../../components/Projects/CategoryCard";
//import ProjectForm from "../../components/Projects/ProjectForm";
import ProjectMenu from "../../../components/Projects/ProjectMenu";
import CategoryForm from "../../../components/Projects/CategoryForm";

class Categories extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
      
    };
  }
  componentDidMount() {
    this.props.actions.loadtypeProjects().catch((err) => {
      alert(`error ${err}`);
    });
  }
  

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  statistics =() =>{
    let categories=[];
    let ps=[];
    let count=0;
    let i=0;
    console.log(this.props.categories);
    
    this.props.categories.forEach(element => {
      categories[i]=element.title;
      element.Projects.map((number) =>
      <li key={number.id}>
        {count=count+1}
      </li>
    );
      ps[i]=count;
      i=i+1;
      console.log(count);
    });

    console.log(categories);
    console.log(ps);
  };

  render() {
    //const { c } = this.props;
    const { modalOpen } = this.state;
    //let filteredCategories=this.props.categories;
    
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <Breadcrumb heading="Categories" match={this.props.match} />
            <div className="float-sm-right">

              <Button color="primary" size="xs" onClick={this.toggleModal}>
                Add Category
              </Button>
              <Button color="warning" className="mb-2">
              <Link
              
                to={{
              pathname: "/app/projects/Stats",
              c:this.props.categories
              
                      }}
                      >  Statistics</Link>
                 
                </Button>
         
            

            </div>
            
            <Separator className="mb-5" />
            
                

          </Colxx>
        </Row>
        
        <Row className="app-row survey-app">
          <Colxx xxs="12" className="mb-4">
            <div>
              {this.props.categories?
                this.props.categories.map((category) =>
            <Category key={category.id} item={category} />                
                ):"loading"
                }
            </div>
          </Colxx>

         
        </Row>
        <ProjectMenu />
        <CategoryForm
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
          title="Add new Category"
        />

      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ categories: state.categories });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CategoriesActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);