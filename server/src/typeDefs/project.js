import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  type Period {
    start_choose_date: Date
    end_choose_date: Date
  }

  type Project {
    id: ID!
    title: String
    category: String
    school_year: String
    start_date: Date
    end_date: Date
    class_involved: String
    methodology: String
    short_desc: String
    tutors_involved: [User]
    learners_involved: [User]
    subjects: [Subject]
    isvalid: Boolean

    number_of_teams: Int
    number_of_members: Int
    number_of_tutors_per_team: Int
    auto_generate_teams: Boolean
    competence_generate_teams: Boolean
    learners_choose_teams: Boolean
    choose_date_limit: Period
  }

  extend type Query {
    getproject(id: String): Project
    getprojects: [Project]
  }

  input periode_input {
    start_choose_date: Date
    end_choose_date: Date
  }
  extend type Mutation {
    addproject(
      title: String
      category: String
      school_year: String
      start_date: Date
      end_date: Date
      class_involved: String
      methodology: String
      number_of_teams: Int
      number_of_members: Int
      number_of_tutors_per_team: Int

      auto_generate_teams: Boolean
      competence_generate_teams: Boolean
      learners_choose_teams: Boolean
      Choose_date_limit: periode_input
    ): Project

    updateproject(
      id: String
      title: String
      category: String
      school_year: String
      start_date: Date
      end_date: Date
      class_involved: String
      methodology: String
      number_of_teams: Int
      number_of_members: Int
      number_of_tutors_per_team: Int
    ): Project
    deleteproject(id: String): Project

    add_tutors_to_project(id: String, id_tutor: String): Project
    add_learners_to_project(id: String): Project

    add_subjects_to_project(
      id: String
      title: String
      description: String
    ): Project
  }
`;

/*
    validateproject(id: String):Project
 
 tutors_involved(params:tutors_involvedInput):[User]!
        learners_involved(params:learners_involvedInput):[User]!
        subjects(params:subjectsInput):[Subject]!
        
         input tutors_involvedInput{
        limit:Int
        since_id:ID
    }
    input learners_involvedInput{
        limit:Int
        since_id:ID
    }
    input subjectsInput{
        limit:Int
        since_id:ID
    }
    add_s_to_p(id:String,title:String, description:String):Project
    */
/*
        tutors_involved:[User],
        learners_involved:[User],
        subjects:[Subject]


        ,tutors_involved:[String],learners_involved:[String],subjects:[String]


  
 mutation{
  addproject(title:"pifirst",category:"web",school_year:"2019",start_date:"20-3-2019",end_date:"30-5-2020",class_involved:"4eme",methodology:"scrum",number_of_teams:"20",number_of_members:"4",number_of_tutors_per_team:"2",tutors_involved:["1","2"],learners_involved:["1"],subjects:["1"])
  {
    title
	}
}
    */
