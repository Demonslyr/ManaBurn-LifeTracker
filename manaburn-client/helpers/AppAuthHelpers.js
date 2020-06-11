import * as AppAuth from 'expo-app-auth';
import {AsyncStorage} from 'react-native';

let config = {
    issuer: 'https://auth.drinkpoint.me',
    scopes: ['ManaburnServer_0001','offline_access', 'openid', 'profile','email'],
    clientId: 'ManaburnMobileLogin-384cd523445548a986d3519f12430e2a',
};

let StorageKey = '@Manaburn:ManaburnOAuthKey';

export async function signInAsync() {
    let authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    return authState;
}

async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    if (authState) {
        if (checkIfTokenExpired(authState)) {
            return refreshAuthAsync(authState);
        } else {
            return authState;
        }
    }
    return null;
}

export async function getUserRoles({accessToken}) {
    // split the access token on '.' then grab the payload section, base64 decode it, cast that to json, then selec the role section if it exists
    const {role} = JSON.parse(btoa(accessToken.split(".")[1]));
    // return that role.
    return role;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    await cacheAuthAsync(authState);
    return authState;
}

export async function signOutAsync({ accessToken }) {
    try {
        await AppAuth.revokeAsync(config, {
            token: accessToken,
            isClientIdProvided: true,
        });
        await AsyncStorage.removeItem(StorageKey);
        return null;
    } catch (e) {
        alert(`Failed to revoke token: ${e.message}`);
    }
}
