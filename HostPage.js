// HostPage.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'

export default function HostPage(props) {
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltLiveStreaming
                appID={1310828580}
                appSign={"1b377f4531003675751507b9937e6d2b1ac735399271af41bcdfaab60c48f5d0"}
                userID={"rishabh"}
                userName={"xxx"}
                liveID={"giniefahdu"}

                config={{
                    ...HOST_DEFAULT_CONFIG,
                    onLeaveLiveStreaming: () => { console.log("fuck you") }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'red'
    }
})