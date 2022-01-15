import { DataTable, Searchbar } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import fetch from 'isomorphic-fetch';

import {
  useRecoilState,
} from 'recoil';

import {
  propertiesAtom,
  filterTextAtom,
} from '../state';
import { listProperties, createProperty, deleteProperty } from '../GraphQLAPI';
import { ListingType, PropertyType, Property } from '../models'; 

const style = StyleSheet.create({
  container: {
  },
  filterBar: {
    paddingTop: 30,
    paddingStart: 10,
    paddingEnd: 10,
    flexDirection: 'row',
  },
  searchBar: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  dataTable: {
    paddingStart: 10,
    paddingEnd: 10,
  },
});

const PropertyList = ({ navigation }: { navigation: any }) => {
  const [properties, setProperties] = useRecoilState(propertiesAtom);
  const [filterText, setFilterText] = useRecoilState(filterTextAtom);
  const filteredProperties = properties.filter((property) => {
    return property.address.toLowerCase().includes(filterText.toLowerCase());
  });
  // console.log(`FILTERED PROPERTIES: ${JSON.stringify(filteredProperties)}`);
  console.log(`Navigation: ${JSON.stringify(navigation)}`);

  return (
    <View style={style.container}>
      <View style={style.filterBar}>
        <Searchbar
          placeholder='Search'
          onChangeText={(text) => { setFilterText(text) }}
          value={filterText}
          style={style.searchBar}
          autoComplete={false}
        />
        <Button
          icon={{
            name: 'filter',
            type: 'font-awesome-5',
            size: 20,
            color: 'black',
          }}
          type='clear'
          onPress={ async () => {
            setProperties(await listProperties());
          }}
        />
      </View>
      <ScrollView style={style.container}>
        <DataTable style={style.dataTable}>
          <DataTable.Header>
            <DataTable.Title>Address</DataTable.Title>
            <DataTable.Title>Specs</DataTable.Title>
            <DataTable.Title numeric style={{ width: 100 }}>Price</DataTable.Title>
            <DataTable.Title>Ops</DataTable.Title>
          </DataTable.Header>
          {
            filteredProperties.map(property => (
              <DataTable.Row
                key={property.id}
                onPress={() => navigation.navigate('PropertyDetail', { property })}>
                <DataTable.Cell>{property.address}</DataTable.Cell>
                <DataTable.Cell>{JSON.stringify(property.propertySpec)}</DataTable.Cell>
                <DataTable.Cell numeric>{property.rentalInfo?.rentalPrice}</DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    icon={{
                      name: 'pen',
                      type: 'font-awesome-5',
                      size: 16,
                      color: 'black',
                    }}
                    type='clear'
                    onPress={async () => {
                      navigation.navigate('PropertyUpdate', { property })
                    }}
                  />
                  <Button
                    icon={{
                      name: 'trash',
                      type: 'font-awesome-5',
                      size: 16,
                      color: 'black',
                    }}
                    type='clear'
                    onPress={ async () => {
                      try {
                        await deleteProperty({ id: property.id, _version: property._version });
                        let newProperties = [...properties];
                        newProperties = newProperties.filter(p => p.id !== property.id);
                        setProperties(newProperties);
                      } catch (error) {
                        console.log(`Error deleting property: ${error}`);
                      }
                    }}
                  />
                  <Button
                    icon={{
                      name: 'share-alt',
                      type: 'font-awesome-5',
                      size: 16,
                      color: 'black',
                    }}
                    type='clear'
                  // onPress={async () => {
                  //   setProperties(await listProperties());
                  // }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))
          }
        </DataTable>
      </ScrollView>
    </View>
  );
}

export default PropertyList;