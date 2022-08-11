import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React,{useState,useEffect} from "react";
import { Divider } from "react-native-elements";
import { firebase,db } from "../../firebase";

const postFooterIcons = [
  {
    name: "like",
    img: require("../../assets/heart.png"),
  },
  {
    name: "comment",
    img: require("../../assets/comment.png"),
  },
  {
    name: "share",
    img: require("../../assets/send.png"),
  },
  {
    name: "save",
    img: require("../../assets/save.png"),
  },
];

const Post = ({ post }) => {
  const handleLike=post=>{
    const currentLikeStatus=!post.likes_by_users.includes(
      firebase.auth().curreentUser.email
    )
    db.collection('users').doc(post.owner_email).collection('posts').doc(post.id).update({
      likes_by_users:currentLikeStatus?firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email): firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email),
    }).then(()=>{
      console.log('Document successfully updated!')
    }).catch(error=>{
      console.error('Error updating document: ',error)
    })
  }
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />

      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={styles.postFooterContainer}>
        <PostFooter post={post} handleLike={handleLike}/>
        <Likes post={post} />
        <Caption post={post} />
        <CommentSections post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} likes
      {/* {post.likes_by_users.length.toLocalString('en')} likes */}
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "bold" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSections = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        {post.comments.length > 1
          ? `View all ${post.comments.length} comments `
          : "View comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 2 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user}</Text>
          <Text style={{ fontSize: 12 }}>{" " + comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const PostHeader = ({ post }) => (
  <View style={styles.postHeader}>
    <View style={styles.postFounder}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={styles.textHeader}>{post.user}</Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={styles.postImageContainer}>
    <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
  </View>
);

const PostFooter = ({handleLike,post}) => (
  <View style={styles.footerIconContainer}>
    
    
    <View style={styles.subFooterIconContainer}>
    {/* <TouchableOpacity onPress={()=>handleLike(post)}>
    <Image style={styles.footerIcon} source={{uri:post.likes_by_users.includes(firebase.auth().currentUser.email)?postFooterIcons[0].likedImageUrl:postFooterIcons[0].imageUrl}}/>
    </TouchableOpacity> */}
      <Icon imgStyle={styles.footerIcon} img={postFooterIcons[0].img} />
      <Icon imgStyle={styles.footerIcon} img={postFooterIcons[1].img} />
      <Icon imgStyle={styles.footerIcon} img={postFooterIcons[2].img} />
    </View>
    <View style={styles.subFooterSaveIcon}>
      <Icon imgStyle={styles.footerIcon} img={postFooterIcons[3].img} />
    </View>
  </View>
);

const Icon = ({ imgStyle, img }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={img} />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 30,
  },
  /* PostHeader */
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  postFounder: {
    flexDirection: "row",
    alignItems: "center",
  },
  textHeader: {
    color: "white",
    marginLeft: 5,
    fontWeight: "700",
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  /* PostImage */
  postImageContainer: {
    width: "100%",
    height: 450,
  },
  postImage: {
    height: "100%",
    resizeMode: "cover",
  },
  postFooterContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  footerIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  footerIconContainer: {
    flexDirection: "row",
  },
  subFooterIconContainer: {
    flexDirection: "row",
    width: "33%",
    justifyContent: "space-between",
  },
  subFooterSaveIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default Post;
