import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import  AddNewPost  from '../components/newPost/AddNewPost'
const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default NewPostScreen 

const styles = StyleSheet.create({
    container: {
        //marginTop: StatusBar.currentHeight,
        backgroundColor: 'black',
        flex: 1
    }
})