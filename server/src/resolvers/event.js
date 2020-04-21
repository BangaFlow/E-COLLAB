import mongoose from 'mongoose'
import  Event from '../models/event'
import User from "../models/user";


export default {
    

    Query: {
        event: async (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return await Event.findById(id)
        },
        allEvents: async (root, args, context, info) => {

            return await Event.find({})

        }
    },

    Mutation: {
        addEvent: async (root, args, context, info) => {
            //  console.log(dayjs(args.date).format("YYYY-MM-DD"))
            console.log(args)
            return await Event.create(args)


        },
        updateEvent: async (root, { id, evenNtame, eventType, description, date, startTime, endTime }, context, info) => {
            if (!id) return;
            return await Event.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        eventName: evenNtame,
                        eventType: eventType,
                        description: description,
                        date: date,
                        startTime: startTime,
                        endTime: endTime,

                    }
                }, { new: true }, (err, Event) => {
                    if (err) {
                        console.log('Something went wrong when updating the Event');
                    } else {
                    }
                }
            );
        },
        deleteEvent: async (root, { id }, context, info) => {
            return await Event.findByIdAndRemove(id)

        },
       


        


        participantsAssignment: async (_, args, context, info) => {
            let event = await Event.findById(args.id);
            event.participants = await User.findById(args.participant);
            event = await Event.findByIdAndUpdate(
              args.id,
              event,
              { new: true },
              (err, doc) => {
                if (err) {
                  throw new Error("Something wrong while assignOrChangeSubject!");
                }
              }
            );
      
            return event;
          },

    },

    Event:{
        participants: async (event, arg, context, info) => {
            return (await event.populate("participants").execPopulate()).participants;
          }
        }


}
