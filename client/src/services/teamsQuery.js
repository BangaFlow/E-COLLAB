import { gql } from "apollo-boost";

const GET_TEAMS = gql`
  query teams {
    getTeams {
      id
      name
      members {
        id
        name
        email
      }
      tutors {
        id
        name
        email
      }
      subject {
        id
        name
      }
      project {
        id
        title
        start_date
        end_date
        short_desc
        choose_date_limit {
          start_choose_date
          end_choose_date
        }
        number_of_teams
        number_of_members
        number_of_tutors_per_team
        auto_generate_teams
        competence_generate_teams
        learners_choose_teams
        learners_involved {
          id
          name
        }
        tutors_involved {
          id
          name
        }
      }
    }
  }
`;

const CHANGE_TEAM_NAME = gql`
  mutation changeName($id: ID!, $name: String!) {
    changeName(id: $id, name: $name) {
      id
      name
      members {
        id
        name
        email
      }
      tutors {
        id
        name
        email
      }
      subject {
        id
        name
      }
      project {
        id
        title
        start_date
        end_date
        short_desc
        choose_date_limit {
          start_choose_date
          end_choose_date
        }
        number_of_teams
        number_of_members
        number_of_tutors_per_team
        auto_generate_teams
        competence_generate_teams
        learners_choose_teams
        learners_involved {
          id
          name
        }
        tutors_involved {
          id
          name
        }
      }
    }
  }
`;

const CHANGE_SUBJECT = gql`
  mutation assignOrChangeSubject($id: ID!, $new_subject_id: ID!) {
    assignOrChangeSubject(id: $id, new_subject_id: $new_subject_id) {
      id
      name
      members {
        id
        name
        email
      }
      tutors {
        id
        name
        email
      }
      subject {
        id
        name
      }
      project {
        id
        title
        start_date
        end_date
        short_desc
        choose_date_limit {
          start_choose_date
          end_choose_date
        }
        number_of_teams
        number_of_members
        number_of_tutors_per_team
        auto_generate_teams
        competence_generate_teams
        learners_choose_teams
        learners_involved {
          id
          name
        }
        tutors_involved {
          id
          name
        }
      }
    }
  }
`;

const GET_PROJECTS = gql`
  query {
    getProjects {
      id
      title
      start_date
      end_date
      short_desc
      choose_date_limit {
        start_choose_date
        end_choose_date
      }
      number_of_teams
      number_of_members
      number_of_tutors_per_team
      auto_generate_teams
      competence_generate_teams
      learners_choose_teams
      learners_involved {
        id
        name
      }
      tutors_involved {
        id
        name
      }
    }
  }
`;

const CREATE_TEAM = gql`
  mutation createTeam($name: String!, $members: [String!], $project_id: ID!) {
    createTeam(name: $name, members: $members, project_id: $project_id) {
      id
      name
      members {
        id
        name
        email
      }
      tutors {
        id
        name
        email
      }
      subject {
        id
        name
      }
      project {
        id
        title
        start_date
        end_date
        short_desc
        choose_date_limit {
          start_choose_date
          end_choose_date
        }
        number_of_teams
        number_of_members
        number_of_tutors_per_team
        auto_generate_teams
        competence_generate_teams
        learners_choose_teams
        learners_involved {
          id
          name
        }
        tutors_involved {
          id
          name
        }
      }
    }
  }
`;


const AUTO_GENERATE_TEAMS = gql`
  mutation generateRandomTeams($project_id: ID!) {
    generateRandomTeams(project_id: $project_id) {
      id
      name
      members {
        id
        name
        email
      }
      tutors {
        id
        name
        email
      }
      subject {
        id
        name
      }
      project {
        id
        title
        start_date
        end_date
        short_desc
        choose_date_limit {
          start_choose_date
          end_choose_date
        }
        number_of_teams
        number_of_members
        number_of_tutors_per_team
        auto_generate_teams
        competence_generate_teams
        learners_choose_teams
        learners_involved {
          id
          name
        }
        tutors_involved {
          id
          name
        }
      }
    }
  }
`;
export {
  GET_TEAMS,
  CHANGE_TEAM_NAME,
  CHANGE_SUBJECT,
  CREATE_TEAM,
  GET_PROJECTS,
  AUTO_GENERATE_TEAMS,
};
