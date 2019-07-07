import gql from 'graphql-tag';

export const SocialAuthMutation = gql`
    mutation ($provider: string, $accessToken: string) {
       socialAuth(provider: $provider, accessToken: $accessToken){
          social{
              uid
              user{
                  username
                  asAtsign
              }
          }
       }
    }`;
