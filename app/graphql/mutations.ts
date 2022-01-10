/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
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
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
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
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
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
