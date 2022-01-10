/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      address
      addressUrl
      listingUrl
      imageUrls
      videoUrls
      propertySpec {
        propertyType
        bedrooms
        bathrooms
        area
        diningRoom
        balcony
        patio
        floor
        lift
        floors
        parking
      }
      listingType
      rentalInfo {
        rentalPrice
        utilities
        leaseLength
        parkingPrice
        furnished
        washer
        dryer
        dishwasher
        ac
        heat
        pets
      }
      purchaseInfo {
        askingPrice
      }
      contactName
      contactPhone
      contactEmail
      notes
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listProperties = /* GraphQL */ `
  query ListProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        address
        addressUrl
        listingUrl
        imageUrls
        videoUrls
        propertySpec {
          propertyType
          bedrooms
          bathrooms
          area
          diningRoom
          balcony
          patio
          floor
          lift
          floors
          parking
        }
        listingType
        rentalInfo {
          rentalPrice
          utilities
          leaseLength
          parkingPrice
          furnished
          washer
          dryer
          dishwasher
          ac
          heat
          pets
        }
        purchaseInfo {
          askingPrice
        }
        contactName
        contactPhone
        contactEmail
        notes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProperties = /* GraphQL */ `
  query SyncProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProperties(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        address
        addressUrl
        listingUrl
        imageUrls
        videoUrls
        propertySpec {
          propertyType
          bedrooms
          bathrooms
          area
          diningRoom
          balcony
          patio
          floor
          lift
          floors
          parking
        }
        listingType
        rentalInfo {
          rentalPrice
          utilities
          leaseLength
          parkingPrice
          furnished
          washer
          dryer
          dishwasher
          ac
          heat
          pets
        }
        purchaseInfo {
          askingPrice
        }
        contactName
        contactPhone
        contactEmail
        notes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
