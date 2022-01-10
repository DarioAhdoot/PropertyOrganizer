import API, { graphqlOperation } from '@aws-amplify/api';

import {
  listProperties as listPropertiesQuery,
  getProperty as getPropertyQuery,
} from './graphql/queries';
import {
  createProperty as createPropertyMutattion,
  updateProperty as updatePropertyMutation,
  deleteProperty as deletePropertyMutation,
} from './graphql/mutations';
import * as Types from './API';

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

export async function getProperty(id: string): Promise<Types.Property> {
  console.log('In getProperty');
  const getQueryVariables: Types.GetPropertyQueryVariables = {
    id,
  };
  console.log('-> calling API.graphql');
  const result: any = await API.graphql(graphqlOperation(getPropertyQuery, getQueryVariables));
  console.log(`-> returned from API.graphql: ${JSON.stringify(result)}`);
  if (result.data) {
    const getQ: Types.GetPropertyQuery = result.data;
    if (getQ.getProperty) {
      return getQ.getProperty as Types.Property;
    } else {
      throw new Error('getProperty query failed');
    }
  } else {
    throw new Error('getProperty query failed');
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

export async function updateProperty(input: Types.UpdatePropertyInput): Promise<Types.Property> {
  console.log(`Calling updateProperty with input: ${JSON.stringify(input)}`);

  const updateMutationVariables: Types.UpdatePropertyMutationVariables = { input };
  const result: any = await API.graphql(graphqlOperation(updatePropertyMutation, updateMutationVariables));
  if (result.data) {
    const updateM: Types.UpdatePropertyMutation = result.data;
    if (updateM.updateProperty) {
      return updateM.updateProperty as Types.Property;
    } else {
      throw new Error('updateProperty mutation failed');
    }
  } else {
    throw new Error('updateProperty mutation failed');
  }
}

export async function deleteProperty(input: Types.DeletePropertyInput) {
  console.log(`Calling deleteProperty with input: ${JSON.stringify(input)}`);

  const deleteMutationVariables: Types.DeletePropertyMutationVariables = { input };
  const result: any = await API.graphql(graphqlOperation(deletePropertyMutation, deleteMutationVariables));
  if (result.data) {
    const deleteM: Types.DeletePropertyMutation = result.data;
    if (deleteM.deleteProperty) {
      return deleteM.deleteProperty as Types.Property;
    } else {
      throw new Error('deleteProperty mutation failed');
    }
  } else {
    throw new Error('deleteProperty mutation failed');
  }
}
  