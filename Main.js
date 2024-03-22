import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';


import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {check, PERMISSIONS, request} from 'react-native-permissions';

const Main = () => {
  const [roomId, setRoomId] = useState('');

  const navigation = useNavigation();

  if (Platform.OS === 'android') {
    const granted = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.RECORD_AUDIO,
    );
    granted
      .then(data => {
        if (!data) {
          const permissions = [
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          ];
          PermissionsAndroid.requestMultiple(permissions);
        }
      })
      .catch(err => {
        console.log(err.toString());
      });
  } else {
    request(PERMISSIONS.IOS.CAMERA).then(result => {});

    request(PERMISSIONS.IOS.MICROPHONE).then(result => {});
  }

  const handleButtonPress = type => {
    if (type === 'join') {
      navigation.navigate('videoCall', {type, streamId: joinRoomId});
    } else {
      navigation.navigate('videoCall', {type, streamId: createRoomId});
    }
  };

  const handleJoin = () => {
    console.log(roomId);

    if(roomId?.length <= 3) {
      console.log("fuckOff")
      return
    }

    navigation.navigate("videoCall", {roomId})
    setRoomId('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Room ID"
        value={roomId}
        onChangeText={t => setRoomId(t.replace(/[^a-zA-Z]/g, ''))}
      />

      <Pressable style={styles.buttonWrapper} onPress={handleJoin}>
        <Text style={styles.texts}>Join/Create LiveStream</Text>
      </Pressable>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#efecec',
    backgroundColor : "#0c2d57",
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
    paddingTop: 100,
  },
  inputs: {
    borderWidth: 2,
    borderColor: '#efecec',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor : "#efecec",
    fontWeight: '600',
    width: 300,
    borderRadius: 20,
    color : "#282828"
  },
  wrapper: {
    borderWidth: 1,
    padding: 40,
    gap: 29,
  },
  buttonWrapper: {
    borderRadius: 20,
    backgroundColor: '#FC6736',
    width: 180,
    padding: 12,
  },

  texts: {
    color: '#EFECEC',
    fontWeight: '500',
    textAlign: 'center',
  },
});
