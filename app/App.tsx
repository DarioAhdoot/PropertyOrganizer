import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';

import { listProperties } from './graphql';
import { propertiesAtom } from './state';
import PropertyList from './components/PropertyList';

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

export const appReadyAtom = atom({
  key: 'appLoadingState',
  default: false,
});

function PropertyOrganizerApp() {
  const setProperties = useSetRecoilState(propertiesAtom);
  const [isReady, setIsReady] = useRecoilState(appReadyAtom);

  if (!isReady) {
    return (
      <SafeAreaView style={styles.container}>
        <PropertyList />
        <AppLoading
          startAsync={ async () => {
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
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PropertyList />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <PropertyOrganizerApp />
      </PaperProvider>
    </RecoilRoot>
  );
}
