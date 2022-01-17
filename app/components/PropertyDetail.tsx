import { Storage } from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
// @ts-ignore
import { S3Image } from 'aws-amplify-react-native';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { Modal, Progress, Row } from 'native-base';
import { Button } from 'react-native-elements';
import { Headline, Subheading } from 'react-native-paper';
import Icon from '@mdi/react'
import {
  mdiAirConditioner,
} from '@mdi/js'
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useFilePicker } from 'use-file-picker';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  useRecoilState,
} from 'recoil';
import * as Linking from 'expo-linking';
import { updateProperty } from '../GraphQLAPI';
import { UpdatePropertyInput, Property, RentalInfo } from '../API';
import {
  propertiesAtom,
} from '../state';

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

interface PropertyProps {
  property: Property
}

interface UpdateablePropertyProps extends PropertyProps {
  properties: Property[]
  setProperty: (property: Property) => void
  setProperties: (properties: Property[]) => void
}

const PropertyDetail = (props: any) => {

  const [property, setProperty] = useState<Property>(props.route.params.property);
  const [properties, setProperties] = useRecoilState(propertiesAtom);

  // Can't call it synchronously because we're not allowed to do so while rendering
  const { navigation } = props;
  setTimeout(() => navigation.setOptions({ title: property.address }));

  return (
    <View>
      <ImageSwiper property={property} setProperty={setProperty} properties={properties} setProperties={setProperties} />
      <Headline style={{ minHeight: 30 }}>{property.title}</Headline>
      <LinksTable property={property} />

      {property.rentalInfo ? <RentalInfoTable rentalInfo={property.rentalInfo} /> : null}
      <PropertySpecSection property={property} />
    </View>
  );
};

const ImageSwiper: React.FunctionComponent<UpdateablePropertyProps> = ({ property, setProperty, properties, setProperties }) => {
  const imageKeys = property.imageUrls;
  const items = imageKeys ? imageKeys.map((key) => { return { key }; }) : [{ key: 'no-image.jpg' }];

  const [openFileSelector, { filesContent, loading, errors, clear }] = useFilePicker({
    readAs: 'ArrayBuffer',
    accept: 'image/*',
    multiple: false,
    readFilesContent: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 1,
    maxFileSize: 50 // in megabytes
  });

  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadProgressText, setUploadProgressText] = useState<string>('');

  console.log(`loading: ${loading}`);
  console.log(`uploading: ${loading}`);
  console.log(`fileContent: ${filesContent.length}`);

  if (!loading && !uploading && filesContent.length > 0) {
    // Clear so we don't get in here again
    clear();

    setUploading(true);

    const propertyId = property.id;
    const file = filesContent[0];
    const fileName = file.name;
    const extension = fileName.split('.').pop();
    const fileKey = `${propertyId}/${uuidv4()}${extension}`;
    const content = file.content;

    Storage.put(fileKey, content, {
      progressCallback(progress) {
        console.log(`Uploading progress: ${progress.loaded}/${progress.total}`);
        setUploadProgressText(`Uploading file: ${progress.loaded}/${progress.total}%`);
        setUploadProgress(progress.loaded / progress.total);
      },
    }).then(async (event) => {
      const newImageUrls: string[] = property.imageUrls ? [...property.imageUrls, fileKey] : [fileKey];
      const input: UpdatePropertyInput = { id: propertyId, imageUrls: newImageUrls, _version: property._version };

      setUploadProgressText(`Updating database...`);
      const updatedProperty = await updateProperty(input);
      setProperty(updatedProperty);

      const index = properties.findIndex((p) => p.id === propertyId);
      const newProperties = [...properties];
      newProperties[index] = updatedProperty;
      setProperties(newProperties);

      setUploading(false);
    }).catch((e) => {
      console.log(`Error uploading ${fileKey}!`);
      console.error(e);
      setUploading(false);
    });
  }

  return (
    <View>
      <View>
        <SwiperFlatList
          index={0}
          data={items}
          showPagination={true}
          renderItem={({ item }) => {
            if (Platform.OS === 'web') {
              return <AmplifyS3Image style={{
                width,
                height: 300,
              }}
                imgKey={item.key} />
            } else {
              return <S3Image style={styles.image} imgKey={item.key} level='public' resizeMode='contain' />
            }
          }}>
        </SwiperFlatList>
      </View>
      <Row>
        <Button title={'Add Image'} onPress={async () => { openFileSelector(); }} />
        <Button title={'Remove Image'} onPress={() => { console.log('Remove Image'); }} />
      </Row>
      {uploading &&
        <Modal isOpen={uploading}>
          <Modal.Content maxWidth="400px">
            {/* <Modal.CloseButton /> */}
            <Modal.Header>Upload Progress</Modal.Header>
            <Modal.Body>
              <Progress value={uploadProgress * 100} />
              {uploadProgressText && <Text>{uploadProgressText}</Text>}
            </Modal.Body>
          </Modal.Content>
        </Modal>
      }
    </View>
  );
}

const LinksTable: React.FunctionComponent<PropertyProps> = ({ property }) => {
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

  const renderItem = ({ item }: { item: any }) => {
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

const PropertySpecSection: React.FunctionComponent<PropertyProps> = ({ property }) => {
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
