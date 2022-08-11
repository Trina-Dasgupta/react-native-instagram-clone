import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import {firebase,db} from '../../firebase';


const LoginForm = ({ navigation }) => {
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    })

    const onLogin=async (email,password)=>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
            console.log("Firebase Login Successful",email,password)
        }catch(error){
            Alert.alert('My Lord...',
            error.message+'\n\n... What would you like to do next',
            [
                {
                    text:'OK',
                    onPress:()=>console.log('OK'),
                    style:'cancel',
                },
                {text:'Sign Up',onPress:()=>navigation.push('SignUpScreen')}
            ])
        }
    }
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    // console.log(values)
                    // navigation.push("HomeScreen")
                    onLogin(values.email,values.password)
                    
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, values, errors, isValid, handleSubmit, touched }) => (
                    <>
                        <View style={[styles.inputField,
                        {
                            borderColor:
                                values.email.length < 1 || Validator.validate(values.email)
                                    ? '#ccc'
                                    : 'red'
                        }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Phone number, username or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />

                        </View>
                        {touched.email && errors.email ? <Text style={{ color: "red", marginLeft: 5, marginBottom: 5 }}>{errors.email}</Text> : null}
                        <View style={[styles.inputField,
                        {
                            borderColor:
                                1 > values.password.length || values.password.length >= 6
                                    ? '#ccc'
                                    : 'red'
                        }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                textContentType='password'
                                autoCorrect={false}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />

                        </View>
                        {touched.password && errors.password ? <Text style={{ color: "red", marginLeft: 5, marginBottom: 5 }}>{errors.password}</Text> : null}
                        <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                            <TouchableOpacity>
                                <Text style={{ color: "#6BB0F5" }}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        <Pressable
                            titleSize={20}
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account?</Text>
                            <TouchableOpacity 
                            onPress={() => navigation.push("SignUpScreen")}
                            >
                                <Text style={{ color: '#6BB0F5' }}> Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,

    },
    // button:(isValid)=> ({
    //     backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    //     //backgroundColor:  '#0096F6' ,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     minHeight: 42,
    //     borderRadius: 4,
    // }),
    button:{
        
        backgroundColor:  '#0096F6' ,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    }
})