const _ = require("lodash");

import Team from "../models/team";
import Subject from "../models/subject";
import Project from "../models/project";
import User from "../models/user";

export default {
  Query: {
    getProjects: async (root, args, context, info) => {
      const projects = await Project.find();      
      return projects;
    },
    getTeams: async (root, args, context, info) => {
      const teams = await Team.find();      
      return teams;
    },
    getTeamById: async (root, { id }, context, info) => {
      return await Team.findById(id);
    },
    getTeamsByUserId: async (root, { id }, context, info) => {
      const teams = await Team.find();
      let user_teams = [];
      let index = 0;
      teams.forEach((team) => {
        if (team.members.indexOf(id) > -1) {
          user_teams[index] = team;
          index++;
        }
      });
      return user_teams;
    },
    // getTeamsBySubjectId: async (root, { id }, context, info) => {},
    // getTeamsByTutorId: async (root, { id }, context, info) => {},
    // getTeamProject: async (root, args, context, info) => {}
  },
  Mutation: {
    createTeam: async (_, { name, members, project_id }, context, info) => {
      let team = new Team({
        name,
        members,
        project: project_id,
      });
      team = await team.save();
      return team;
    },
    changeName: async (_, { id, name }, context, info) => {
      let team = await Team.findById(id);
      team.name = name;
      team = await Team.findByIdAndUpdate(
        id,
        team,
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error("Something wrong while assignTutor!");
          }
        }
      );
      return team;
    },
    moveLearner: async (
      root,
      { id_member, id_team_from, id_team_to },
      context,
      info
    ) => {
      let team_from = await Team.findById(id_team_from);
      let team_to = await Team.findById(id_team_to);
      const index = team_from.members.indexOf(id_member);
      if (index_1 > -1) {
        team_from.members.splice(index_1, 1);
        id_team_to.members.push(id_member);
        team_from = await Team.findByIdAndUpdate(
          id_team_from,
          team_from,
          { new: true },
          (err, doc) => {
            if (err) {
              throw new Error("Something wrong when updating team from!");
            }
          }
        );
        team_to = await Team.findByIdAndUpdate(
          id_team_to,
          team_to,
          { new: true },
          (err, doc) => {
            if (err) {
              throw new Error("Something wrong when updating team to!");
            }
          }
        );
        retun[(team_from, team_to)];
      } else {
        throw new Error("Something wrong when moving team member!");
      }
    },
    transferMembers: async (
      _,
      { id_team_1, id_member_team_1, id_team_2, id_member_team_2 }
    ) => {
      let team_1 = await Team.findById(id_team_1);
      let team_2 = await Team.findById(id_team_2);

      const index_1 = team_1.members.indexOf(id_member_team_1);
      if (index_1 > -1) {
        team_1.members.splice(index_1, 1);
      }

      const index_2 = team_2.members.indexOf(id_member_team_2);
      if (index_2 > -1) {
        team_2.members.splice(index_2, 1);
      }

      team_1.members.push(id_member_team_2);
      team_2.members.push(id_member_team_1);

      team_1 = await Team.findByIdAndUpdate(
        id_team_1,
        team_1,
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error("Something wrong when updating team 1!");
          }
        }
      );
      team_2 = await Team.findByIdAndUpdate(
        id_team_2,
        team_2,
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error("Something wrong when updating team 2!");
          }
        }
      );
      return [team_1, team_2];
    },
    generateRandomTeams: async (root, { project_id }, context, info) => {
      let {
        number_of_teams,
        learners_involved,
        number_of_members,
        subjects,
        tutors_involved,
        number_of_tutors_per_team,
      } = await Project.findById(project_id);

      //generate teams
      let number =
        number_of_members != null
          ? number_of_members
          : Math.round(learners_involved.length / number_of_teams);

      let teams = _.chain(learners_involved).shuffle().chunk(number).value();

      let smallest_array = teams.reduce((prev, next) =>
        prev.length > next.length ? next : prev
      );

      if (smallest_array.length < number) {
        const index = teams.indexOf(smallest_array);
        if (index > -1) {
          teams.splice(index, 1);
        }

        if (
          smallest_array.length <= Math.round((number * 2) / 3) &&
          smallest_array.length >= number / 2
        ) {
          let i = 0;
          while (smallest_array.length < number && i < teams.length) {
            smallest_array.push(teams[i].pop());
            i++;
          }
          teams.push(smallest_array);
        } else if (smallest_array.length < number / 2) {
          let index_s = 0;
          let index_t = 0;
          while (index_s < smallest_array.length) {
            if (index_t >= teams.length) {
              index_t = 0;
            }
            teams[index_t].push(smallest_array[index_s]);
            index_s++;
            index_t++;
          }
        }
      }

      let team_list = [];
      for (let index = 0; index < teams.length; index++) {
        let newTeam = new Team();
        newTeam.name = `Team ${index + 1}`;
        newTeam.project = project_id;
        newTeam.members = teams[index];
        team_list[index] = newTeam;

        //random subjects
        let subjects_ = _.chain(subjects).shuffle().value();

        let index_sub = 0;
        for (let index = 0; index < team_list.length; index++) {
          if (index_sub >= subjects_.length) {
            index_sub = 0;
          }
          team_list[index].subject = subjects_[index_sub];
          index_sub++;
        }

        //random tutors
        let tutors_involved_ = _.chain(tutors_involved)
          .shuffle()
          .chunk(number_of_tutors_per_team)
          .value();

        let index_tutors = 0;
        for (let index = 0; index < team_list.length; index++) {
          if (index_tutors >= tutors_involved_.length) {
            index_tutors = 0;
          }
          team_list[index].tutors = tutors_involved_[index_tutors];
          index_tutors++;
        }
      }

      //saving to db
      let final_teams_list = [];
      for (let index = 0; index < team_list.length; index++) {
        final_teams_list[index] = await team_list[index].save();
      }
      return final_teams_list;
    },
    assignOrChangeSubject: async (_, { id, new_subject_id }, context, info) => {
      let team = await Team.findById(id);
      team.subject = await Subject.findById(new_subject_id);
      team = await Team.findByIdAndUpdate(
        id,
        team,
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error("Something wrong while assignOrChangeSubject!");
          }
        }
      );

      return team;
    },
    assignTutor: async (root, { id_team, id_tutor }, context, info) => {
      let team = await Team.findById(id_team);
      let tutor = await User.findById(id_tutor);
      team.tutors.push(tutor);
      team = await Team.findByIdAndUpdate(
        id_team,
        team,
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error("Something wrong while assignTutor!");
          }
        }
      );
      return team;
    },
    changeTutors: async (
      root,
      { id_team, id_old_tutor, id_new_tutor },
      context,
      info
    ) => {
      let team = await Team.findById(id_team);
      let old_tutor = await User.findById(id_old_tutor);
      let new_tutor = await User.findById(id_new_tutor);
      const index = team.tutors.indexOf(old_tutor);
      if (index > -1) {
        team.tutors.splice(index, 1);
        team.tutors.push(new_tutor);
        team = await Team.findByIdAndUpdate(
          id_team,
          team,
          { new: true },
          (err, doc) => {
            if (err) {
              throw new Error("Something wrong while assignTutor!");
            }
          }
        );
        return team;
      } else {
        throw new Error(`the old tutor not found!`);
      }
    },
  },

  Team: {
    members: async (team, arg, context, info) => {
      return (await team.populate("members").execPopulate()).members;
    },
    tutors: async (team, arg, context, info) => {
      return (await team.populate("tutors").execPopulate()).tutors;
    },
    subject: async (team, arg, context, info) => {
      return (await team.populate("subject").execPopulate()).subject;
    },
    project: async (team, arg, context, info) => {
      return (await team.populate("project").execPopulate()).project;
    },
  },
  Project: {
    subjects: async (project, arg, context, info) => {
      return (await project.populate("subjects").execPopulate()).subjects;
    },
    tutors_involved: async (project, arg, context, info) => {
      return (await project.populate("tutors_involved").execPopulate())
        .tutors_involved;
    },
    learners_involved: async (project, arg, context, info) => {
      return (await project.populate("learners_involved").execPopulate())
        .learners_involved;
    },
  },
};
