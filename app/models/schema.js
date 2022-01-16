export const schema = {
    "models": {
        "Property": {
            "name": "Property",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "address": {
                    "name": "address",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "addressUrl": {
                    "name": "addressUrl",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "listingUrl": {
                    "name": "listingUrl",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "imageUrls": {
                    "name": "imageUrls",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "videoUrls": {
                    "name": "videoUrls",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "propertySpec": {
                    "name": "propertySpec",
                    "isArray": false,
                    "type": {
                        "nonModel": "PropertySpec"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "listingType": {
                    "name": "listingType",
                    "isArray": false,
                    "type": {
                        "enum": "ListingType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "rentalInfo": {
                    "name": "rentalInfo",
                    "isArray": false,
                    "type": {
                        "nonModel": "RentalInfo"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "purchaseInfo": {
                    "name": "purchaseInfo",
                    "isArray": false,
                    "type": {
                        "nonModel": "PurchaseInfo"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "contactName": {
                    "name": "contactName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "contactPhone": {
                    "name": "contactPhone",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "contactEmail": {
                    "name": "contactEmail",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "notes": {
                    "name": "notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Properties",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "ListingType": {
            "name": "ListingType",
            "values": [
                "rental",
                "purchase"
            ]
        },
        "PropertyType": {
            "name": "PropertyType",
            "values": [
                "house",
                "apartment",
                "loft"
            ]
        }
    },
    "nonModels": {
        "PropertySpec": {
            "name": "PropertySpec",
            "fields": {
                "propertyType": {
                    "name": "propertyType",
                    "isArray": false,
                    "type": {
                        "enum": "PropertyType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "bedrooms": {
                    "name": "bedrooms",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "bathrooms": {
                    "name": "bathrooms",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "area": {
                    "name": "area",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "floor": {
                    "name": "floor",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "floors": {
                    "name": "floors",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "diningRoom": {
                    "name": "diningRoom",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "balcony": {
                    "name": "balcony",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "patio": {
                    "name": "patio",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "lift": {
                    "name": "lift",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "parking": {
                    "name": "parking",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "washer": {
                    "name": "washer",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "dryer": {
                    "name": "dryer",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "dishwasher": {
                    "name": "dishwasher",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "ac": {
                    "name": "ac",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "heat": {
                    "name": "heat",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "PurchaseInfo": {
            "name": "PurchaseInfo",
            "fields": {
                "askingPrice": {
                    "name": "askingPrice",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "RentalInfo": {
            "name": "RentalInfo",
            "fields": {
                "rentalPrice": {
                    "name": "rentalPrice",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "deposit": {
                    "name": "deposit",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "utilities": {
                    "name": "utilities",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "leaseLength": {
                    "name": "leaseLength",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "parkingPrice": {
                    "name": "parkingPrice",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "furnished": {
                    "name": "furnished",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "pets": {
                    "name": "pets",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "version": "344157ce803f8c600913ab1575e58ea0"
};