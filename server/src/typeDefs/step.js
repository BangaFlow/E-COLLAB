import { gql } from 'apollo-server-express'

export default gql`

    type Step {
        id: ID!
        start_date: String
        end_date: String
        description: String
        goal: String
   
    }
    extend type Query{
        
        getTasks:[Step]
    
    }
    extend type Mutation {
        createtask(start_date: String
        end_date: String
        description: String
        goal: String ):Step 
      
        
    }
    
    
    `;


/* 

import Step from "../models/step";

export default {
    Query: {
        getTasks: (root, args, context, info) => {
            return Task.find();
        }
    },
    Mutation: {
        createtask: async (root, args, context, info) => {
            return project.create(args)
        }
    }
};

*/