
import mongoose from 'mongoose'
import { Meeting } from '../models'

import User from '../models/user'

export default {

    Query: {
        meeting: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Meeting.findById(id)
        },
        allMeetings: async (root, args, context, info) => {

            return await Meeting.find({})

        }
    },

    Mutation: {
        addMeeting: (root, args, context, info) => {
            //  console.log(dayjs(args.date).format("YYYY-MM-DD"))
            console.log(args)
            return Meeting.create(args)


        },
        updateMeeting: (root, { id, subject,/* groupe,*/date, startTime, endTime }, context, info) => {
            if (!id) return;
            return Meeting.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        subject: subject,
                        // group:group,
                        date: date,
                        startTime: startTime,
                        endTime: endTime

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

        },
        AssignmentGroupToMetting: async (root, args, context, info) => {

            
          
            args.emails.forEach(async element => {
               let user = await User.findById(element)
              let meeting = await Meeting.findById(args.id_meeting)

               meeting.group.push(user) 
               meeting = await Meeting.findByIdAndUpdate(
                 args.id_meeting,
                 meeting,
                 { new: true },
                 (err, doc) => {
                   if (err) {
                     throw new Error("Something wrong while assignOrChangeEvent!");
                   }
                 }
               );
         
              
            
            });
            return await Meeting.findById(args.id_meeting)
            
        } 



    },
    Meeting: {
        group: async (meeting, arg, context, info) => {
            return (await meeting.populate("group").execPopulate()).group;
        }
    }


}
