import gql from 'graphql-tag';

export const PROPERTY_FRAGMENT = gql`
  fragment propertyFields on Property {
    id
    name
    images {
      id
      publicUrl
    }
    status
    city {
      id
      name
    }
    user {
      id
      username
      email
      completedHotelOnboarding
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
    rateSource
    rateSourceCode
    rateCode
    rackRateCode
    cancelWithinAmount
    taxesPaidAtBooking
    cancelWithinUnit
    cancellationCharge
    nonRefundable
  }
`;

export const GET_PROPERTY_QUERY = gql`
  query getProperty($id: Int!) {
    property(id: $id) {
      ...propertyFields
    }
  }
  ${PROPERTY_FRAGMENT}
`;

export const GET_BOOKINGS = gql`
  query bookings(
    $userId: Int
    $agentId: Int
    $startDate: Date
    $endDate: Date
    $order: BookingOrder
    $descending: Boolean
    $query: String
    $per: Int
    $page: Int
  ) {
    bookings(
      userId: $userId
      agentId: $agentId
      startDate: $startDate
      endDate: $endDate
      order: $order
      descending: $descending
      query: $query
      per: $per
      page: $page
    ) {
      nodes {
        id
        confirmationNumber
        guestFirstName
        guestLastName
        user {
          id
          firstName
          lastName
          username
        }
        agent {
          id
          username
          firstName
          lastName
        }
        reservation {
          total
          subtotal
          taxes
          fees
          startDate
          endDate
          roomType {
            name
            rates {
              price
            }
            property {
              name
              city {
                name
              }
            }
          }
        }
      }
      pageInfo {
        totalCount
      }
    }
  }
`;

export const CURRENT_USER_PHOTO = gql`
  query currentUserPhotos {
    currentUser {
      id
      image {
        id
        publicUrl
      }
    }
  }
`;
export const dataPathToCurrentUserPhoto = 'currentUser.image.publicUrl';
