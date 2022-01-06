import Amplify from 'aws-amplify';
import config from '../aws-exports';
import API, { graphqlOperation } from '@aws-amplify/api';

import { listProperties as listPropertiesQuery, getProperty } from './queries';
import { createProperty as createPropertyMutattion, updateProperty, deleteProperty } from './mutations';
import * as Types from '../GraphQLAPI';

Amplify.configure(config);

export async function listProperties(): Promise<Types.Property[]> {
  console.log('In listProperties');
  const listQueryVariables: Types.ListPropertiesQueryVariables = {};
  console.log('-> calling API.graphql');
  const result: any = await API.graphql(graphqlOperation(listPropertiesQuery, listQueryVariables));
  console.log(`-> returned from API.graphql: ${JSON.stringify(result)}`);
  if (result.data) {
    const listQ: Types.ListPropertiesQuery = result.data;
    if (listQ.listProperties && listQ.listProperties.items) {
      return listQ.listProperties.items as Types.Property[];
    } else {
      throw new Error('listProperties query failed');
    }
  } else {
    throw new Error('listProperties query failed');
  }
}

export async function createProperty(input: Types.CreatePropertyInput): Promise<Types.Property> {
  console.log(`Calling createProperty with input: ${JSON.stringify(input)}`);

  const createMutationVariables: Types.CreatePropertyMutationVariables = { input };
  const result: any = await API.graphql(graphqlOperation(createPropertyMutattion, createMutationVariables));
  if (result.data) {
    const createM: Types.CreatePropertyMutation = result.data;
    if (createM.createProperty) {
      return createM.createProperty as Types.Property;
    } else {
      throw new Error('createProperty mutation failed');
    }
  } else {
    throw new Error('createProperty mutation failed');
  }
}
