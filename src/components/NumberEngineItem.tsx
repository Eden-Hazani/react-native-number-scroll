import React, { useEffect } from 'react';
import {StyleSheet, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { core_factorFont } from '../util/scalers';


interface NumberEngineItemProps {
    numberStyles?:TextStyle;
    item:number;
    index:number;
    itemWidth:number;
    itemMargin:number;
    currentIndex:number;
}


export default function NumberEngineItem({currentIndex,itemMargin,item, index, itemWidth, numberStyles}:NumberEngineItemProps){
    const animatedValue = useSharedValue(.8);

    const animatedStyle = useAnimatedStyle(() => {
        return {transform: [{scale: withSpring(animatedValue.value,{ stiffness: 25, mass: 1 }) }]};
    });

    useEffect(()=>{
        if(index === currentIndex) animatedValue.value = 1.2;
        else animatedValue.value = .8;
    },[currentIndex])

    return(
        <Animated.Text style={[animatedStyle,{
            ...styles.item,
            width:itemWidth,
            minWidth:itemWidth,
            fontSize:core_factorFont(20),
            marginRight:itemMargin,
            marginLeft:itemMargin,
            alignSelf:'center',
            textAlign:'center',
            ...numberStyles
            }]}>{item}</Animated.Text>
    )
}

const styles = StyleSheet.create({
    item: {
        color:'white',
    },
});