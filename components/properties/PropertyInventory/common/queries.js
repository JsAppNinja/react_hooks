import gql from 'graphql-tag';

export const SEARCH_ROOM_TYPES_RATES = gql`
  query searchInventoryQuery($propertyId: Int!, $startDate: Date!) {
    searchInventory(propertyId: $propertyId, startDate: $startDate) {
      id
      rates {
        date
        id
        inventory
        price
        stopSold
      }
    }
  }
`;

export const SEARCH_ROOM_TYPE_RATES = gql`
  query searchInventoryQuery(
    $propertyId: Int!
    $startDate: Date!
    $roomTypeId: Int
  ) {
    searchInventory(
      propertyId: $propertyId
      startDate: $startDate
      roomTypeId: $roomTypeId
    ) {
      id
      description
      name
      roomCode
      rates {
        date
        id
        inventory
        price
      }
    }
  }
`;

export const SAVE_ROOM_TYPE_MUTATION = gql`
  mutation saveRoomType(
    $name: String!
    $description: [String!]
    $id: Int
    $propertyId: Int
    $roomCode: String
    $maxOccupancy: Int
  ) {
    saveRoomType(
      name: $name
      description: $description
      id: $id
      propertyId: $propertyId
      roomCode: $roomCode
      maxOccupancy: $maxOccupancy
    ) {
      id
      name
      description
      maxOccupancy
    }
  }
`;

export const SAVE_RATES_MUTATION = gql`
  mutation saveRates(
    $dateRange: DateRangeInput!
    $daysOfWeek: WeekdaysInput
    $incrementInventory: Boolean
    $inventory: Int
    $price: Int
    $roomTypeId: Int!
    $stopSold: Boolean
  ) {
    saveRates(
      dateRange: $dateRange
      daysOfWeek: $daysOfWeek
      incrementInventory: $incrementInventory
      inventory: $inventory
      price: $price
      roomTypeId: $roomTypeId
      stopSold: $stopSold
    ) {
      id
    }
  }
`;

export const CLOSE_PROPERTY_MUTATION = gql`
  mutation closeProperty(
    $dates: [Date!]!
    $propertyId: Int!
    $stopSold: Boolean!
  ) {
    closeProperty(dates: $dates, propertyId: $propertyId, stopSold: $stopSold) {
      id
    }
  }
`;
