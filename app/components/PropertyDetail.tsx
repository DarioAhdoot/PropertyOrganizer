import { Component, ReactNode } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { Headline, Subheading } from 'react-native-paper';
import Icon from '@mdi/react'
import {
  mdiCurrencyEur,
  mdiAirConditioner,
  mdiDogSide,
 } from '@mdi/js'
import SwiperFlatList from 'react-native-swiper-flatlist';
import * as Linking from 'expo-linking';
import { Property, PropertySpec, RentalInfo } from '../models';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    width,
    height: 300,
    resizeMode: 'contain',
  },
  iconButton: {
    width: 24,
    height: 24,
    margin: 4,
  },
});


type PropertyProps = {
  property: Property
}

class PropertyDetail extends Component {
  property: Property

  constructor(props: any) {
    super(props);
    console.log(`PROPERTY PAGE: ${JSON.stringify(props)}`);

    this.property = props.route.params.property;

    const { navigation } = props;
    navigation.setOptions({ title: this.property.address });
  }

  render(): ReactNode {
    const rentalInfo = this.property.rentalInfo;

    return (
      <View>
        <ImageSwiper imageUrls={this.property.imageUrls} />
        <Headline style={{ minHeight: 30 }}>{this.property.title}</Headline>
        <LinksTable property={this.property} />

        {rentalInfo ? <RentalInfoTable rentalInfo={rentalInfo} /> : null}
        <PropertySpecSection property={this.property} />
      </View>
    )
  }
}

type ImageUrlsProps = {
  imageUrls?: string[] | null
}

const ImageSwiper: React.FunctionComponent<ImageUrlsProps> = ({imageUrls}) => {
  const items = imageUrls ? imageUrls.map((imageUrl) => {
    return {
      url: imageUrl,
    };
  }) : [{ url: require('../assets/no-image.jpg') }];

  return (
    <SwiperFlatList
      index={0}
      data={items}
      renderItem={({ item }) => <Image style={styles.image} source={{ uri: item.url }} />}
    />
  );
}

const LinksTable: React.FunctionComponent<PropertyProps> = ({property}) => {
  const hasListingUrl = !_.isNil(property.listingUrl) && !_.isEmpty(property.listingUrl);
  const hasAddressUrl = !_.isNil(property.addressUrl) && !_.isEmpty(property.addressUrl);
  const hasVideoUrls = !_.isNil(property.addressUrl) && !_.isEmpty(property.addressUrl);
  const hasContactPhone = !_.isNil(property.contactPhone) && !_.isEmpty(property.contactPhone);
  const hasContactEmail = !_.isNil(property.contactEmail) && !_.isEmpty(property.contactEmail);

  return (
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', minHeight: 40 }}>
      <Button
        style={styles.iconButton}
        icon={{
          name: 'home',
          type: 'font-awesome-5',
          size: 20,
          color: 'black',
        }}
        type='clear'
        disabled={!hasListingUrl}
        onPress={() => Linking.openURL(property.listingUrl!)}>
      </Button>
      <Button
        style={styles.iconButton}
        icon={{
          name: 'map-marked',
          type: 'font-awesome-5',
          size: 20,
          color: 'black',
        }}
        type='clear'
        disabled={!hasAddressUrl}
        onPress={() => Linking.openURL(property.addressUrl!)}>
      </Button>
      <Button
        style={{
          ...styles.iconButton,
          flexBasis: 'auto',
          flexGrow: 1,
        }}
        icon={{
          name: 'video',
          type: 'font-awesome-5',
          size: 20,
          color: 'black',
        }}
        type='clear'
        disabled={!hasVideoUrls}
        onPress={() => Linking.openURL(property.videoUrls![0])}>
      </Button>
      <Text>
        Contact: {property.contactName || ''}
      </Text>
      <Button
        style={styles.iconButton}
        icon={{
          name: 'phone',
          type: 'font-awesome-5',
          size: 20,
          color: 'black',
        }}
        type='clear'
        disabled={!hasContactPhone}
        onPress={() => Linking.openURL(`phone:${property.contactPhone}`)}>
      </Button>
      <Button
        style={styles.iconButton}
        icon={{
          name: 'envelope',
          type: 'font-awesome-5',
          size: 20,
          color: 'black',
        }}
        type='clear'
        disabled={!hasContactEmail}
        onPress={() => Linking.openURL(`phone:${property.contactEmail}`)}>
      </Button>
    </View>
  );
}

type RentalInfoProps = {
  rentalInfo: RentalInfo
}
const RentalInfoTable: React.FunctionComponent<RentalInfoProps> = ({ rentalInfo }) => {
  
  return (
    <View>
      <Subheading>Rental Info</Subheading>
      <Text>Rent: {rentalInfo.rentalPrice || '?'} €/month</Text>
      <Text>Utilities: {rentalInfo.utilities || '?'} €/month</Text>
      <Text>Parking: {rentalInfo.parkingPrice || '?'} €/month</Text>
      <Text>Lease Length: {rentalInfo.leaseLength || '?'} months</Text>
      <Text>Furnished: {rentalInfo.furnished ? 'Yes' : (rentalInfo.furnished === false ? 'No' : '?')}</Text>
      <Text>Pets: {rentalInfo.pets ? 'Yes' : (rentalInfo.pets === false ? 'No' : '?')}</Text>
    </View>
  );

  const data = [
    { rentalPrice: rentalInfo.rentalPrice },
    { utilities: rentalInfo.utilities },
    { leaseLength: rentalInfo.leaseLength },
    { parkingPrice: rentalInfo.parkingPrice },
    { furnished: rentalInfo.furnished },
    { pets: rentalInfo.pets },
  ];

  const renderItem = ({ item }: { item: any}) => {
    return (
      <View>
        <Icon
          path={mdiAirConditioner}
          size={1}
        ></Icon>
      </View>
    );
  };

  return (
    <FlatList 
      data={Object.entries(rentalInfo)}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(item) => item[0]}>
    </FlatList>
  );
};

const PropertySpecSection: React.FunctionComponent<PropertyProps> = ({property}) => {
  const spec = property.propertySpec;

  return (
    <View>
      <Subheading>Specs:</Subheading>
      <Text>Type: {spec.propertyType}</Text>
      <Text>Bedrooms: {spec.bedrooms || '?'}</Text>
      <Text>Bathrooms: {spec.bathrooms || '?'}</Text>
      <Text>Area: {spec.area || '?'}m²</Text>
    </View>
  );
};


export default PropertyDetail;

// NavigationType: replace,push,pop,popToTop,goBack,navigate,reset,setParams,dispatch,isFocused,canGoBack,getParent,getState,addListener,removeListener,setOptions,constructor,__defineGetter__,__defineSetter__,hasOwnProperty,__lookupGetter__,__lookupSetter__,isPrototypeOf,propertyIsEnumerable,toString,valueOf,toLocaleString
