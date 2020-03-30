import gql from 'apollo-boost';

export const FETCH_ALL_SKILLS = gql`
    {
        getSkills {
            id
        }
    }
`;
