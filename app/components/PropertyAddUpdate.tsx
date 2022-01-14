import React from 'react';
import { Text, View, TextInput, Button, Picker } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/react-native-input'

import { Property, PropertyType } from '../models';

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
    <View>
      <View>
        <SectionHeader text='General Info' />

        {/* Property Name/Title */}
        <NormalTextInput
          control={control}
          errors={errors}
          title={'Property Name/Title'}
          propName='title'
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
        />

        {/* Listing URL */}
        <NormalTextInput
          control={control}
          errors={errors}
          title={'Listing URL'}
          propName='listingUrl'
        />


        {/* Contact Name */}
        <NormalTextInput
          control={control}
          errors={errors}
          title={'Contact Name'}
          propName='contactName'
        />

        {/* Contact Phone# */}
        <Text>Contact Phone#</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              // style={styles.input}
              defaultCountry='PT'
              onChange={onChange}
              value={value}
            />
          )}
          name='contactPhone'
        />

        {/* Notes */}
        <NormalTextInput
          control={control}
          errors={errors}
          title={'Notes'}
          propName='notes'
          multiLine={true}
          numberOfLines={5}
        />
      </View>
      <PropertySpecSection control={control} errors={errors} />
      <Button title='Add' onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const PropertySpecSection = ({ control, errors }: { control: any, errors: any}) => {
  return (
    <View>
      <SectionHeader text='Property Details' />

      {/* Property Type */}
      <PickerComponent
        control={control}
        errors={errors}
        title={'Property Type'}
        propName='propertySpec.propertyType'
        items={[
          { label: 'House', value: PropertyType.HOUSE },
          { label: 'Apartment', value: PropertyType.APARTMENT },
          { label: 'Loft', value: PropertyType.LOFT },
        ]}
      />

      {/* Bedrooms */}
      <NumericTextInput
        control={control}
        errors={errors}
        title={'Bedrooms'}
        propName='propertySpec.bedrooms'
      />

      {/* Bathrooms */}
      <NumericTextInput
        control={control}
        errors={errors}
        title={'Bathrooms'}
        propName='propertySpec.bathrooms'
      />

      {/* Area */}
      <NumericTextInput
        control={control}
        errors={errors}
        title={'Area'}
        propName='propertySpec.area'
      />

      {/* Floors */}
      <NumericTextInput
        control={control}
        errors={errors}
        title={'Floors'}
        propName='propertySpec.floors'
      />

      {/* Floor */}
      <NumericTextInput
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

const NormalTextInput = (
  { title, propName, multiLine, numberOfLines, rules, control, errors } :
    { title: string, propName: string, multiLine?: boolean, numberOfLines?: number, rules?: any, control: any, errors: any }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            value={value}
            multiline={multiLine}
            numberOfLines={numberOfLines}
          />
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

const NumericTextInput = ({ title, propName, control, errors }: { title: string, propName: string, control: any, errors: any }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            value={value}
            keyboardType='numeric'
          />
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

const IndeterminateCheckBox = ({ title, propName, control, errors }: { title: string, propName: string, control: any, errors: any }) =>
  PickerComponent({ title, propName, control, errors, items: [
    { label: '-', value: 'unknown' },
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ] });

const PickerComponent = ({ title, propName, items, control, errors }: { title: string, propName: string, items: PickerItemType[], control: any, errors: any }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Picker
            // style={styles.input}
            onValueChange={onChange}
            selectedValue={value}>
              { items.map((item, index) => (<Picker.Item label={item.label} value={item.value} key={index} />))}
          </Picker>
        )}
        name={propName}
      />
      {errors[propName] && <Text>{JSON.stringify(errors[propName])}</Text>}
    </View>
  );
};

type PickerItemType = {
  label: string,
  value: string,
}

export default PropertyAddUpdate;