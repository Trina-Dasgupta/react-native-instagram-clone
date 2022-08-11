import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native'
import React from 'react'
import  SignUpForm  from '../components/signUpScreen/SignUpForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const INSTAGRAM_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png'
const SignUpScreen = ({ navigation }) => (
    <SafeAreaView style={styles.SafeAreaView}>

        <KeyboardAwareScrollView >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
                </View>
                <SignUpForm navigation={navigation} />
            </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
)


export { SignUpScreen }

const styles = StyleSheet.create({
    SafeAreaView: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
        height: '100%'
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    }
});