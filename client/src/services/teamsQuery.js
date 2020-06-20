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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
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
        email
      }
      tutors_involved {
        id
        name
        email
      }
      subjects {
        id
        title
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
        }
      }
    }
  }
`;

const ADD_TUTOR = gql`
  mutation assignTutor($id_team: ID!, $id_tutor: ID!) {
    assignTutor(id_team: $id_team, id_tutor: $id_tutor) {
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
        }
      }
    }
  }
`;

const CHANGE_TUTOR = gql`
  mutation changeTutors($id_team: ID!, $id_old_tutor: ID!, $id_new_tutor: ID!) {
    changeTutors(
      id_team: $id_team
      id_old_tutor: $id_old_tutor
      id_new_tutor: $id_new_tutor
    ) {
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
        }
      }
    }
  }
`;

const TRANSFER_MEMBER = gql`
  mutation moveLearner($id_member: ID!, $id_team_from: ID!, $id_team_to: ID!) {
    moveLearner(
      id_member: $id_member
      id_team_from: $id_team_from
      id_team_to: $id_team_to
    ) {
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
        }
      }
    }
  }
`;

const SWAP_MEMBERS = gql`
  mutation transferMembers(
    $id_team_1: ID!
    $id_member_team_1: ID!
    $id_team_2: ID!
    $id_member_team_2: ID!
  ) {
    transferMembers(
      id_team_1: $id_team_1
      id_member_team_1: $id_member_team_1
      id_team_2: $id_team_2
      id_member_team_2: $id_member_team_2
    ) {
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
        }
      }
    }
  }
`;

const ADD_MEMBER = gql`
  mutation addNewMember($id_team: ID!, $id_member: ID!) {
    addNewMember(id_team: $id_team, id_member: $id_member) {
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
        }
      }
    }
  }
`;

const REMOVE_MEMBER = gql`
  mutation removeMember($id_team: ID!, $id_member: ID!) {
    removeMember(id_team: $id_team, id_member: $id_member) {
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
        }
      }
    }
  }
`;

const REMOVE_TUTOR = gql`
  mutation removeTutor($id_team: ID!, $id_tutor: ID!) {
    removeTutor(id_team: $id_team, id_tutor: $id_tutor) {
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
        title
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
          email
        }
        tutors_involved {
          id
          name
          email
        }
        subjects {
          id
          title
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
  ADD_TUTOR,
  CHANGE_TUTOR,
  TRANSFER_MEMBER,
  SWAP_MEMBERS,
  ADD_MEMBER,
  REMOVE_MEMBER,
  REMOVE_TUTOR,
};
