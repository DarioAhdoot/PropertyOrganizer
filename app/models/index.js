// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ListingType = {
  "RENTAL": "rental",
  "PURCHASE": "purchase"
};

const PropertyType = {
  "HOUSE": "house",
  "APARTMENT": "apartment",
  "LOFT": "loft"
};

const { Property, PropertySpec, PurchaseInfo, RentalInfo } = initSchema(schema);

export {
  Property,
  ListingType,
  PropertyType,
  PropertySpec,
  PurchaseInfo,
  RentalInfo
};