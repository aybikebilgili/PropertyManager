// import {Drawer} from 'native-base';
import {List, Fab, ListItem, Input, Item, Drawer} from 'native-base';
import React, {Component} from 'react';
import {Text} from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TextInput,
  Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  View,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {SwipeListView} from 'react-native-swipe-list-view';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../define.json';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      userDataTmp: [],
      refreshing: false,
    };
  }

  componentWillMount() {
    this.getData();
  }

  async componentDidUpdate(prev_props) {
    if (this.props.enterTime !== prev_props.enterTime) {
      this.getData();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('will recieve props');
    if (nextProps.refresh) {
      this.onRefresh();
    }
  }

  async deleteManager(item) {
    let data = await fetch(api.baseUrl + '/api/User/' + item.userID, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: item.userID,
        blockID: item.blockID,
        nameSurname: item.nameSurname,
        phoneNo: item.phoneNo,
        numberOfPeople: item.numberOfPeople,
        email: item.email,
        password: item.password,
        isTenant: item.isTenant,
        hasCar: item.hasCar,
        isManager: false,
      }),
    }).then(data => data.json());
    console.log('data', data);

    setTimeout(() => {
      Actions.refresh({refresh: true});
    }, 0);
  }

  async onRefresh() {
    this.setState({refreshing: true});
    await this.getData();
    this.setState({refreshing: false});
  }

  async getData() {
    let isManager = await AsyncStorage.getItem('isManager');
    this.setState({isManager});
    console.log('isManager', this.state.isManager);

    console.log('aaaaaa');
    let users = fetch(api.baseUrl + '/api/User', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response =>
      response.json().then(data => {
        console.log(data);
        console.log(data[0].isManager);
        let managerData = data.filter(user => user.isManager == true);
        // let residentsData = data.filter(user => user.isManager == false);
        console.log('managerData', managerData);
        // console.log('residentsData', residentsData);
        this.setState({
          userData: managerData,
          userDataTmp: managerData.length == 0 ? [] : managerData,
          // musteriNo: musteriNo,
          // bayiID: bayiId,
        });
      }),
    );
    console.log('users', users);

    // const res = (await postRequest(body, define.Musteriler)).liste;
    //     if (res === undefined) return;
    //     this.setState({
    //       musteriData: res,
    //       musteriDataTmp: res.length == 0 ? [] : res,
    //       musteriNo: musteriNo,
    //       bayiID: bayiId,
    //     });

    //     console.log('Musteriler RES', res);
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);

      console.log(this.state.userDataTmp);
    };

    const renderItem = data => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{backgroundColor: 'white'}}
          onPress={() =>
            // Alert.alert('Manager', 'Phone No: ' + data.item.phoneNo)

            Alert.alert(
              data.item.nameSurname,
              'Phone No: ' + data.item.phoneNo,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Call',
                  onPress: () => {
                    console.log('Call Pressed');
                    {
                      Linking.openURL(`tel:${data.item.phoneNo}`);
                    }
                  },
                },
              ],
              {cancelable: false},
            )
          }

          // onPress={() => {
          //   this.props.settings.sepetMusteri = [];

          //   this.props.settings.sepetMusteri.MusteriAdSoyad =
          //     data.item.Ad + ' ' + data.item.Soyad;
          //   this.props.settings.sepetMusteri.MusteriID = data.item.MusteriID;

          //   this.props.satisTipi == 1
          //     ? Actions.Satis({})
          //     : this.props.satisTipi == 2
          //     ? Actions.PaketGruplari({})
          //     : /*      : this.props.settings.Yetkiler.PaketProgramEkleme == 'True'
          //     ? this.setState({modalVisible: true})
          //     : Alert.alert('Bilgi', 'Bu işlemi yapmaya yetkiniz yok');*/
          //       this.setState({modalVisible: true});

          //   this.setState({
          //     secilenMusteriID: data.item.MusteriID,
          //     secilenMusteriAdSoyad: data.item.Ad + ' ' + data.item.Soyad,
          //   });
          // }}

          // onLongPress={() => {
          //   Actions.Telefonlar({musteriData: data});
          // }}
        >
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',

              flexDirection: 'row',

              height: 80,

              borderBottomWidth: 1,
              borderBottomColor: '#dfdfdf',
            }}
            // onLongPress={() => {
            //   Actions.Telefonlar({musteriData: data});
            // }}
          >
            <View style={{width: '60%', justifyContent: 'center'}}>
              <Text style={{paddingLeft: 20, paddingRight: 10, fontSize: 14}}>
                {data.item.nameSurname}
              </Text>
            </View>
            <View
              style={{
                width: '40%',
                justifyContent: 'center',
              }}>
              <Text style={{alignSelf: 'flex-end'}}>
                {/* {this.currencyFormat(data.item.Bakiye)} */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const renderHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
        {/* {this.state.isManager == 'true' && (
          <TouchableOpacity
            style={{backgroundColor: 'gray', width: 75}}
            // onPress={() => this.edit(rowMap, data.item.MusteriID, data)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'gray',
                width: 75,
                height: 75,
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Icon
                style={{color: 'white', fontSize: 20}}
                active
                name="pencil"
              />
            </View>
          </TouchableOpacity>
        )} */}
        {this.state.isManager == 'true' && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={_ => this.deleteManager(data.item)}>
            <Icon style={{color: 'white', fontSize: 20}} active name="trash" />
          </TouchableOpacity>
        )}
      </View>
    );

    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <View
          style={{
            flex: 1,
            height: windowHeight,
            // opacity: 0.8,
            backgroundColor: '#f9f9f9',
          }}>
          <View style={{flex: 1, paddingBottom: 100}}>
            <SwipeListView
              keyExtractor={(item, index) => item.userID}
              ref="swipeList"
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              data={this.state.userDataTmp}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              // leftOpenValue={this.state.isManager == 'true' ? 75 : 0}
              rightOpenValue={this.state.isManager == 'true' ? -80 : 0}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          </View>
          {/* {this.state.isManager == 'true' && (
            <Fab
              containerStyle={{}}
              style={{
                backgroundColor: '#5cb85c',
                height: 76,
                width: 76,
                borderRadius: 58,
                elevation: 2,
                shadowColor: 'gray',
              }}
              position="bottomRight"
              onPress={() => {
                // Actions.MusteriEkleDuzenle({tip: 'ekle'});
              }}>
              <Icon name="add" size={50} />
            </Fab>
          )} */}
        </View>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  head: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'center',
    borderBottomColor: '#954C9E',
    borderBottomWidth: 2,
    paddingBottom: 0,
    paddingTop: 0,
  },
  title: {
    fontSize: 20,
    color: '#954C9E',
    marginLeft: 10,
    borderColor: '#954C9E',
  },
  listText: {
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  listSubText: {
    fontSize: 11,
    alignSelf: 'flex-start',
    color: '#A2A2A2',
  },
  listMoneyText: {
    alignSelf: 'flex-end',
  },
  more: {
    borderWidth: 1,
    borderColor: '#954C9E',
  },

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
