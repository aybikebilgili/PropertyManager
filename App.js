/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {
  Router,
  Scene,
  Drawer,
  Stack,
  Actions,
  ActionConst,
} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './pages/login';
import Welcome from './pages/welcome';
import sideMenu from './pages/sideMenu';
import {Root} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import {LogBox, View, Text, Settings} from 'react-native';
import Profile from './pages/profile';
import Employees from './pages/Employees';
import Security from './pages/security';
import Residents from './pages/Residents';
import Managers from './pages/Managers';
import addEditResident from './pages/addEditResident';
import addEditEmployee from './pages/addEditEmployee';
import {firebase} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: AsyncStorage.getItem('userName'),
      isManager: AsyncStorage.getItem('isManager'),
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    this.checkPermission();

    firebase.messaging().onMessage(response => {
      console.log('notiiii', JSON.stringify(response));

      if (response.notification.title !== 'yenileme') {
        PushNotification.localNotification({
          title: response.notification.title,
          message: response.notification.body,
          channelId: 'channel-id',
        });
      }
    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log(
        'perm kontrol get tooken',
        await firebase.messaging().getToken(),
      );
    } else {
      this.requestPermissions();
    }
  }

  async requestPermissions() {
    try {
      await firebase.messaging.requestPermission();
      console.log('bildirim izni verilmiş');
    } catch (error) {
      console.log('bildirim izni verilmemiş');
    }
  }

  render() {
    return (
      <Root>
        <Router>
          <Scene key="root">
            <Scene
              key="Login"
              navigationBarStyle={{
                backgroundColor: 'gray',
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Login"
              component={Login}
              initial
            />
            <Drawer
              type="reset"
              hideNavBar
              key="drawer"
              //backgroundColor: '#168980'
              style={{backgroundColor: 'rgb(240, 240, 240)'}}
              contentComponent={sideMenu}
              drawerWidth={200}>
              <Scene hideNavBar panHandlers={null}>
                <Scene
                  hideNavBar={false}
                  key="sdfsdf"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Home'}
                  component={Welcome}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{
                            marginLeft: 15,
                            justifyContent: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
                <Scene
                  hideNavBar={false}
                  key="profile"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Profile'}
                  component={Profile}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
                <Scene
                  hideNavBar={false}
                  key="Employees"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Employees'}
                  component={Employees}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="security"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Security'}
                  component={Security}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="Residents"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Residents'}
                  component={Residents}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="Managers"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Managers'}
                  component={Managers}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />

                <Scene
                  hideNavBar={false}
                  key="addEditEmployee"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Employee'}
                  component={addEditEmployee}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
                <Scene
                  hideNavBar={false}
                  key="addEditResident"
                  navigationBarStyle={{
                    backgroundColor: 'gray',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  }}
                  titleStyle={{
                    color: 'white',
                    marginLeft: Platform.OS === 'android' ? -20 : 0,
                    fontSize: 14,
                  }}
                  title={'Resident'}
                  component={addEditResident}
                  onLeft={Actions.pop()}
                  renderLeftButton={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                        <Icon
                          name="reorder-three-outline"
                          color="white"
                          size={30}
                          style={{marginLeft: 15, paddingTop: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
              </Scene>
            </Drawer>
          </Scene>
        </Router>
      </Root>
    );
  }
}

export default App;
