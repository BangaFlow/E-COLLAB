import Step from "../models/step";

export default {
    Query: {
        getSteps: (_, __, context, info) => {
            return Step.find();
        }
    },
    Mutation: {
        deletestep :(root, { id }, context, info) => {
            return  Step.findByIdAndRemove(id)
             
          }


       
    }
};