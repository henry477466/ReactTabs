import React, {Component} from 'react';
import RNFS from 'react-native-fs';
import {zip, unzip, unzipAssets, subscribe} from 'react-native-zip-archive';

import {
  StyleSheet,
  StatusBar,
  Animated,
  PermissionsAndroid,
  Modal,
  View,
  Text,
  TouchableHighlight,
  Button,
  Image,
  ToastAndroid,
} from 'react-native';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getPath = () => {
    //判断文件 或者目录 是否存在
    // RNFS.exists(`${RNFS.DocumentDirectoryPath}/epub/1.jpg`).then(res => {
    //   console.log('文件是否存在：', res);
    // });
    //判断文件 或者目录 是否存在
    RNFS.exists(`${RNFS.DocumentDirectoryPath}/epub`).then(bool => {
      console.log('文件夹是否存在：', bool);
      if (!bool) {
        //创建文件夹
        RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/epub`).then(() => {
          console.log('创建结果成功');
        });
      }
    });
    //删除文件或者目录
    // RNFS.unlink(`${RNFS.DocumentDirectoryPath}/reader`);
    // RNFS.unlink(`${RNFS.DocumentDirectoryPath}/1.jpg`);
    //获取目录下的文件列表
    RNFS.readDir(`${RNFS.DocumentDirectoryPath}/reader`).then(res => {
      console.log('========================');
      res.forEach(item => {
        console.log('文件：', item.name);
      });
    });
    RNFS.readDir(`${RNFS.DocumentDirectoryPath}/epub`).then(res => {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx');
      res.forEach(item => {
        console.log('图书：', item.name);
      });
    });
  };
  downFile = () => {
    const url = 'http://www.tuibook.com/szyun/books/caitianxu/1.epub';
    // const url = 'http://test-m.daidaidj.com/qixi/test.html';
    // const url = 'https://img-play.daidaidj.com/img/359dee657879e16bad191bf48b5f4ed7.jpg';
    // const downloadDest = `${RNFS.DocumentDirectoryPath}/epub/123.epub`;
    const downloadDest = `${RNFS.DocumentDirectoryPath}/epub/1.epub`;
    const background = true;
    const progressDivider = 1;
    const begin = () => {
      this.setState({
        text: 'Download has begun',
      });
    };
    const progress = data => {
      console.log(
        (data.bytesWritten / 1024 / 1024).toFixed(1) +
          'MB/' +
          (data.contentLength / 1024 / 1024).toFixed(1) +
          'MB',
      );
      const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
      const text = `Progress ${percentage}%`;
      this.setState({
        text: text,
      });
    };
    const ret = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
      begin,
      progress,
      background,
      progressDivider,
    });
    ret.promise
      .then(res => {
        console.log('结果1', res);
        if (res.bytesWritten > 0) {
          this.setState({output: JSON.stringify(res)});
          this.setState({imagePath: 'file://' + downloadDest});
        } else {
          console.log('上传失败');
        }
      })
      .catch(err => {
        console.log('上传失败', err);
      });
  };
  downZipFile = () => {
    const url = 'http://test-m.daidaidj.com/qixi/build.zip';
    const downloadDest = `${RNFS.DocumentDirectoryPath}/reader.zip`;
    const background = true;
    const progressDivider = 1;
    const begin = () => {
      this.setState({
        text: 'Download has begun',
      });
    };
    const progress = data => {
      console.log(
        (data.bytesWritten / 1024 / 1024).toFixed(1) +
          'MB/' +
          (data.contentLength / 1024 / 1024).toFixed(1) +
          'MB',
      );
      const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
      const text = `Progress ${percentage}%`;
      this.setState({
        text: text,
      });
    };
    const ret = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
      begin,
      progress,
      background,
      progressDivider,
    });
    ret.promise
      .then(res => {
        console.log('结果1', res);
        if (res.bytesWritten > 0) {
          this.setState({output: JSON.stringify(res)});
          this.setState({imagePath: 'file://' + downloadDest});
          this.getPath();
        } else {
          console.log('上传失败');
        }
      })
      .catch(err => {
        console.log('上传失败', err);
      });
  };
  unzipFile = () => {
    const sourcePath = `${RNFS.DocumentDirectoryPath}/reader.zip`;
    const targetPath = `${RNFS.DocumentDirectoryPath}/reader/`;
    const charset = 'UTF-8';
    unzip(sourcePath, targetPath, charset)
      .then(path => {
        console.log(`unzip completed at ${path}`);
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.container}>
          <View style={styles.covertin}>
            <View>
              <Text>{this.state.text}</Text>
            </View>
            <View>
              <Text>{this.state.output}</Text>
            </View>
            <View>
              <Text>{this.state.imagePath}</Text>
            </View>
            <View>
              <Button title="获取路径" onPress={this.getPath} />
            </View>
            <View style={{marginTop: 20}}>
              <Button title="下载图片" onPress={this.downFile} />
            </View>
            <View style={{marginTop: 20}}>
              <Button title="下载文件" onPress={this.downZipFile} />
            </View>
            <View style={{marginTop: 20}}>
              <Button title="解析文件" onPress={this.unzipFile} />
            </View>
          </View>
          <View style={styles.footerAction}>
            <TouchableHighlight
              onPress={this.props.close}
              activeOpacity={1}
              underlayColor="#fcb602">
              <Button title="退出模块" onPress={this.props.close} />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  covertin: {
    padding: 100,
  },
  footerAction: {
    paddingTop: 100,
  },
});
