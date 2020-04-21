import mongoose from 'mongoose'
import WorkShop from '../models/workShop';

export default {

    Query: {
        workShop: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return WorkShop.findById(id)
        },
        allworkShops: (root, args, context, info) => {

            return WorkShop.find({})

        }
    },

    Mutation: {
        addWorkShop: (root, args, context, info) => {
            //  console.log(dayjs(args.date).format("YYYY-MM-DD"))
            console.log(args)
            return WorkShop.create(args)


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
                        date: workShop_date,
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

        }
    }


}
