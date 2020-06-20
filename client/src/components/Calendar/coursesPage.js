import React from 'react'
import { connect } from "react-redux";
import * as courseAction from  "../../redux/actions/courseActions"
import PropTypes from 'prop-types'
import {bindActionCreators} from "redux"

class coursesPage extends React.Component {
  
       constructor(prpos){
       super(prpos)
    
      
       this.state = {
           
        course : {
            title :""
        }
       };
    }
    
    changeHandler = (event)=>{
        event.preventDefault()
        const course = {...this.state.course ,title :event.target.value}
        this.setState({course : course})

    }
    submitHandler = (e)=> {
        e.preventDefault()
        console.log(this.state.course.title)
        this.props.actions.createCourse(this.state.course)

    }


    render() {

        return (  
                <form onSubmit={this.submitHandler}>
                <h1>courses</h1>

                <h3>Add courses</h3>
                <input type="text"  onChange={this.changeHandler} value={this.state.course.title}></input>
                <input type="submit" value="Save"></input>
                {   
                  
                    
                    this.props.courses.map( course =>(
                    <div key={course.tite}>{course.title}</div>

                ))}
                </form>

        )
    }







}

coursesPage.propType = {
    dispatch: PropTypes.func.isRequired,
    actions    : PropTypes.array.isRequired
};


function mapStateToProps (state){
  
return{ courses :state.courses
}
   

};

function  mapDispatchtoProps (dispatch){
  return{ actions: bindActionCreators(courseAction,dispatch)} 
}


export default connect(mapStateToProps,mapDispatchtoProps) (coursesPage);