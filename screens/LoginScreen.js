import { View, SafeAreaView, StatusBar, StyleSheet, Image } from 'react-native'
import React from 'react'
import  LoginForm  from '../components/loginScreen/LoginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const INSTAGRAM_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png'
const LoginScreen = ({navigation}) => (
    <SafeAreaView style={styles.SafeAreaView}>

        <KeyboardAwareScrollView>

            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
                </View>
                <LoginForm navigation={navigation} />

            </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
)


export default LoginScreen 

const styles = StyleSheet.create({
    SafeAreaView: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 12
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    }
});