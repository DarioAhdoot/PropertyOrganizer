import React from 'react';
import { Checkbox, FormControl, Input, Select, TextArea, VStack, WarningOutlineIcon } from 'native-base';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/react-native-input'
import Icon from '@mdi/react'
import {
  mdiCurrencyEur,
} from '@mdi/js'

import { Property, PropertyType } from '../models';

const styles = StyleSheet.create({
  container: {
    width: 500,
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    margin: 4,
  },
  formLabel: {
    width: 200,
    fontWeight: 'bold',
  },
  formRowMultiLine: {
    margin: 4,
  },
  formInput: {
    flex: 1,
  },
});

const PropertyAddUpdate = ({ navigation }: { navigation: any }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<Property>({
    defaultValues: {
      title: '',
      address: '',
      propertySpec: {
        propertyType: PropertyType.APARTMENT
      },
    }
  });
  const onSubmit = (data: Property) => console.log(JSON.stringify(data));

  // Can't call it synchronously because we're not allowed to do so while rendering
  setTimeout(() => navigation.setOptions({ title: "My Title!" }));

  return (
    <View style={styles.container}>
      <GeneralInfoSection control={control} errors={errors} />
      <RentalInfoSection control={control} errors={errors} />
      <PropertySpecSection control={control} errors={errors} />
      <Button title='Add' onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const GeneralInfoSection = ({ control, errors }: { control: any, errors: any }) => {
  return (
    <View>
      <SectionHeader text='General Info' />

      {/* Property Name/Title */}
      <NormalTextInput
        control={control}
        errors={errors}
        title={'Property Name/Title'}
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
        title={'Contact Phone #'}
        propName='contactPhone'
      />

      {/* Notes */}
      <MultiLineTextInput
        control={control}
        errors={errors}
        title={'Notes'}
        propName='notes'
        numberOfLines={5}
        placeholder='Your notes about the property'
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
        title={'Lease Length (in months)'}
        propName='rentalInfo.leaseLength'
        placeHolder='The lease length in months'
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
          { label: 'House', value: PropertyType.HOUSE },
          { label: 'Apartment', value: PropertyType.APARTMENT },
          { label: 'Loft', value: PropertyType.LOFT },
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
  console.log(`Errors: ${JSON.stringify(errors)}`);
  return (
    <View>
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {isRequired && errors[propName] && errors[propName]['type'] === 'required' && 'This field is required'}
          </FormControl.ErrorMessage>
        </VStack>
      </FormControl>
    </View>
  );
};

const MultiLineTextInput = ({ title,
  propName,
  numberOfLines,
  rules,
  placeholder,
  control,
  errors }: {
    title: string,
    propName: string,
    numberOfLines?: number,
    rules?: any,
    placeholder?: string,
    control: any,
    errors: any
  }) => {
  return (
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
            placeholder={placeholder}
          />
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

const NumericInput = ({
  title,
  propName,
  placeHolder,
  control,
  errors
}: {
  title: string,
  propName: string,
  placeHolder?: string,
  control: any,
  errors: any
}) => {
  return (
    <View style={styles.formRow}>
      <FormLabel title={title} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            style={styles.formInput}
            onChangeText={onChange}
            value={value}
            keyboardType='numeric'
            placeholder={placeHolder}
          />
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};


const CurrencyInput = ({
  title,
  propName,
  placeHolder,
  control,
  errors
}: {
  title: string,
  propName: string,
  placeHolder?: string,
  control: any,
  errors: any
}) => {
  return (
    <View style={styles.formRow}>
      <FormLabel title={title} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            style={styles.formInput}
            onChangeText={onChange}
            value={value}
            keyboardType='numeric'
            placeholder={placeHolder}
            InputRightElement={
              <Icon
                path={mdiCurrencyEur}
                size={0.5}
              ></Icon>
            }
          />
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

const CountInput = ({ title, propName, control, errors }: { title: string, propName: string, control: any, errors: any }) => {
  return (
    <View style={styles.formRow}>
      <FormLabel title={title} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            style={styles.formInput}
            onValueChange={onChange}
            selectedValue={value}>
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
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

const IndeterminateCheckBox = ({ title, propName, control, errors }: { title: string, propName: string, control: any, errors: any }) => {
  return (
    <View style={styles.formRow}>
      <FormLabel title={title} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            style={styles.formInput}
            onChange={onChange}
            value={value}
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
              selectedValue={value ?? items[0]}
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

export default PropertyAddUpdate;