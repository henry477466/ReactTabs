import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ToastAndroid,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';

import ScanQRCode from './src/components/ScanQRCode';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ScanQRCode_visible: false,
    };
  }
  async changeVim() {
    if (!this.state.ScanQRCode_visible) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('获得权限');
        this.setState({
          ScanQRCode_visible: true,
        });
      } else {
        ToastAndroid.show('未获得权限!', ToastAndroid.SHORT);
      }
    } else {
      this.setState({
        ScanQRCode_visible: false,
      });
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <View>
              <Button title="开启" onPress={this.changeVim.bind(this)} />
            </View>
          </ScrollView>
          {/* 扫码 */}
          {this.state.ScanQRCode_visible ? (
            <ScanQRCode close={this.changeVim.bind(this)} />
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: StatusBar.currentHeight || 20,
  },
  row: {
    padding: 20,
  },
});

export default App;
