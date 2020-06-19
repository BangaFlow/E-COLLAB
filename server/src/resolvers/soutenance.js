
import mongoose from 'mongoose'
import { Soutenance } from '../models'


 
export default {
    
    Query: {
        soutenance:  (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Soutenance.findById(id)
        },
        allSoutenances: (root, args, context, info) => {

            return Soutenance.find({})

        }
    },

    Mutation: {
        addSoutenance: (root, args, context, info) => {
                  //  console.log(dayjs(args.date).format("YYYY-MM-DD"))
                  console.log(args)    
                  return Soutenance.create(args)


        },
        updateSoutenance: (root, { id,subject,/* groupe,*/date,startTime ,endTime }, context, info) => {
            if (!id) return;
            return Soutenance.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        subject :subject,
                       // group:group,
                        date : date,
                        startTime : startTime,
                        endTime : endTime

                    }
                }, { new: true }, (err, Soutenance) => {
                    if (err) {
                        console.log('Something went wrong when updating the Soutenance');
                    } else {
                    }
                }
            );
        },
        deleteSoutenance: (root, { id }, context, info) => {
            return Soutenance.findByIdAndRemove(id)

        }
    }

}
