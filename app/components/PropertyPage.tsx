import { Text } from 'react-native';


const PropertyPage = (props: any) => {
  console.log(`PROPERTY PAGE: ${JSON.stringify(props)}`);

  const { navigation } = props;
  const property = props.route.params.property;

  return (
    <Text>{JSON.stringify(property)}</Text>
  )
}

export default PropertyPage;