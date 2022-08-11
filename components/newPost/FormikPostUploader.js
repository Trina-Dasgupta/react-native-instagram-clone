import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, useFormikContext, Field } from "formik";
import { Button, Divider } from "react-native-elements";
 import validUrl from 'valid-url'
// import * as ImagePicker from 'expo-image-picker';
import {db,firebase} from '../../firebase'

const PLACEHOLDER_IMG =
  "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";

const uploaderPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

  const getUserName=()=>{
    const user=firebase.auth().currentUser
    const unsubscribe=db.collection('users').where('owner_uid','=',user.uid).limit(1).onSnapshot(
      snapshot=>snapshot.docs.map(doc=>{
        setCurrentLoggedInUser({
          username:doc.data().username,
          profilePicture:doc.data().profile_picture
        })
      })
    )
    return unsubscribe
  }

  useEffect(() => {
    getUserName()
  }, [])
  const uploadPostToFirebase=(imageUrl,caption)=>{
    const unsubscribe=db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add({
      imageUrl:imageUrl,
      user:currentLoggedInUser.username,
      profile_picture:currentLoggedInUser.profilePicture,
      owner_uid:firebase.auth().currentUser.uid,
      owner_email:firebase.auth().currentUser.email,
      caption:caption,
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),
      
      likes_by_users:[],
      comments:[],
    }).then(()=>navigation.goBack())
    return unsubscribe
  }
  
  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        console.log(values);
        console.log('Your post has submitted successfully')
        navigation.goBack()
        //uploadPostToFirebase(values.imageUrl,values.caption)
      }}
      validationSchema={uploaderPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG  }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder="Write a caption ..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
              {errors.caption && (
                <Text style={{ color: "red" }}>{errors.caption}</Text>
              )}
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
          onChange={(e)=>setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 18 }}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
           {errors.imageUrl && (
                <Text style={{ fontSize:10,color: "red" }}>{errors.imageUrl}</Text>
              )}
               <Button onPress={handleSubmit} title='Share' disabled={!isValid || thumbnailUrl == null} />

        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default FormikPostUploader;
