/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($owner: String) {
    onCreateProperty(owner: $owner) {
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
export const onUpdateProperty = /* GraphQL */ `
  subscription OnUpdateProperty($owner: String) {
    onUpdateProperty(owner: $owner) {
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
export const onDeleteProperty = /* GraphQL */ `
  subscription OnDeleteProperty($owner: String) {
    onDeleteProperty(owner: $owner) {
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
