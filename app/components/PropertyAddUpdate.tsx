import React from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/react-native-input'

import { Property } from '../models';

const PropertyAddUpdate = ({ navigation }: { navigation: any }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<Property>({
    defaultValues: {
      title: '',
      address: '',
    }
  });
  const onSubmit = data => console.log(data);

  // Can't call it synchronously because we're not allowed to do so while rendering
  setTimeout(() => navigation.setOptions({ title: "My Title!" }));

  return (
    <View>

      {/* Title */}
      <Text>Property Name/Title</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='title'
      />
      {errors.title && <Text>This is required.</Text>}

      {/* Address */}
      <Text>Address</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='address'
      />
      {errors.address && <Text>This is required.</Text>}

      {/* Address URL */}
      <Text>Address URL</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='addressUrl'
      />

      {/* Listing URL */}
      <Text>Listing URL</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='listingUrl'
      />

      {/* Contact Name */}
      <Text>Contact Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='contactName'
      />

      {/* Contact Phone */}
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
      <Text>Notes</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            // style={styles.input}
            onChangeText={onChange}
            multiline={true}
            numberOfLines={5}
            value={value}
          />
        )}
        name='notes'
      />

      <Button title='Add' onPress={ handleSubmit(onSubmit) } />
    </View>
  );
}

export default PropertyAddUpdate;