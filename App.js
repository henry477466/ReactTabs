import React from 'react';
import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive';
import {
  SafeAreaView, StyleSheet, ScrollView,
  View, StatusBar, Button,
  ToastAndroid, PermissionsAndroid, TouchableHighlight
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from "@react-native-community/netinfo";

import ScanQRCode from './src/components/ScanQRCode';
import ImagePicker from './src/components/ImagePicker';
import NativeFile from './src/components/NativeFile';
import WebView from './src/components/WebView';
import NotWifi from './src/components/NotWifi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init_state: false,
      loading: true,
      ScanQRCode_visible: false,
      ImagePicker_visible: false,
      NativeFile_visible: false,
      WebView_visible: false,
    };
  }
  componentDidMount() {
    this.appInit();
  }
  //重新加载
  reloadApp = () => {
    if (this.state.loading) return;
    this.setState({
      loading: true
    }, () => {
      ToastAndroid.show('重新加载, 请稍候...', ToastAndroid.SHORT);
      this.appInit();
    })
  }
  //初始化检测
  appInit = () => {
    NetInfo.fetch().then((reach) => {
      if (reach.isInternetReachable && reach.isConnected) {
        //判断阅读器是否存在
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/reader`).then(bool => {
          if (bool) {
            this.hideSplashScreen(true);
          }
          else {
            this.downLoadReader();
          }
        });
      }
      else {
        this.hideSplashScreen(false);
        ToastAndroid.show('请检查网络是否正常链接', ToastAndroid.SHORT);
      }
    })
  };
  //下载阅读器代码
  downLoadReader = () => {
    const url = 'http://test-m.daidaidj.com/qixi/build.zip';
    const downloadDest = `${RNFS.DocumentDirectoryPath}/reader.zip`;
    const background = true;
    const progressDivider = 1;
    const begin = () => {
      console.log('download reader');
    };
    const progress = data => {
      console.log(`${data.bytesWritten}/${data.contentLength}`);
    };
    RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
      begin,
      progress,
      background,
      progressDivider,
    }).promise.then(res => {
      if (res.bytesWritten > 0) {
        this.unzipReaderFile();
      } else {
        this.hideSplashScreen(false);
      }
    }).catch(err => {
      this.hideSplashScreen(false);
    });
  };
  //解压阅读器
  unzipReaderFile = () => {
    const sourcePath = `${RNFS.DocumentDirectoryPath}/reader.zip`;
    const targetPath = `${RNFS.DocumentDirectoryPath}/reader/`;
    const charset = 'UTF-8';
    unzip(sourcePath, targetPath, charset).then(path => {
      this.hideSplashScreen(true);
    }).catch(error => {
      this.hideSplashScreen(false);
    });
  }
  //关闭启动页
  hideSplashScreen = bl => {
    this.setState({
      init_state: bl,
      loading: false
    });
    SplashScreen.hide();
  };
  async changeVim() {
    if (!this.state.ScanQRCode_visible) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
  changePic = () => {
    this.setState({
      ImagePicker_visible: !this.state.ImagePicker_visible,
    });
  };
  changeFile = () => {
    this.setState({
      NativeFile_visible: !this.state.NativeFile_visible,
    });
  };
  changeWeb = () => {
    this.setState({
      WebView_visible: !this.state.WebView_visible,
    });
  };

  render() {
    const { init_state } = this.state;
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="rgba(0,0,0,0)"
        />
        {init_state ?
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              <View style={{ marginTop: 20 }}>
                <Button title="开启扫码" onPress={this.changeVim.bind(this)} />
              </View>
              <View style={{ marginTop: 20 }}>
                <Button title="使用照片" onPress={this.changePic.bind(this)} />
              </View>
              <View style={{ marginTop: 20 }}>
                <Button title="文件管理" onPress={this.changeFile.bind(this)} />
              </View>
              <View style={{ marginTop: 20 }}>
                <Button title="阅读器" onPress={this.changeWeb.bind(this)} />
              </View>
            </ScrollView>
            {/* 扫码 */}
            {this.state.ScanQRCode_visible ? (
              <ScanQRCode close={this.changeVim.bind(this)} />
            ) : null}
            {/* 照片 */}
            {this.state.ImagePicker_visible ? (
              <ImagePicker close={this.changePic.bind(this)} />
            ) : null}
            {/* 文件 */}
            {this.state.NativeFile_visible ? (
              <NativeFile close={this.changeFile.bind(this)} />
            ) : null}
            {/* 阅读器 */}
            {this.state.WebView_visible ? (
              <WebView close={this.changeWeb.bind(this)} />
            ) : null}
          </SafeAreaView> : <TouchableHighlight style={{ flex: 1 }} onPress={this.reloadApp}><NotWifi /></TouchableHighlight>
        }
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
