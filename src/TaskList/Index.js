import React from "react";
import { View , Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'


export default function TaskList({deletar,data}){

    return(
        <Animatable.View 
        style={style.container}
        animation='bounceIn'
        useNativeDriver
        >
            <TouchableOpacity onPress={()=>deletar(data)}>
                <Ionicons name='md-checkmark-circle' size={30} color="#000"/>
            </TouchableOpacity>
            <View>
            <Text style={style.task} >{data.task} </Text>
            </View>
        </Animatable.View>
    )
}
const style = StyleSheet.create({
    listItem:{
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row'
    },
    container:{
        flex:1,
        margin:12,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:10,
        padding:10,
        elevation:2,
        shadowColor:'#000',
        shadowOpacity:0.2
    },
    task:{
        color:'orange',
        fontSize:20,
        paddingLeft:10
    }
})