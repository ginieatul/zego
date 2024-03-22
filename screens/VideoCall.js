import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  findNodeHandle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ZegoExpressEngine, {
  ZegoRoomConfig,
  ZegoScenario,
  ZegoTextureView,
  ZegoViewMode,
} from 'zego-express-engine-reactnative';

const VideoCall = ({route}) => {
  console.log(route?.params?.type, route?.params?.streamId);

  const previewViewRef = useRef(null);

  const handleStartStream = async () => {
    let x = await ZegoExpressEngine.instance().startPublishingStream(
      'streamIDPulisher',
    );
    console.log(x);
  };

  const handleEndStream = async () => {
    console.log('End Stream');
    let x = await ZegoExpressEngine.instance().stopPublishingStream();

    console.log(x);
  };

  useEffect(() => {
    console.log('componentDidMount');
  
    let profile = {
      appID: 1996434501,
      appSign:
        '5b8d13eb6cc351e379ca6da233a9884a6a109ce87b64bdb22ee9e0245df19c16',
      scenario: ZegoScenario.Broadcast,
    };

    ZegoExpressEngine.createEngineWithProfile(profile).then(engine => {
      engine.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
        // Room connection status callback. After a user logs in to a room, when the room connection status changes (for example, the room is disconnected or login authentication fails), the SDK triggers this callback to send a notification.
        console.log(
          roomID,
          state,
          errorCode,
          extendedData,
          `roomStateUpdate* ${Platform.OS}`,
        );
      });

      engine.on('roomUserUpdate', (roomID, updateType, userList) => {
        // User status update callback. After a user logs in to a room, when another user joins or leaves the room, the SDK triggers this callback to send a notification.
        console.log(
          roomID,
          updateType,
          userList,
          `roomUserUpdate** ${Platform.OS}`,
        );
      });

      engine.on('roomStreamUpdate', (roomID, updateType, streamList) => {
        // Stream status update callback. After a user logs in to a room, when another user in the room publishes or deletes an audio or video stream, the SDK triggers this callback to send a notification.
        console.log(
          roomID,
          updateType,
          streamList,
          `roomStreamUpdate*** ${Platform.OS}`,
        );


        engine.on('roomTokenWillExpire', (x) => {
          console.log("Token will expire", x)
        })



        if (streamList?.length > 0) {
          engine.stopPreview().then(() => {
            engine
              .startPlayingStream(streamList[0]?.streamID, {
                reactTag: findNodeHandle(previewViewRef.current),
                viewMode: ZegoViewMode.AspectFill,
                backgroundColor: 0,
              })
              .then(e => console.log('starting playing video', e));
          });
        }
      });

      engine.on(
        'publisherStateUpdate',
        (streamID, state, errorCode, extendedData) => {
          console.log(
            'Publishing stream',
            streamID,
            state,
            errorCode,
            extendedData,
          );
        },
      );


      let roomConfig = new ZegoRoomConfig();

      roomConfig.isUserStatusNotify = true;

      roomConfig.token = route?.params?.token

      engine.loginRoom(
        route?.params?.roomId,
        {
          userID: route?.params?.userId,
          userName: route?.params?.userName,
        },
        roomConfig,
      );

      if (previewViewRef.current) {
        try {
          ZegoExpressEngine.instance().startPreview({
            reactTag: findNodeHandle(previewViewRef.current),
            viewMode: ZegoViewMode.AspectFill,
            backgroundColor: 0,
          });
        } catch (error) {
          console.error('Error starting preview:', error);
        }
      }

      engine.getVersion().then(ver => {
        console.log('Express SDK Version: ' + ver);
      });
    });

    return () => {
      console.log('componentWillUnmount');
      if (ZegoExpressEngine.instance()) {
        console.log('[LZP] destroyEngine');
        ZegoExpressEngine.destroyEngine();
      }
    };
  }, [previewViewRef.current, route?.params]);

  return (
    <View style={styles.contianer}>
      {/* <View style={{height: fl}}> */}
      <ZegoTextureView ref={previewViewRef} style={{flex: 1}} />

      {/* </View> */}

      <Pressable
        style={styles.buttonWrapper}
        onPress={() => handleStartStream()}>
        <Text style={styles.texts}>START STREAM</Text>
      </Pressable>
      <Pressable
        style={{
          position: 'absolute',
          marginTop: 700,
          alignSelf: 'center',
        }}
        onPress={() => handleEndStream()}>
        <Image
          source={require('../circle.png')}
          style={styles.cutCall}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    position: 'relative',
    // paddingTop: 10,
  },
  secondPersonView: {
    height: 220,
    width: 160,
    backgroundColor: '#20b2aa',
    borderRadius: 15,
    alignSelf: 'flex-end',
  },

  cutCall: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },

  buttonWrapper: {
    borderRadius: 20,
    backgroundColor: '#FC6736',
    width: 150,
    padding: 8,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 20,
    right: 10,
  },

  texts: {
    color: '#EFECEC',
    fontWeight: '500',
    textAlign: 'center',
  },
});
