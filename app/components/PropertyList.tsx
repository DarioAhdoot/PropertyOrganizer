import { IconButton, DataTable, Searchbar } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  useRecoilState,
} from 'recoil';

import {
  propertiesAtom,
  filterTextAtom,
} from '../state';
import { listProperties, createProperty } from '../graphql';
import { ListingType, PropertyType, Property } from '../GraphQLAPI';

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

const PropertyList = ({ navigation }: { navigation: any}) => {
  const [properties, setProperties] = useRecoilState(propertiesAtom);
  const [filterText, setFilterText] = useRecoilState(filterTextAtom);
  const filteredProperties = properties.filter((property) => {
    return property.address.toLowerCase().includes(filterText.toLowerCase());
  });
  // console.log(`FILTERED PROPERTIES: ${JSON.stringify(filteredProperties)}`);

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
        <IconButton
          icon='filter'
          size={20}
          onPress={async () => {
            setProperties(await listProperties());
          }}
        />
        <IconButton
          icon='plus'
          size={20}
          onPress={ async () => {
            await createProperty({
              address: '287 Bedford Ave, Brooklyn, NY 11211',
              imageUrls: [],
              videoUrls: [],
              listingType: ListingType.rental,
              propertySpec: {
                propertyType: PropertyType.apartment,
                bedrooms: 2,
                bathrooms: 1,
                area: 100,
              },
              rentalInfo: {
                rentalPrice: 1000,
                utilities: 100,
              }
            })

            setProperties(await listProperties());
          }}
        />
      </View>
      <ScrollView style={style.container}>
        <DataTable style={style.dataTable}>
          <DataTable.Header>
            <DataTable.Title>Address</DataTable.Title>
            <DataTable.Title>Specs</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
          </DataTable.Header>
          {
            filteredProperties.map(property => (
              <DataTable.Row
                key={property.id}
                onPress={() => navigation.navigate('PropertyPage', { property })}>
                <DataTable.Cell>{property.address}</DataTable.Cell>
                <DataTable.Cell>{JSON.stringify(property.propertySpec)}</DataTable.Cell>
                <DataTable.Cell numeric>{property.rentalInfo?.rentalPrice}</DataTable.Cell>
              </DataTable.Row>
            ))
          }
        </DataTable>
      </ScrollView>
    </View>
  );
}

export default PropertyList;