
import mongoose from 'mongoose'
import { Meeting } from '../models'


 
export default {
    
    Query: {
        meeting:  (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Meeting.findById(id)
        },
        allMeetings: (root, args, context, info) => {

            return Meeting.find({})

        }
    },

    Mutation: {
        addMeeting: (root, args, context, info) => {
          //  console.log(dayjs(args.date).format("YYYY-MM-DD"))
          console.log(args)    
                  return Meeting.create(args)


        },
        updateMeeting: (root, { id,subject,/* groupe,*/date,startTime ,endTime }, context, info) => {
            if (!id) return;
            return Meeting.findOneAndUpdate(
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
                }, { new: true }, (err, Meeting) => {
                    if (err) {
                        console.log('Something went wrong when updating the Meeting');
                    } else {
                    }
                }
            );
        },
        deleteMeeting: (root, { id }, context, info) => {
            return Meeting.findByIdAndRemove(id)

        }
    }

}
