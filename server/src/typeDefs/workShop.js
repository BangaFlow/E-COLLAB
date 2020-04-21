import { gql } from 'apollo-server-express'


export default gql`
    
    extend type Query{
     workShop(id :String ):WorkShop
     allworkShops : [WorkShop]
    

    }

    extend type Mutation {
        addWorkShop(id:String, workShopName :String, workShopType:String,workShop_description : String,workShop_date: String, workShop_startTime : String,workShop_endTime : String ,workShop_Requirments :String ,workShop_goals :String, workShop_Certification: Boolean ):WorkShop 
        updateWorkShop(id:String,  workShopName :String, workShopType:String,workShop_description : String,workShop_date: String, workShop_startTime : String,workShop_endTime : String ,workShop_Requirments :String ,workShop_goals :String, workShop_Certification: Boolean) :WorkShop 
        deleteWorkShop(id: String): WorkShop
    }

    type WorkShop {
        workShopName :String,
        workShopType:String,
        workShop_description : String,
        workShop_date: String,
        workShop_startTime : String,
        workShop_endTime : String
        workShop_participants:[User],
        workShopor_ganiser :User,
        workShop_Requirments :String ,
        workShop_goals :String,
        workShop_Certification: Boolean

        
       

      
     
    
    }`
