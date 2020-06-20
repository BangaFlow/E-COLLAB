import { gql } from 'apollo-boost'
import client from './client'

const GET_WORKSHOPS = gql`
  query{allworkShops{id,
  workShopName,
  workShop_description 
    
        workShop_startTime 
        workShop_endTime 
        workShop_Requirments 
        workShop_goals 
        workShop_Certification
        participants {id,username}
}}

`




const ADD_WORKSHOP = gql`
  mutation 
  
  addWorkShop($workShopName:String,$workShop_description:String,$workShop_startTime:Date,$workShop_endTime:Date,$workShop_Requirments:String,$workShop_goals:String){
  addWorkShop(workShopName:$workShopName,workShop_description:$workShop_description,workShop_startTime:$workShop_startTime,workShop_endTime:$workShop_endTime,workShop_Requirments:$workShop_Requirments ,workShop_goals:$workShop_goals) {
    
    id
    workShopName
    workShop_description
    workShop_Requirments
    workShop_startTime
    workShop_endTime
    workShop_goals
    workShop_Certification


}}

`

async function getWorkshops() {
    
    var data = await client.query({ query:  GET_WORKSHOPS });
  
    console.log(data)
    return data.data.allworkShops;
  };



  async function addWorkshop(workShopName, workShop_description ,workShop_Requirments, workShop_Certification, workShop_startTime, workShop_endTime, workShop_goals) {
    
    const variables = { workShopName, workShop_description ,workShop_Requirments, workShop_Certification, workShop_startTime, workShop_endTime, workShop_goals };
    
    var data = await client.mutate({ mutation: ADD_WORKSHOP, variables });
    console.log(data)
    
    return data.data.addWorkShop;
  };
  

export { getWorkshops,addWorkshop }
