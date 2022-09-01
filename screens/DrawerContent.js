import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { useEffect, useState } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../components/context';
import authService from '../service/auth.service';

export function DrawerContent(props) {
    const [user, setUser] = useState({});
    const [visible, setVisible] = React.useState(false);
    useEffect(() => {
        authService.getCurrentUser().then(res => {
            setUser(JSON.parse(res));
        });
    }, []);



    const { signOut } = React.useContext(AuthContext);

    return (





        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>

                            <TouchableOpacity
                                onPress={() => { props.navigation.navigate('Profile') }}
                                style={styles.row}>

                                <Avatar.Image
                                    source={{ uri: user.profileUrl }}
                                    size={50}


                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{user.fullname}</Title>
                                    <Caption style={styles.caption}>{user.roles}</Caption>
                                </View>

                            </TouchableOpacity>

                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Fisherman Registration"
                            onPress={() => { props.navigation.navigate('Fisherman-Registration') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="book-open-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="E-logBook"
                            onPress={() => { props.navigation.navigate('E-logBook') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="map-marker-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Navigation"
                            onPress={() => { props.navigation.navigate('Navigation') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="map-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Prediction"
                            onPress={() => { props.navigation.navigate('Prediction') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="text-box-multiple-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Notice"
                            onPress={() => { props.navigation.navigate('NoticesScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="text-box-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Departure Approval"
                            onPress={() => { props.navigation.navigate('Departure-Approval') }}
                        />

                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: RFPercentage(3),
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: RFPercentage(1.5),
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});