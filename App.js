import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import Navigation from './navigation/Navigation';
import {persistor, store} from "./store/store";
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
// import store from "./store/store";

const App = ()=> {
  return (
    <Navigation/>
  );
}

export default ()=> {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar/>
        <App/>
      </PersistGate>
    </Provider>
  );
}


