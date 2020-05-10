import mongoose from 'mongoose'
import { Calendar, Event, User } from '../models'
export default {
    Query: {
      
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
            let eventResult = await Event.findById(id_event)
            let userResult = await User.findById(id_user)
            console.log(eventResult)
            console.log(userResult)
            let userCalendar = await Calendar.findOne({ user: id_user })
            console.log(userCalendar)
            if (userCalendar === null) {
                let newCalendar = new Calendar({ user: userResult.id, events: [eventResult] })
                return Calendar.create(newCalendar)
                console.log("empty")
            } else {




                userCalendar.events.push(await Event.findById(id_event))



                return userCalendar = await Calendar.findByIdAndUpdate(
                    userCalendar.id,
                    userCalendar,
                    { new: true },
                    (err, doc) => {
                        if (err) {
                            throw new Error("Something wrong while assignOrChangeSubject!");
                        }
                    }
                );
            }

        },

        getUsercalendar: async (root, args, context, info) => {

            

            return await Calendar.findOne({ user: args.id })
        },

        eventAssignmentToCalendaerApi :async (root, args, context, info) => {
            let eventResult = await Event.findById(args.id_event)
            let userResult = await User.findById(args.id_user)

            const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
  });

  function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    // Refer to the Node.js quickstart on how to setup the environment:
  // https://developers.google.com/calendar/quickstart/node
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
  // stored credentials.
  
  var event = {
    summary: String,
   
    description: String,
    'start': {
      'dateTime': Date,
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': Date,
      'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'ferchichidorsaf96@gmail.com'},
    
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  event.summary=eventResult.eventName
  event.description=eventResult.description
  event.start.dateTime=eventResult.startDate
  event.end.dateTime=eventResult.endDate
  event.attendees.push({'email': userResult.email})
  
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
  }
  return eventResult

}
            



































       















        




































    },
    Calendar: {
        events: async (calendar, arg, context, info) => {
            return (await calendar.populate("events").execPopulate()).events;
        }

    }


}


