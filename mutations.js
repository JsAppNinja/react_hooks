import gql from 'graphql-tag';

import { PROPERTY_FRAGMENT } from './queries';

export const SAVE_PROPERTY_MUTATION = gql`
  mutation saveProperty(
    $id: Int
    $userId: Int
    $cityId: Int
    $name: String
    $fees: [FeeInput!]
    $primaryAddress: AddressInput
    $phone: String
    $website: String
    $neighborhood: String
    $rateSource: String
    $rateSourceCode: String
    $rateCode: String
    $rackRateCode: String
    $otherRateSource: String
    $social: SocialAccountsInput
    $contacts: [ContactInput!]
    $description: String
    $amenities: [String!]
    $notes: [String!]
    $completedHotelOnboarding: Boolean
    $cancelWithinAmount: Int
    $taxesPaidAtBooking: Boolean
    $cancelWithinUnit: CancelWithinUnit
    $cancellationCharge: CancellationCharge
    $nonRefundable: Boolean
  ) {
    saveProperty(
      id: $id
      userId: $userId
      cityId: $cityId
      name: $name
      fees: $fees
      primaryAddress: $primaryAddress
      phone: $phone
      website: $website
      neighborhood: $neighborhood
      rateSource: $rateSource
      rateSourceCode: $rateSourceCode
      rateCode: $rateCode
      rackRateCode: $rackRateCode
      otherRateSource: $otherRateSource
      social: $social
      contacts: $contacts
      description: $description
      amenities: $amenities
      notes: $notes
      completedHotelOnboarding: $completedHotelOnboarding
      cancelWithinAmount: $cancelWithinAmount
      taxesPaidAtBooking: $taxesPaidAtBooking
      cancelWithinUnit: $cancelWithinUnit
      cancellationCharge: $cancellationCharge
      nonRefundable: $nonRefundable
    ) {
      ...propertyFields
    }
  }
  ${PROPERTY_FRAGMENT}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: Int!
    $firstName: String
    $lastName: String
    $phone: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
