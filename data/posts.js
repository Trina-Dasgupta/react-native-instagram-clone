import { USERS } from "./USERS.js";

export const POSTS = [
    {
        imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        user: USERS[0].user,
        profile_picture: USERS[0].image,
        caption: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
        hasLiked: true,
        likes: 1200,
        comments: [
            {
                user: USERS[1].user,
                comment: "Nice post mate!",
            },
            {
                user: USERS[2].user,
                comment: "I like your post",
            },
        ],
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        user: USERS[1].user,
        profile_picture: USERS[1].image,
        caption: "Nice view! Have a great day ahead",
        hasLiked: false,
        likes: 73,
        comments: [
 
        ],
    },
    {
        imageUrl: "https://images.unsplash.com/1/type-away.jpg?q=80&fm=jpg",
        user: USERS[3].user,
        profile_picture: USERS[3].image,
        caption: "codding is fun, right? Have fun and practice more to be a pro",
        hasLiked: false,
        likes: 12,
        comments: [
            {
                user: USERS[4].user,
                comment: "Yeah I like that",
            },
            {
                user: USERS[2].user,
                comment: "of course, I do",
            },
        ],
    },

];