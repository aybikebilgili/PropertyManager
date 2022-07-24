import {Drawer, Button} from 'native-base';
import React, {Component} from 'react';
import {Text} from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  View,
  Appearance,
} from 'react-native';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';

import getStorage from '../functions/loginfunc';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      name: '',
      surname: '',
      phonenumber: '',
      email: '',
    };
  }

  async getSt() {
    let userID = await AsyncStorage.getItem('userID');
    let nameSurname = await AsyncStorage.getItem('nameSurname');
    let phoneNo = await AsyncStorage.getItem('phoneNo');
    let email = await AsyncStorage.getItem('email');
    let password = await AsyncStorage.getItem('password');
    let numberOfPeople = await AsyncStorage.getItem('numberOfPeople');
    let hasCar = await AsyncStorage.getItem('hasCar');
    let isTenant = await AsyncStorage.getItem('isTenant');
    let isManager = await AsyncStorage.getItem('isManager');
    let blockID = await AsyncStorage.getItem('blockID');

    this.setState({
      userID,
      nameSurname,
      phoneNo,
      email,
      password,
      numberOfPeople,
      hasCar,
      isTenant,
      isManager,
      blockID,
    });

    this.getPost(userID);
  }

  async componentDidMount() {
    const ip = await getStorage('ip');

    this.setState({ip: ip});

    this.getSt();
  }

  async getPost(userID) {
    let data = await fetch(
      `http://${this.state.ip}/api/post?UserID=${userID}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then(data => data.json());
    console.log('verileriAL', data);

    this.setState({posts: data});
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <View
          style={{
            flex: 1,
            height: windowHeight,

            backgroundColor: 'gray',
          }}>
          <ScrollView>
            <View style={{backgroundColor: '#f3f3f3'}}>
              <View
                style={{
                  marginVertical: 20,
                  marginHorizontal: 30,
                  height: 150,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: 'rgb(172, 172, 186)',

                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon size={100} name="person-circle"></Icon>
                </View>
                <View
                  style={{
                    flex: 0.6,
                    marginTop: 40,
                    marginLeft: 20,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    {this.state.nameSurname}
                  </Text>
                  <Text style={{}}>
                    {this.state.isManager == 'true' ? 'Manager' : 'Not Manager'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'rgb(172, 172, 186)',
                  borderTopColor: 'rgb(172, 172, 186)',
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  height: 30,
                  paddingLeft: 20,
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  Personal Information
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{}}>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Name Surname
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Phone Number
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      E-mail
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Password
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Tenant / Landlord
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Has Car?
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Manager?
                    </Text>
                  </View>
                </View>
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>
                      : {this.state.nameSurname}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>: {this.state.phoneNo}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>: {this.state.email}</Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>
                      : ********{/* {this.state.password} */}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>
                      : {this.state.isTenant == 'true' ? 'Tenant' : 'Landlord'}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>
                      : {this.state.hasCar == 'true' ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgb(172, 172, 186)',
                      borderTopColor: 'rgb(172, 172, 186)',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      height: 30,
                      paddingLeft: 20,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>
                      : {this.state.isManager == 'true' ? 'Yes' : 'No'}
                    </Text>
                  </View>
                </View>
              </View>
              {/* <View>
                <Button
                  style={{
                    alignSelf: 'flex-end',
                    backgroundColor: 'gray',
                    marginVertical: 10,
                    marginRight: 30,
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    height: 40,
                  }}
                  onPress={() => Actions.addEditResident({})}>
                  <Text style={{color: 'white'}}>Düzenle</Text>
                </Button>
              </View> */}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
