/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePropertyInput = {
  id?: string | null,
  address: string,
  addressUrl?: string | null,
  listingUrl?: string | null,
  imageUrls?: Array< string | null > | null,
  videoUrls?: Array< string | null > | null,
  propertySpec: PropertySpecInput,
  listingType: ListingType,
  rentalInfo?: RentalInfoInput | null,
  purchaseInfo?: PurchaseInfoInput | null,
  _version?: number | null,
};

export type PropertySpecInput = {
  propertyType: PropertyType,
  bedrooms?: number | null,
  bathrooms?: number | null,
  area?: number | null,
  diningRoom?: boolean | null,
  balcony?: boolean | null,
  patio?: boolean | null,
  floors?: number | null,
};

export enum PropertyType {
  house = "house",
  apartment = "apartment",
  loft = "loft",
  trailer = "trailer",
  shack = "shack",
}


export enum ListingType {
  rental = "rental",
  purchase = "purchase",
}


export type RentalInfoInput = {
  rentalPrice?: number | null,
  utilities?: number | null,
};

export type PurchaseInfoInput = {
  askingPrice?: number | null,
};

export type ModelPropertyConditionInput = {
  address?: ModelStringInput | null,
  addressUrl?: ModelStringInput | null,
  listingUrl?: ModelStringInput | null,
  imageUrls?: ModelStringInput | null,
  videoUrls?: ModelStringInput | null,
  listingType?: ModelListingTypeInput | null,
  and?: Array< ModelPropertyConditionInput | null > | null,
  or?: Array< ModelPropertyConditionInput | null > | null,
  not?: ModelPropertyConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelListingTypeInput = {
  eq?: ListingType | null,
  ne?: ListingType | null,
};

export type Property = {
  __typename: "Property",
  id: string,
  address: string,
  addressUrl?: string | null,
  listingUrl?: string | null,
  imageUrls?: Array< string | null > | null,
  videoUrls?: Array< string | null > | null,
  propertySpec: PropertySpec,
  listingType: ListingType,
  rentalInfo?: RentalInfo | null,
  purchaseInfo?: PurchaseInfo | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type PropertySpec = {
  __typename: "PropertySpec",
  propertyType: PropertyType,
  bedrooms?: number | null,
  bathrooms?: number | null,
  area?: number | null,
  diningRoom?: boolean | null,
  balcony?: boolean | null,
  patio?: boolean | null,
  floors?: number | null,
};

export type RentalInfo = {
  __typename: "RentalInfo",
  rentalPrice?: number | null,
  utilities?: number | null,
};

export type PurchaseInfo = {
  __typename: "PurchaseInfo",
  askingPrice?: number | null,
};

export type UpdatePropertyInput = {
  id: string,
  address?: string | null,
  addressUrl?: string | null,
  listingUrl?: string | null,
  imageUrls?: Array< string | null > | null,
  videoUrls?: Array< string | null > | null,
  propertySpec?: PropertySpecInput | null,
  listingType?: ListingType | null,
  rentalInfo?: RentalInfoInput | null,
  purchaseInfo?: PurchaseInfoInput | null,
  _version?: number | null,
};

export type DeletePropertyInput = {
  id: string,
  _version?: number | null,
};

export type ModelPropertyFilterInput = {
  id?: ModelIDInput | null,
  address?: ModelStringInput | null,
  addressUrl?: ModelStringInput | null,
  listingUrl?: ModelStringInput | null,
  imageUrls?: ModelStringInput | null,
  videoUrls?: ModelStringInput | null,
  listingType?: ModelListingTypeInput | null,
  and?: Array< ModelPropertyFilterInput | null > | null,
  or?: Array< ModelPropertyFilterInput | null > | null,
  not?: ModelPropertyFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelPropertyConnection = {
  __typename: "ModelPropertyConnection",
  items:  Array<Property | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreatePropertyMutationVariables = {
  input: CreatePropertyInput,
  condition?: ModelPropertyConditionInput | null,
};

export type CreatePropertyMutation = {
  createProperty?:  {
    __typename: "Property",
    id: string,
    address: string,
    addressUrl?: string | null,
    listingUrl?: string | null,
    imageUrls?: Array< string | null > | null,
    videoUrls?: Array< string | null > | null,
    propertySpec:  {
      __typename: "PropertySpec",
      propertyType: PropertyType,
      bedrooms?: number | null,
      bathrooms?: number | null,
      area?: number | null,
      diningRoom?: boolean | null,
      balcony?: boolean | null,
      patio?: boolean | null,
      floors?: number | null,
    },
    listingType: ListingType,
    rentalInfo?:  {
      __typename: "RentalInfo",
      rentalPrice?: number | null,
      utilities?: number | null,
    } | null,
    purchaseInfo?:  {
      __typename: "PurchaseInfo",
      askingPrice?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePropertyMutationVariables = {
  input: UpdatePropertyInput,
  condition?: ModelPropertyConditionInput | null,
};

export type UpdatePropertyMutation = {
  updateProperty?:  {
    __typename: "Property",
    id: string,
    address: string,
    addressUrl?: string | null,
    listingUrl?: string | null,
    imageUrls?: Array< string | null > | null,
    videoUrls?: Array< string | null > | null,
    propertySpec:  {
      __typename: "PropertySpec",
      propertyType: PropertyType,
      bedrooms?: number | null,
      bathrooms?: number | null,
      area?: number | null,
      diningRoom?: boolean | null,
      balcony?: boolean | null,
      patio?: boolean | null,
      floors?: number | null,
    },
    listingType: ListingType,
    rentalInfo?:  {
      __typename: "RentalInfo",
      rentalPrice?: number | null,
      utilities?: number | null,
    } | null,
    purchaseInfo?:  {
      __typename: "PurchaseInfo",
      askingPrice?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePropertyMutationVariables = {
  input: DeletePropertyInput,
  condition?: ModelPropertyConditionInput | null,
};

export type DeletePropertyMutation = {
  deleteProperty?:  {
    __typename: "Property",
    id: string,
    address: string,
    addressUrl?: string | null,
    listingUrl?: string | null,
    imageUrls?: Array< string | null > | null,
    videoUrls?: Array< string | null > | null,
    propertySpec:  {
      __typename: "PropertySpec",
      propertyType: PropertyType,
      bedrooms?: number | null,
      bathrooms?: number | null,
      area?: number | null,
      diningRoom?: boolean | null,
      balcony?: boolean | null,
      patio?: boolean | null,
      floors?: number | null,
    },
    listingType: ListingType,
    rentalInfo?:  {
      __typename: "RentalInfo",
      rentalPrice?: number | null,
      utilities?: number | null,
    } | null,
    purchaseInfo?:  {
      __typename: "PurchaseInfo",
      askingPrice?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetPropertyQueryVariables = {
  id: string,
};

export type GetPropertyQuery = {
  getProperty?:  {
    __typename: "Property",
    id: string,
    address: string,
    addressUrl?: string | null,
    listingUrl?: string | null,
    imageUrls?: Array< string | null > | null,
    videoUrls?: Array< string | null > | null,
    propertySpec:  {
      __typename: "PropertySpec",
      propertyType: PropertyType,
      bedrooms?: number | null,
      bathrooms?: number | null,
      area?: number | null,
      diningRoom?: boolean | null,
      balcony?: boolean | null,
      patio?: boolean | null,
      floors?: number | null,
    },
    listingType: ListingType,
    rentalInfo?:  {
      __typename: "RentalInfo",
      rentalPrice?: number | null,
      utilities?: number | null,
    } | null,
    purchaseInfo?:  {
      __typename: "PurchaseInfo",
      askingPrice?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPropertiesQueryVariables = {
  filter?: ModelPropertyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPropertiesQuery = {
  listProperties?:  {
    __typename: "ModelPropertyConnection",
    items:  Array< {
      __typename: "Property",
      id: string,
      address: string,
      addressUrl?: string | null,
      listingUrl?: string | null,
      imageUrls?: Array< string | null > | null,
      videoUrls?: Array< string | null > | null,
      propertySpec:  {
        __typename: "PropertySpec",
        propertyType: PropertyType,
        bedrooms?: number | null,
        bathrooms?: number | null,
        area?: number | null,
        diningRoom?: boolean | null,
        balcony?: boolean | null,
        patio?: boolean | null,
        floors?: number | null,
      },
      listingType: ListingType,
      rentalInfo?:  {
        __typename: "RentalInfo",
        rentalPrice?: number | null,
        utilities?: number | null,
      } | null,
      purchaseInfo?:  {
        __typename: "PurchaseInfo",
        askingPrice?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPropertiesQueryVariables = {
  filter?: ModelPropertyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPropertiesQuery = {
  syncProperties?:  {
    __typename: "ModelPropertyConnection",
    items:  Array< {
      __typename: "Property",
      id: string,
      address: string,
      addressUrl?: string | null,
      listingUrl?: string | null,
      imageUrls?: Array< string | null > | null,
      videoUrls?: Array< string | null > | null,
      propertySpec:  {
        __typename: "PropertySpec",
        propertyType: PropertyType,
        bedrooms?: number | null,
        bathrooms?: number | null,
        area?: number | null,
        diningRoom?: boolean | null,
        balcony?: boolean | null,
        patio?: boolean | null,
        floors?: number | null,
      },
      listingType: ListingType,
      rentalInfo?:  {
        __typename: "RentalInfo",
        rentalPrice?: number | null,
        utilities?: number | null,
      } | null,
      purchaseInfo?:  {
        __typename: "PurchaseInfo",
        askingPrice?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreatePropertySubscription = {
  onCreateProperty?:  {
    __typename: "Property",
    id: string,
    address: string,
    addressUrl?: string | null,
    listingUrl?: string | null,
    imageUrls?: Array< string | null > | null,
    videoUrls?: Array< string | null > | null,
    propertySpec:  {
      __typename: "PropertySpec",
      propertyType: PropertyType,
      bedrooms?: number | null,
      bathrooms?: number | null,
      area?: number | null,
      diningRoom?: boolean | null,
      balcony?: boolean | null,
      patio?: boolean | null,
      floors?: number | null,
    },
    listingType: ListingType,
    rentalInfo?:  {
      __typename: "RentalInfo",
      rentalPrice?: number | null,
      utilities?: number | null,
    } | null,
    purchaseInfo?:  {
      __typename: "PurchaseInfo",
      askingPrice?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePropertySubscription = {
  onUpdateProperty?:  {
    __typename: "Property",
    id: string,
    address: string,
    addressUrl?: string | null,
    listingUrl?: string | null,
    imageUrls?: Array< string | null > | null,
    videoUrls?: Array< string | null > | null,
    propertySpec:  {
      __typename: "PropertySpec",
      propertyType: PropertyType,
      bedrooms?: number | null,
      bathrooms?: number | null,
      area?: number | null,
      diningRoom?: boolean | null,
      balcony?: boolean | null,
      patio?: boolean | null,
      floors?: number | null,
    },
    listingType: ListingType,
    rentalInfo?:  {
      __typename: "RentalInfo",
      rentalPrice?: number | null,
      utilities?: number | null,
    } | null,
    purchaseInfo?:  {
      __typename: "PurchaseInfo",
      askingPrice?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePropertySubscription = {
  onDeleteProperty?:  {
    __typename: "Property",
    id: string,
    address: string,
    addressUrl?: string | null,
    listingUrl?: string | null,
    imageUrls?: Array< string | null > | null,
    videoUrls?: Array< string | null > | null,
    propertySpec:  {
      __typename: "PropertySpec",
      propertyType: PropertyType,
      bedrooms?: number | null,
      bathrooms?: number | null,
      area?: number | null,
      diningRoom?: boolean | null,
      balcony?: boolean | null,
      patio?: boolean | null,
      floors?: number | null,
    },
    listingType: ListingType,
    rentalInfo?:  {
      __typename: "RentalInfo",
      rentalPrice?: number | null,
      utilities?: number | null,
    } | null,
    purchaseInfo?:  {
      __typename: "PurchaseInfo",
      askingPrice?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
