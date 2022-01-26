import React from 'react';
import {
  Checkbox,
  Container,
  FormControl,
  Input,
  ScrollView,
  Select,
  TextArea,
  VStack,
  WarningOutlineIcon
} from 'native-base';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useForm, Controller, UseFormHandleSubmit } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/react-native-input';
// import Icon from '@mdi/react'
// import {
//   mdiCurrencyEur,
// } from '@mdi/js'
import {
  useRecoilState,
} from 'recoil';
import _ from 'lodash';
import { CreatePropertyInput, ListingType, PropertyType, UpdatePropertyInput } from '../API';
import { createProperty, updateProperty } from '../GraphQLAPI';
import {
  propertiesAtom,
} from '../state';

const styles = StyleSheet.create({
  container: {
    width: Platform.OS === 'web' ? '500px' : '100%',
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    margin: 4,
  },
  formLabel: {
    width: 120,
    fontWeight: 'bold',
  },
  formRowMultiLine: {
    margin: 4,
  },
  formInput: {
    flex: 1,
  },
});

type SubmitFn = (data: CreatePropertyInput | UpdatePropertyInput) => Promise<void>;

const PropertyAdd = ({ navigation }: { navigation: any }) => {
  const [properties, setProperties] = useRecoilState(propertiesAtom);
  const { control, handleSubmit, formState: { errors } } = useForm<CreatePropertyInput>({
    defaultValues: {
      listingType: ListingType.rental,
      propertySpec: {
        propertyType: PropertyType.apartment
      },
    }
  });
  const onSubmit: SubmitFn = async (data: CreatePropertyInput | UpdatePropertyInput) => {
    try {
      const newProperty = await createProperty(data as CreatePropertyInput);
      let newProperties = [...properties];
      newProperties.push(newProperty);
      setProperties(newProperties);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  // Can't call it synchronously because we're not allowed to do so while rendering
  React.useEffect(() => {
    setTimeout(() => navigation.setOptions({ title: "Add a new property" }));
  });

  return (
    <PropertyAddUpdate
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitButtonText='Add Property'
    />
  )
};

function cleanseData(data: CreatePropertyInput | UpdatePropertyInput) {
  let cleansedData = _.omit(data, ['_lastChangedAt', 'updatedAt', 'createdAt', '_deleted', 'owner']);

  // cleansedData = _.cloneDeepWith(cleansedData, (value) => {
  //   console.log(`Value=${JSON.stringify(value)}`);
  //   if (value === "null") {
  //     console.log("cleansing null");
  //     return null;
  //   }
  //   return undefined;
  // });

  return cleansedData;
}

const PropertyUpdate = (props: any) => {
  const property = props.route.params.property;
  const { navigation } = props;
  console.log(`PropertyUpdate:navigation ${JSON.stringify(navigation)}`);
  console.log(`PropertyUpdate:property ${JSON.stringify(property)}`);
  const [properties, setProperties] = useRecoilState(propertiesAtom);
  const { control, handleSubmit, formState: { errors } } = useForm<UpdatePropertyInput>({
    defaultValues: property
  });

  const onSubmit: SubmitFn = async (data: CreatePropertyInput | UpdatePropertyInput) => {
    try {
      const cleansedData = cleanseData(data);
      const updatedProperty = await updateProperty(cleansedData as UpdatePropertyInput);
      let newProperties = [...properties];
      const index = newProperties.findIndex(p => p.id === updatedProperty.id);
      newProperties[index] = updatedProperty;
      setProperties(newProperties);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  // Can't call it synchronously because we're not allowed to do so while rendering
  setTimeout(() => navigation.setOptions({ title: property.address }));

  return (
    <PropertyAddUpdate
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitButtonText='Update Property'
    />
  )
};

const PropertyAddUpdate = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  submitButtonText,
}: {
  control: any,
  errors: any,
  handleSubmit: UseFormHandleSubmit<CreatePropertyInput | UpdatePropertyInput>,
  onSubmit: SubmitFn,
  submitButtonText: string
}) => {
  if (Platform.OS === 'web') {
    return (
      <Container style={styles.container}>
        <GeneralInfoSection control={control} errors={errors} />
        <RentalInfoSection control={control} errors={errors} />
        <PropertySpecSection control={control} errors={errors} />
        <Button title={submitButtonText} onPress={handleSubmit(onSubmit)} />
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <ScrollView>
        <GeneralInfoSection control={control} errors={errors} />
        <RentalInfoSection control={control} errors={errors} />
        <PropertySpecSection control={control} errors={errors} />
        <Button title={submitButtonText} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </Container>
  );
};


const GeneralInfoSection = ({ control, errors }: { control: any, errors: any }) => {
  return (
    <View>
      <SectionHeader text='General Info' />

      {/* Property Name/Title */}
      <NormalTextInput
        control={control}
        errors={errors}
        title={'Property Name'}
        propName='title'
        placeholder='A name to quickly find this property'
        isRequired={true}
        rules={{
          required: true,
        }}
      />

      {/* Address */}
      <NormalTextInput
        control={control}
        errors={errors}
        title={'Address'}
        propName='address'
        placeholder='The property address'
        isRequired={true}
        rules={{
          required: true,
        }}
      />

      {/* Address URL */}
      <NormalTextInput
        control={control}
        errors={errors}
        title={'Address URL'}
        propName='addressUrl'
        placeholder='Google/Apple Maps URL'
      />

      {/* Listing URL */}
      <NormalTextInput
        control={control}
        errors={errors}
        title={'Listing URL'}
        propName='listingUrl'
        placeholder='The listing URL (e.g. from Idealista)'
      />


      {/* Contact Name */}
      <NormalTextInput
        control={control}
        errors={errors}
        title={'Contact Name'}
        propName='contactName'
        placeholder='The name of the agent/contact'
      />

      {/* Contact Phone# */}
      <PhoneNumberInput
        control={control}
        errors={errors}
        title={'Contact Phone'}
        propName='contactPhone'
      />

      {/* Notes */}
      <MultiLineTextInput
        control={control}
        errors={errors}
        title={'Notes'}
        propName='notes'
        numberOfLines={5}
        placeHolder='Your notes about the property'
      />
    </View>
  );
};

const RentalInfoSection = ({ control, errors }: { control: any, errors: any }) => {
  return (
    <View>
      <SectionHeader text='Rental Details' />

      {/* Rental Price */}
      <CurrencyInput
        control={control}
        errors={errors}
        title={'Rental Price'}
        propName='rentalInfo.rentalPrice'
        placeHolder='The rental price per month'
      />

      {/* Lease Length */}
      <NumericInput
        control={control}
        errors={errors}
        title={'Lease Length'}
        propName='rentalInfo.leaseLength'
        placeHolder='In months'
      />

      {/* Deposit */}
      <CurrencyInput
        control={control}
        errors={errors}
        title={'Deposit'}
        propName='rentalInfo.deposit'
        placeHolder='The security deposit'
      />

      {/* Utilities */}
      <CurrencyInput
        control={control}
        errors={errors}
        title={'Utilities'}
        propName='rentalInfo.utilities'
        placeHolder='Monthly utilities'
      />

      {/* ParkingPrice */}
      <CurrencyInput
        control={control}
        errors={errors}
        title={'Parking Price'}
        propName='rentalInfo.parkingPrice'
        placeHolder='Parking price (if applicable)'
      />

      {/* Furnished */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Furnished'}
        propName='rentalInfo.furnished'
      />

      {/* Pets */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Pets'}
        propName='rentalInfo.pets'
      />
    </View>
  );
};


const PropertySpecSection = ({ control, errors }: { control: any, errors: any }) => {
  return (
    <View>
      <SectionHeader text='Property Details' />

      {/* Property Type */}
      <PickerInput
        control={control}
        errors={errors}
        title={'Property Type'}
        propName='propertySpec.propertyType'
        placeHolder='Select a property type'
        items={[
          { label: 'House', value: PropertyType.house },
          { label: 'Apartment', value: PropertyType.apartment },
          { label: 'Loft', value: PropertyType.loft },
        ]}
      />

      {/* Bedrooms */}
      <CountInput
        control={control}
        errors={errors}
        title={'Bedrooms'}
        propName='propertySpec.bedrooms'
      />

      {/* Bathrooms */}
      <CountInput
        control={control}
        errors={errors}
        title={'Bathrooms'}
        propName='propertySpec.bathrooms'
      />

      {/* Area */}
      <NumericInput
        control={control}
        errors={errors}
        title={'Area'}
        propName='propertySpec.area'
      />

      {/* Floors */}
      <CountInput
        control={control}
        errors={errors}
        title={'Floors'}
        propName='propertySpec.floors'
      />

      {/* Floor */}
      <CountInput
        control={control}
        errors={errors}
        title={'Floor'}
        propName='propertySpec.floor'
      />

      {/* Lift/Elevator */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Lift/Elevator'}
        propName='propertySpec.lift'
      />

      {/* Parking */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Parking'}
        propName='propertySpec.parking'
      />

      {/* Dining Room */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Dining Room'}
        propName='propertySpec.diningRoom'
      />

      {/* Balcony */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Balcony'}
        propName='propertySpec.balcony'
      />

      {/* Patio */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Patio'}
        propName='propertySpec.patio'
      />

      {/* Washer */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Washer'}
        propName='propertySpec.washer'
      />

      {/* Dryer */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Dryer'}
        propName='propertySpec.dryer'
      />

      {/* Dishwasher */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Dishwasher'}
        propName='propertySpec.dishwasher'
      />

      {/* A/C */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'A/C'}
        propName='propertySpec.ac'
      />

      {/* Heat */}
      <IndeterminateCheckBox
        control={control}
        errors={errors}
        title={'Heat'}
        propName='propertySpec.heat'
      />
    </View>
  );
};

const SectionHeader = ({ text }: { text: string }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      <View>
        <Text style={{ width: 100, textAlign: 'center' }}>{text}</Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
    </View>
  );
}

const FormLabel = ({ title }: { title: string }) => {
  return (<FormControl.Label style={styles.formLabel}>{title}:</FormControl.Label>);
};

const FormError = ({ errors, isRequired, propName }: { errors: any, isRequired?: boolean, propName: string }) => {
  return (
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {isRequired && errors[propName] && errors[propName]['type'] === 'required' && 'This field is required'}
    </FormControl.ErrorMessage>

  );
};

const NormalTextInput = ({
  title,
  propName,
  rules,
  placeholder,
  isRequired,
  control,
  errors,
}: {
  title: string,
  propName: string,
  rules?: any,
  placeholder?: string,
  isRequired?: boolean,
  control: any,
  errors: any
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={errors[propName]}>
      <VStack>
        <View style={styles.formRow}>
          <FormLabel title={title} />
          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <Input
                style={styles.formInput}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
              />
            )}
            name={propName}
          />
        </View>
        <FormError errors={errors} isRequired={isRequired} propName={propName} />
      </VStack>
    </FormControl>
  );
};

const MultiLineTextInput = ({ title,
  propName,
  numberOfLines,
  rules,
  placeHolder,
  isRequired,
  control,
  errors
}: {
  title: string,
  propName: string,
  numberOfLines?: number,
  rules?: any,
  placeHolder?: string,
  isRequired?: boolean,
  control: any,
  errors: any
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={errors[propName]}>
      <View style={styles.formRowMultiLine}>
        <FormLabel title={title} />
        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <TextArea
              onChangeText={onChange}
              value={value}
              totalLines={numberOfLines ?? 5}
              placeholder={placeHolder}
            />
          )}
          name={propName}
        />
        <FormError errors={errors} isRequired={isRequired} propName={propName} />
      </View>
    </FormControl>
  );
};

const NumericInput = ({
  title,
  propName,
  placeHolder,
  rules,
  isRequired,
  control,
  errors
}: {
  title: string,
  propName: string,
  placeHolder?: string,
  rules?: any,
  isRequired?: boolean,
  control: any,
  errors: any
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={errors[propName]}>
      <VStack>
        <View style={styles.formRow}>
          <FormLabel title={title} />
          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <Input
                style={styles.formInput}
                onChangeText={onChange}
                value={(value && value.toString()) || ''}
                placeholder={placeHolder}
                keyboardType='numeric'
              />
            )}
            name={propName}
          />
        </View>
        <FormError errors={errors} isRequired={isRequired} propName={propName} />
      </VStack>
    </FormControl>
  );
};

const CurrencyInput = ({
  title,
  propName,
  placeHolder,
  rules,
  isRequired,
  control,
  errors
}: {
  title: string,
  propName: string,
  placeHolder?: string,
  rules?: any,
  isRequired?: boolean,
  control: any,
  errors: any
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={errors[propName]}>
      <VStack>
        <View style={styles.formRow}>
          <FormLabel title={title} />
          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <Input
                style={styles.formInput}
                onChangeText={onChange}
                value={(value && value.toString()) || ''}
                placeholder={placeHolder}
                // InputRightElement={
                //   <Icon
                //     path={mdiCurrencyEur}
                //     size={0.5}
                //   ></Icon>
                // }
                keyboardType='numeric'
              />
            )}
            name={propName}
          />
        </View>
        <FormError errors={errors} isRequired={isRequired} propName={propName} />
      </VStack>
    </FormControl>
  );
};

const CountInput = ({
  title,
  propName,
  placeHolder,
  rules,
  isRequired,
  control,
  errors
}: {
  title: string,
  propName: string,
  placeHolder?: string,
  rules?: any,
  isRequired?: boolean,
  control: any,
  errors: any
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={errors[propName]}>
      <VStack>
        <View style={styles.formRow}>
          <FormLabel title={title} />
          <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <Select
                style={styles.formInput}
                placeholder={placeHolder}
                onValueChange={(v) => onChange(parseInt(v))}
                selectedValue={JSON.stringify(value)}>
                <Select.Item label={'0'} value={'0'} />
                <Select.Item label={'1'} value={'1'} />
                <Select.Item label={'2'} value={'2'} />
                <Select.Item label={'3'} value={'3'} />
                <Select.Item label={'4'} value={'5'} />
                <Select.Item label={'5'} value={'5'} />
                <Select.Item label={'6'} value={'6'} />
                <Select.Item label={'7'} value={'7'} />
                <Select.Item label={'8'} value={'8'} />
                <Select.Item label={'9'} value={'9'} />
              </Select>
            )}
            name={propName}
          />
        </View>
        <FormError errors={errors} isRequired={isRequired} propName={propName} />
      </VStack>
    </FormControl>
  );
};

const IndeterminateCheckBox = ({
  title,
  propName,
  control,
  errors
}: {
  title: string,
  propName: string,
  control: any,
  errors: any
}) => {
  return (
    <View style={styles.formRow}>
      <FormLabel title={title} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            style={styles.formInput}
            value={value}
            onChange={onChange}
            isChecked={value}
            isIndeterminate={true}
            isInvalid={errors[propName]}
            />
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

const PickerInput = ({
  title,
  propName,
  items,
  placeHolder,
  control,
  errors
}: {
  title: string,
  propName: string,
  items: PickerItemType[],
  placeHolder: string,
  control: any,
  errors: any
}) => {
  return (
    <View>
      <View style={styles.formRow}>
        <FormLabel title={title} />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              style={styles.formInput}
              onValueChange={onChange}
              selectedValue={value}
              placeholder={placeHolder}>
              {items.map((item, index) => (<Select.Item label={item.label} value={item.value} key={index} />))}
            </Select>
          )}
          name={propName}
        />
      </View>
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

type PickerItemType = {
  label: string,
  value: string,
}

const PhoneNumberInput = (
  { title, propName, rules, control, errors }:
    { title: string, propName: string, multiLine?: boolean, numberOfLines?: number, rules?: any, control: any, errors: any }) => {
  return (
    <View style={styles.formRow}>
      <FormLabel title={title} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            style={styles.formInput}
            defaultCountry='PT'
            inputComponent={Input}
            onChange={onChange}
            value={value}
          />
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

export { PropertyAdd };
export { PropertyUpdate };
