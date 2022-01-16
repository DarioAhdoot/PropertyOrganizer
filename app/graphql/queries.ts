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
        floor
        floors
        diningRoom
        balcony
        patio
        lift
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
        deposit
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
      owner
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
          floor
          floors
          diningRoom
          balcony
          patio
          lift
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
          deposit
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
        owner
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
          floor
          floors
          diningRoom
          balcony
          patio
          lift
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
          deposit
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
        owner
      }
      nextToken
      startedAt
    }
  }
`;
