import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ListingType {
  RENTAL = "rental",
  PURCHASE = "purchase"
}

export enum PropertyType {
  HOUSE = "house",
  APARTMENT = "apartment",
  LOFT = "loft"
}

export declare class PropertySpec {
  readonly propertyType: PropertyType | keyof typeof PropertyType;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly area?: number;
  readonly diningRoom?: boolean;
  readonly balcony?: boolean;
  readonly patio?: boolean;
  readonly floor?: number;
  readonly lift?: boolean;
  readonly floors?: number;
  readonly parking?: boolean;
  constructor(init: ModelInit<PropertySpec>);
}

export declare class PurchaseInfo {
  readonly askingPrice?: number;
  constructor(init: ModelInit<PurchaseInfo>);
}

export declare class RentalInfo {
  readonly rentalPrice?: number;
  readonly utilities?: number;
  readonly leaseLength?: number;
  readonly parkingPrice?: number;
  readonly furnished?: boolean;
  readonly washer?: boolean;
  readonly dryer?: boolean;
  readonly dishwasher?: boolean;
  readonly ac?: boolean;
  readonly heat?: boolean;
  readonly pets?: boolean;
  constructor(init: ModelInit<RentalInfo>);
}

type PropertyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Property {
  readonly id: string;
  readonly address: string;
  readonly addressUrl?: string;
  readonly listingUrl?: string;
  readonly imageUrls?: string[];
  readonly videoUrls?: string[];
  readonly propertySpec: PropertySpec;
  readonly listingType: ListingType | keyof typeof ListingType;
  readonly rentalInfo?: RentalInfo;
  readonly purchaseInfo?: PurchaseInfo;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly notes?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Property, PropertyMetaData>);
  static copyOf(source: Property, mutator: (draft: MutableModel<Property, PropertyMetaData>) => MutableModel<Property, PropertyMetaData> | void): Property;
}