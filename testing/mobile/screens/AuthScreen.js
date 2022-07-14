import React, { useState } from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const AuthScreen = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
        <View style = {styles.container} behavior = 'padding'>
            <Image style ={styles.image} source = {require('../public/images/igcar.jpg')} />
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        {!isLogin ? <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput> : null}
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : 'test2'}</Text>
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },

    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },

    image: {
      flex: 1,
      marginTop: 20,
      marginBottom: 10,
    },
  
    safeAreaView: {
      flex: 1,
    },
  
    root: {
      backgroundColor: '#fff',
      flex: 1,
    },
  
    inputView: {
      backgroundColor: '#FFd',
      borderRadius: 8,
      height: 48,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    label: {
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 80,
    },
  
    TextInput: {
      //height: 50,
      //flex: 1,
      // padding: 10,
      //marginLeft: 20,
    },
  
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
  
    loginBtn: {
      borderRadius: 8,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      //marginTop: 40,
      backgroundColor: '#0d6efd',
      //flex: 1,
      paddingHorizontal: 16,
    },
  
    webMail: {
      height: 250,
      fontWeight: 500,
    },

    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '20%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },

    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: '4%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },

    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '10%',
    },

    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  

    button: {
        width: '100%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },

    buttonAlt: {
        width: '100%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },

    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
});

export default AuthScreen;
