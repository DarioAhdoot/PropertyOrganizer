import { Component, ReactNode } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import SwiperFlatList from 'react-native-swiper-flatlist';
import * as Linking from 'expo-linking';
import { Property, RentalInfo } from '../API';
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
    height: 24
  }
});


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
        <PropertyInfoTable property={this.property} />
        <ContactInfoTable contactEmail={this.property.contactEmail} contactName={this.property.contactName} contactPhone={this.property.contactPhone} />

        {rentalInfo ? <RentalInfoTable rentalInfo={rentalInfo} /> : null }
      </View>
    )
  }
}

type ImageUrlsProps = {
  imageUrls?: string[] | null
}

const ImageSwiper: React.FunctionComponent<ImageUrlsProps> = ({
  imageUrls
}) => {
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

type PropertyInfoProps = {
  property: Property
}

const PropertyInfoTable: React.FunctionComponent<PropertyInfoProps> = ({
  property,
}) => {

  const hasListingUrl = !_.isNil(property.listingUrl) && !_.isEmpty(property.listingUrl);
  const hasAddressUrl = !_.isNil(property.addressUrl) && !_.isEmpty(property.addressUrl);
  const hasVideoUrls = !_.isNil(property.addressUrl) && !_.isEmpty(property.addressUrl);

  return (
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
      <Button
        style={ styles.iconButton }
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
        style={styles.iconButton}
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
    </View>

  );
}

type ContactInfoProps = {
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

const ContactInfoTable: React.FunctionComponent<ContactInfoProps> = ({contactName, contactEmail, contactPhone}) => {

  const hasContactPhone = !_.isNil(contactPhone) && !_.isEmpty(contactPhone);
  const hasContactEmail = !_.isNil(contactEmail) && !_.isEmpty(contactEmail);
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{
        flexBasis: 'auto',
        flexGrow: 1,
      }}>
        {contactName || ''}
      </Text>
      <Button
        icon={{
          name: 'phone',
          type: 'font-awesome-5',
          size: 20,
          color: 'black',
        }}
        type='clear'
        disabled={!hasContactPhone}
        onPress={() => Linking.openURL(`phone:${contactPhone}`)}>
      </Button>
      <Button
        icon={{
          name: 'envelope',
          type: 'font-awesome-5',
          size: 20,
          color: 'black',
        }}
        type='clear'
        disabled={!hasContactEmail}
        onPress={() => Linking.openURL(`phone:${contactEmail}`)}>
      </Button>
    </View>

  );
};

type RentalInfoTableProps = {
  rentalInfo: RentalInfo;
};

const RentalInfoTable: React.FunctionComponent<RentalInfoTableProps> = ({
  rentalInfo,
}) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >Rent</Text>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >Utilities</Text>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >Lease Length</Text>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >Parking Price</Text>
      </View>
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >{`${rentalInfo.rentalPrice ?? ''}`}</Text>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >{`${rentalInfo.utilities ?? ''}`}</Text>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >{`${rentalInfo.leaseLength ?? ''}`}</Text>
        <Text style={{ flex: 1, alignSelf: 'stretch' }} >{`${rentalInfo.parkingPrice ?? ''}`}</Text>
      </View>
    </View>
  );
};


export default PropertyDetail;

// NavigationType: replace,push,pop,popToTop,goBack,navigate,reset,setParams,dispatch,isFocused,canGoBack,getParent,getState,addListener,removeListener,setOptions,constructor,__defineGetter__,__defineSetter__,hasOwnProperty,__lookupGetter__,__lookupSetter__,isPrototypeOf,propertyIsEnumerable,toString,valueOf,toLocaleString
