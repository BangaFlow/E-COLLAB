import mongoose from 'mongoose'
import { Calendar, Event, User } from '../models'
export default {
    Query: {
        calendar: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Calendar.findById(id)
        },
        calendars: (root, args, context, info) => {

            return Calendar.find({})

        }
    },

    Mutation: {

        updateCalendar: (root, { id, year, month, day }, context, info) => {
            if (!id) return;
            return Calendar.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        year: year,
                        month: month,
                        day: day

                    }
                }, { new: true }, (err, Calendar) => {
                    if (err) {
                        console.log('Something went wrong when updating the Calendar');
                    } else {
                    }
                }
            );
        },
        deleteCalendar: (root, { id }, context, info) => {
            return Calendar.findByIdAndRemove(id)

        },

        eventAssignmentToCalendaer: async (root, { id_event, id_user }, context, info) => {
            let event = await Event.findById(id_event)
            let user = await User.findById(id_user)

            return Calendar.findOne({user:id_user})
           
            













           


        },


    },
    Calendar: {
        events: async (calendar, arg, context, info) => {
            return (await calendar.populate("events").execPopulate()).events;
        }
  
    }


}


