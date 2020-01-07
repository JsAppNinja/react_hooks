import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $token: String!
    $password: String!
    $username: String
    $firstName: String
    $lastName: String
    $email: String
  ) {
    resetPassword(
      token: $token
      password: $password
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
      firstName
      lastName
      username
      email
      completedHotelOnboarding
      admin
      agent
      hotel
      hasSearchAccess
      ownedProperties {
        id
        name
        city {
          id
          name
        }
        primaryAddress {
          line1
          line2
          line3
          city
          state
          zipcode
        }
        phone
        website
        neighborhood
        social {
          instagram {
            handle
          }
          facebook {
            handle
          }
          linkedin {
            handle
          }
        }
        contacts {
          name
          title
          phone
          email
          departmentName
        }
        description
        amenities
        notes
        fees {
          amount
          feeType
          name
        }
        roomTypes {
          id
          name
          description
        }
        cancelWithinAmount
        taxesPaidAtBooking
        cancelWithinUnit
        cancellationCharge
        nonRefundable
      }
      agentProfile {
        id
        bio
        address {
          line1
          city
          state
          zipcode
          country
        }
        phone
        social {
          instagram {
            handle
          }
          facebook {
            handle
          }
          linkedin {
            handle
          }
          twitter {
            handle
          }
          youtube {
            handle
          }
          blog {
            handle
          }
          other {
            handle
          }
        }
      }
      recommendedProperties {
        name
        id
        city {
          id
          name
        }
      }
    }
  }
`;
