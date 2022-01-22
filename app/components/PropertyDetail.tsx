import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
// @ts-ignore
import { S3Image } from 'aws-amplify-react-native';
import { useState, useEffect } from 'react';
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
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as Linking from 'expo-linking';
import { addImageToProperty, removeImageFromProperty } from '../GraphQLAPI';
import { Property, RentalInfo, PropertyType, ListingType } from '../API';
import { uploadMedia } from '../media';
import { propertiesAtom } from '../state';

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

const currentPropertyAtom = atom<Property>({
  key: 'currentPropertyState',
  default: {
    __typename: 'Property',
    id: '0',
    title: '',
    address: '',
    addressUrl: '',
    propertySpec: {
      __typename: 'PropertySpec',
      propertyType: PropertyType.apartment,
    },
    rentalInfo: {
      __typename: 'RentalInfo',
    },
    listingType: ListingType.rental,
    createdAt: '',
    updatedAt: '',
    _version: 0,
    _lastChangedAt: 0,
  },
});

enum SelectedMedia {
  Image,
  Video,
}
type SelectedMediaIndex = {
  media: SelectedMedia;
  index: number;
}

const selectedMediaIndexAtom = atom<SelectedMediaIndex>({
  key: 'selectedMediaIndexState',
  default: { index: 0, media: SelectedMedia.Image },
});

const PropertyDetail = (props: any) => {
  const [property, setCurrentProperty] = useRecoilState(currentPropertyAtom);

  // Can't call it synchronously because we're not allowed to do so while rendering
  const { navigation } = props;
  useEffect(() => {
    setCurrentProperty(props.route.params.property);
    navigation.setOptions({ title: property.address });
  });

  return (
    <View>
      <ImageSwiper />
      {Platform.OS === 'web' && <MediaUploaderWeb />}
      <Headline style={{ minHeight: 30 }}>{property.title}</Headline>
      <LinksTable />

      {property.rentalInfo ? <RentalInfoTable /> : null}
      <PropertySpecSection />
    </View>
  );
};

const ImageSwiper: React.FunctionComponent = () => {
  const property = useRecoilValue(currentPropertyAtom)!;
  const setSelectedMediaIndex = useSetRecoilState(selectedMediaIndexAtom);

  const imageKeys = property.imageUrls;
  const items = imageKeys ? imageKeys.map((key) => { return { key }; }) : [{ key: 'no-image.jpg' }];
  console.log(`ImageSwiper: ${JSON.stringify(items)}`);

  return (
    <View>
      <SwiperFlatList
        index={0}
        data={items}
        showPagination={true}
        onChangeIndex={(index) => {
          console.log(`Swiper index changed to ${JSON.stringify(index)}`);
          setSelectedMediaIndex({ index: index.index, media: SelectedMedia.Image })
        }}
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
  );
}

const MediaUploaderWeb: React.FunctionComponent = () => {
  const [openFileSelector, { filesContent, loading, errors, clear }] = useFilePicker({
    readAs: 'ArrayBuffer',
    accept: 'image/*',
    multiple: false,
    readFilesContent: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 1,
    maxFileSize: 50 // in megabytes
  });

  const [property, setProperty] = useRecoilState(currentPropertyAtom);
  const [properties, setProperties] = useRecoilState(propertiesAtom);
  const selectedMediaIndex = useRecoilValue(selectedMediaIndexAtom);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>('');
  const showModal = isUploading || isDeleting;

  console.log(`loading: ${loading}`);
  console.log(`uploading: ${isUploading}`);
  console.log(`deleting: ${isDeleting}`);
  console.log(`fileContent: ${filesContent.length}`);

  if (!loading && !isUploading && filesContent.length > 0) {
    // Clear so we don't get in here again
    clear();

    setIsUploading(true);

    const propertyId = property.id;
    const file = filesContent[0];
    const fileName = file.name;
    const extension = fileName.split('.').pop();
    const fileKey = `${propertyId}/${uuidv4()}${extension}`;
    const content = file.content;

    uploadMedia(
      content,
      fileKey,
      (progress) => {
        console.log(`Uploading progress: ${progress.loaded}/${progress.total}`);
        setProgressText(`Uploading file: ${progress.loaded}/${progress.total}%`);
        setProgressValue(progress.loaded / progress.total);
      },
      async (event, error) => {
        if (event) {
          setProgressText(`Updating database...`);

          const updatedProperty = await addImageToProperty(property, fileKey);
          setProperty(updatedProperty);

          const index = properties.findIndex((p) => p.id === propertyId);
          const newProperties = [...properties];
          newProperties[index] = updatedProperty;
          setProperties(newProperties);

          setIsUploading(false);
        } else {
          console.log(`Error uploading ${fileKey}!`);
          console.error(error);
          setIsUploading(false);
        }
      }
    )
  }

  return (
    <View>
      <Row>
        <Button title={'Add Image'} onPress={async () => { openFileSelector(); }} />
        <Button title={'Remove Image'} onPress={async (event) => {
          console.log(`Event: ${JSON.stringify(event.type)}`);
          setIsDeleting(true);
          const updatedProperty = await removeImageFromProperty(property, property.imageUrls![selectedMediaIndex!.index]);
          setProperty(updatedProperty);

          const index = properties.findIndex((p) => p.id === updatedProperty.id);
          const newProperties = [...properties];
          newProperties[index] = updatedProperty;
          setProperties(newProperties);
          setIsDeleting(false);
        }} />
      </Row>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px">
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Progress</Modal.Header>
          <Modal.Body>
            <Progress value={progressValue * 100} />
            {progressText && <Text>{progressText}</Text>}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const LinksTable: React.FunctionComponent = () => {
  const property = useRecoilValue(currentPropertyAtom);
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

const RentalInfoTable: React.FunctionComponent = () => {

  const property = useRecoilValue(currentPropertyAtom);
  const rentalInfo = property.rentalInfo!;

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
};

const PropertySpecSection: React.FunctionComponent = () => {
  const property = useRecoilValue(currentPropertyAtom);
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
