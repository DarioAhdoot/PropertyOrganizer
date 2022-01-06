import {
  atom,
  selector,
  useRecoilValue,
} from 'recoil';
import { Property } from './GraphQLAPI';

export const propertiesAtom = atom({
  key: 'propertiesState',
  default: [] as Property[],
});
export const filterTextAtom = atom({
  key: 'filterTextState',
  default: '',
});

// export const filteredPropertiesSelector = selector({
//   key: 'filteredProperties',
//   get: ({ get }) => {
//     console.log('In filteredPropertiesSelector.get')
//     const filterText = useRecoilValue(filterTextAtom);
//     const properties = get(propertiesAtom);
//     console.log(` -> filterText: ${filterText}`);
//     if (!filterText) {
//       console.log(' -> returning all properties')
//       return properties;
//     }

//     console.log(' -> returning filtered properties')
//     return properties.filter((property) => {
//       console.log(`-> examining property: ${property}`);
//       return property.address.toLowerCase().includes(filterText.toLowerCase());
//     });
//   }
// });
