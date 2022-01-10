/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      title
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
        washer
        dryer
        dishwasher
        ac
        heat
      }
      listingType
      rentalInfo {
        rentalPrice
        utilities
        leaseLength
        parkingPrice
        furnished
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
        title
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
          washer
          dryer
          dishwasher
          ac
          heat
        }
        listingType
        rentalInfo {
          rentalPrice
          utilities
          leaseLength
          parkingPrice
          furnished
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
        title
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
          washer
          dryer
          dishwasher
          ac
          heat
        }
        listingType
        rentalInfo {
          rentalPrice
          utilities
          leaseLength
          parkingPrice
          furnished
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
