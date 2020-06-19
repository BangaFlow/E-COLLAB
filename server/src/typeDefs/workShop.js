import { gql } from 'apollo-server-express'


export default gql`
    
    extend type Query{
     workShop(id :String ):WorkShop
     allworkShops : [WorkShop]
    

    }

    extend type Mutation {
        addWorkShop( workShopName :String, workShop_description : String, workShop_startTime : Date, workShop_endTime : Date , workShop_Requirments :String , workShop_goals :String, workShop_Certification: Boolean ):WorkShop
        updateWorkShop(id:String,  workShopName :String,workShop_description : String, workShop_startTime : Date,workShop_endTime : Date ,workShop_Requirments :String ,workShop_goals :String, workShop_Certification: Boolean) :WorkShop 
        deleteWorkShop(id: String): WorkShop
        AssignmentGroupToWorkShops(id_workShop:String,emails:[String]):WorkShop
    }

    type WorkShop {
        id:ID
        workShopName :String,
        workShop_description : String,
        workShop_startTime : Date,
        workShop_endTime : Date ,
        participants:[User],
        workShopor_oganiser :User,
        workShop_Requirments :String ,
        workShop_goals :String,
        workShop_Certification: Boolean

        
       

      
     
    
    }`
