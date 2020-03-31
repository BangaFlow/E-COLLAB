import Team from "../models/team";
import User from "../models/user";
import Project from "../models/project";
import _ from "lodash";

export default {
  Query: {
    getTeams: async (root, args, context, info) => {
      return await Team.find();
    },
    getTeamById: async (root, { id }, context, info) => {
      return await Team.findById(id);
    }
    // getTeamsByUserId: async (root, { id }, context, info) => {},
    // getTeamsBySubjectId: async (root, { id }, context, info) => {},
    // getTeamsByTutorId: async (root, { id }, context, info) => {},
    // getTeamProject: async (root, args, context, info) => {}
  },
  Mutation: {
    createTeam: async (_, { name, members }, context, info) => {
      let team = new Team();
      team.name = name;
      _.forEach(members, member_id => {
        team.members.push(User.findById(member_id));
      });
      return await team.save();
    },
    changeName: async (_, { id, name }, context, info) => {
      let team = await Team.findOne({ id: id }, (err, doc) => {
        doc.name = name;
        doc.save();
      });
      return team;
    },
    transferMembers: async (
      _,
      { id_team_1, id_member_team_1, id_team_2, id_member_team_2 }
    ) => {
      let team_1 = await Team.findById(id_team_1);
      let team_2 = await Team.findById(id_team_2);
      _.remove(team_1.members, member => {
        return member.id === id_member_team_1;
      });
      _.remove(team_2.members, member => {
        return member.id === id_member_team_2;
      });
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
        number_of_members
      } = Project.findById(project_id);
      let number =
        number_of_members != null
          ? number_of_members
          : Math.round(learners_involved.length / number_of_teams);
      let teams = _.chain(learners_involved)
        .shuffle()
        .chunk(number)
        .value();
      let smallest_array = teams.reduce((prev, next) =>
        prev.length > next.length ? next : prev
      );
      if (smallest_array.length < number) {
        teams = _.remove(teams, team => {
          team === smallest_array;
        });
        if (
          smallest_array.length < Math.round((number * 2) / 3) &&
          smallest_array.length > number / 2
        ) {
          let i = 0;
          while (smallest_array.length < number && i < teams.length) {
            smallest_array.push(teams[i].pop());
            i++;
          }
          teams.push(smallest_array);
        } else if (smallest_array.length < number / 2) {
          for (let index = 0; index < smallest_array.length; index++) {
            teams[index].push(smallest_array[index]);
          }
        }
      }
      let team_list = [];
      for (let index = 0; index < teams.length; index++) {
        let newTeam = new Team();
        newTeam.name = `Team $(index)`;
        newTeam.members = teams[index];
        team_list[index] = await newTeam.save();
      }
      return team_list;
    },
    assignOrChangeSubject: async (_, { id, new_subject_id }, context, info) => {
      let team = await Team.findById(id);
      team.subject.id = new_subject_id;
      return await team.updateOne({ id: id }, team);
    },
    //   assignSubjectRandomly: async (root, {id_project}, context, info) => {},
    //   assignTutors: async (root, {id, id_tutors}, context, info) => {},
    //   assignTutorsRandomly: async (root, {id_project}, context, info) => {},
    //   changeTutors: async (root, args, context, info) => {}
  }
};
