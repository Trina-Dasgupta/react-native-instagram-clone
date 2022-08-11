import { StyleSheet, View, TouchableOpacity,Platform , Image } from 'react-native'
import { useState } from 'react'
import { Divider } from 'react-native-elements'

const bottomTabIcons = [
    {
        name: 'Home',
        active: require('../../assets/home_active.png'),
        inactive: require('../../assets/home.png')
    },
    {
        name: 'Search',
        active: require('../../assets/search_active.png'),
        inactive: require('../../assets/search.png')
    },
    {
        name: 'Reels',
        active: require('../../assets/reels_active.png'),
        inactive: require('../../assets/reels.png')
    },
    {
        name: 'Shop',
        active: require('../../assets/cart_active.png'),
        inactive: require('../../assets/cart.png')
    },
    {
        name: 'Profile',
        active: require('../../assets/myProfile.png'),
        inactive: require('../../assets/myProfile.png')
    }
]

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
          <Image source={{uri:activeTab === icon.name ? icon.active : icon.inactive}}
                style={[styles.icon,
                icon.name === '' ? styles.profilePic() : null,
                activeTab === '' && icon.name === activeTab   ? styles.profilePic(activeTab) : null
            ]}/>
                {/* activeTab=== 'Profile' && icon.name===activeTab? styles.profilePic(activeTab) : null */}
        </TouchableOpacity>
    )
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    wrapper: {
        position: 'fixed',
        width: '100%',
        bottom: '0%',
        zIndex: 999,
        backgroundColor: '#000',
        paddingBottom :Platform.OS === "ios" ? 30 : 0
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingTop: 10,
        paddingHorizontal: 25
    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === "Profile" ? 2 : 0,
        borderColor: '#fff'
    })
})


export { BottomTabs, bottomTabIcons }