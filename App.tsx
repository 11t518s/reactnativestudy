import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

const App = () => {
  return (
      <>
        <View style={{flex:1}}>
          <View style={{flex: 1,backgroundColor: '#111111'}}><Text>1</Text></View>
          <View style={{flex: 2,backgroundColor: '#222222'}}><Text>2</Text></View>
          <View style={{flex: 2,backgroundColor: '#333333'}}><Text>3</Text></View>
          <View style={{flex: 10,backgroundColor: '#444444'}}><Text>4</Text></View>
          <StatusBar style='auto' />
        </View>
      </>
  );
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 2,
    color: '#aaa',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
