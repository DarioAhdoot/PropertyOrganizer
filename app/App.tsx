import Amplify from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppLoading from 'expo-app-loading';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';

import { listProperties } from './GraphQLAPI';
import { propertiesAtom } from './state';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import PropertyAddUpdate from './components/PropertyAddUpdate';

import config from './aws-exports';
Amplify.configure(config);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const appReadyAtom = atom({
  key: 'appLoadingState',
  default: false,
});

const Stack = createNativeStackNavigator();

function PropertyOrganizerApp({ navigation }: { navigation: any }) {
  const setProperties = useSetRecoilState(propertiesAtom);
  const [isReady, setIsReady] = useRecoilState(appReadyAtom);

  return (
    <View>
      <PropertyList navigation={navigation} />
      {!isReady && 
        <AppLoading
          startAsync={async () => {
            return new Promise(async (resolve, reject) => {
              console.log('In the promise');
              try {
                setProperties(await listProperties());
                resolve();
              } catch (e) {
                reject(e);
              }
            });
          }}
          onFinish={() => {
            console.log('Finished loading!');
            setIsReady(true);
          }}
          onError={console.error}
        />
      }

    </View>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        {/* <PaperProvider theme={theme}> */}
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                  name='Home'
                  component={PropertyOrganizerApp}
                  options={{ title: 'Property Organizer' }} />
                <Stack.Screen
                  name='PropertyDetail'
                  component={PropertyDetail} />
                <Stack.Screen
                  name='PropertyAddUpdate'
                  component={PropertyAddUpdate} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
          <StatusBar style='auto' />
        {/* </PaperProvider> */}
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
