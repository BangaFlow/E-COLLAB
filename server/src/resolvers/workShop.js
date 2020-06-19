import mongoose from 'mongoose'
import WorkShop from '../models/workShop';
import  User  from '../models/user';

export default {

    Query: {
        workShop: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return WorkShop.findById(id)
        },
        allworkShops: async (root, args, context, info) => {

            return await WorkShop.find({})

        }
    },

    Mutation: {
        addWorkShop: async (root, args, context, info) => {
            //  console.log(dayjs(args.date).format("YYYY-MM-DD"))
            console.log(args)
            return await WorkShop.create(args)


        },
        updateWorkShop: (root, { id, workShopName, workShopType, workShop_description, workShop_date, workShop_startTime, workShop_endTime,  workShop_Requirments, workShop_goals, workShop_Certification }, context, info) => {
            if (!id) return;
            return WorkShop.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        workShopName: workShopName,
                        workShopType: workShopType,
                        description: workShop_description,
                        startTime: workShop_startTime,
                        endTime: workShop_endTime,
                        Requirments: workShop_Requirments,
                        goals: workShop_goals,
                        Certification: workShop_Certification

                    }
                }, { new: true }, (err, WorkShop) => {
                    if (err) {
                        console.log('Something went wrong when updating the WorkShop');
                    } else {
                    }
                }
            );
        },
        deleteWorkShop: (root, { id }, context, info) => {
            return WorkShop.findByIdAndRemove(id)

        },
        AssignmentGroupToWorkShops: async (root, args, context, info) => {

            
          
            args.emails.forEach(async element => {
               
              let workShop = await WorkShop.findById(args.id_workShop)
              console.log(workShop)
              
              let user = await User.findById(element);
              console.log(user)

              workShop.participants.push(user)

              workShop = await WorkShop.findByIdAndUpdate(
                 args.id_workShop,
                 workShop,
                 { new: true },
                 (err, doc) => {
                   if (err) {
                     throw new Error("Something wrong while assignOrChangeEvent!");
                   }
                 }
               );
         
               
            
            });
            
            return await WorkShop.findById(args.id_workShop)
        }
    },
    WorkShop: {
        participants: async (workShop, arg, context, info) => {
            return (await workShop.populate("participants").execPopulate()).participants;
        }
    }


}
