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

async function getWorkshops() {
    debugger
    var data = await client.query({ query:  GET_WORKSHOPS });
  
    console.log(data)
    return data.data.allworkShops;
  };
  

export { getWorkshops }
