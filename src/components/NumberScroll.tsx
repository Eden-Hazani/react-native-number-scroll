import React , { useCallback, useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, ViewToken,TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import generateArr from '../util/generateArr';
const { width } = Dimensions.get('window');

type NumberScrollProps = {
    /**
     *  Arguments: `boolean`
     *  
     *  Adds clickable buttons at the sides of the scroll allowing incremental clicks
     */
    AddSideButtons?: boolean;
    /**
     *  Arguments: `boolean`
     *  
     *  skip getValue at render
     */
    pauseStart?: boolean;
    /**
     *  Arguments: `number`
     *  
     *  minimum value of the scroll
     */
    min: number;
    /**
     *  Arguments: `number`
     *  
     *  maximum value of the scroll
     */
    max: number;
    /**
     *  Arguments: `number`
     *  
     *  The position value that the scroll will start at
     *  if not filled scroll will start at min
     */
    startingValue?:number;
    /**
     *  Arguments: `val : any`
     *  
     *  Callback returning the current value shown in the scroll
     */
    getValue: (value: number) => void;
    /**
     *  Arguments: `number`
     *  
     *  Width of the scroll item
     */
    scrollerWidth?: number;
    /** 
     *  Callback on press of the button
     */
    onPress?: () => void;
    /** 
     *  Arguments: `number`
     * 
     *  Inject a new value to the current scroll state
     *  if the number changes the new change will be injected to the state 
     */
    injectValue?:number;
    /** 
     *  Arguments: `TextStyle`
     * 
     *  Style of the scroll font
     */
    fontStyle?:TextStyle;

}

const Item: React.FC<any> = ({ item, scrollX, index, scrollerWidth, fontStyle }) => {
    const inputRange = [(index - 1) * scrollerWidth, index * scrollerWidth, (index + 1) * scrollerWidth];
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0]
    })

    return <View style={[styles.item,{width:scrollerWidth}]}>
        <Animated.Text style={{
            ...fontStyle,
            transform: [{ scale: scale }]
        }}>{item}</Animated.Text>
    </View>
}

const NumberScroll: React.FunctionComponent<NumberScrollProps> = ({
     AddSideButtons,injectValue,
    pauseStart, min, max, getValue,startingValue,
    scrollerWidth, onPress,fontStyle }) => {
        
        const numberArray = useMemo(() => generateArr(min,max,startingValue), [min,max,startingValue]);
        const scrollWidth = scrollerWidth ? scrollerWidth : (width/3);
    
        const [primeIndex, setPrimeIndex] = useState(startingValue ? numberArray.indexOf(startingValue) : min);
    
        const scrollX = React.useRef(new Animated.Value(0)).current;
        const moveIndexRef = React.useRef<any>(null);
        
        useEffect(() => {
            if (!pauseStart) getValue(startingValue ? startingValue : min);
            if(startingValue) indexScroll(primeIndex);
        }, []);
        
        const indexScroll=(index:number)=> moveIndexRef.current.scrollToIndex({ animation: false, index });
        
        const onViewRef = useRef(({ viewableItems }:{viewableItems:ViewToken[]}) => {
            if (viewableItems[0]) {
                getValue(viewableItems[0]?.item)
                setPrimeIndex(viewableItems[0].index || 0)
            }
        });
    
        const viewConfigRef = React.useRef({
            itemVisiblePercentThreshold: 50,
            waitForInteraction: true,
            minimumViewTime: 5
        })
    
        const getItemLayout = (data: number[] | null | undefined, index:number) => (
            { length: scrollWidth, offset: scrollWidth * index, index }
        )
    
        const setIndex = (newIndex:number) => {
            const regex = new RegExp("^[0-9]+$")
            if (!regex.test(newIndex.toString())) return;
            setPrimeIndex(newIndex)
            getValue(newIndex + 1)
            indexScroll(newIndex)
        }
    
        const RenderItem = useCallback(({ item,index }) => {
            return (
                <TouchableOpacity onPress={()=>onPress && onPress() }>
                    <Item fontStyle={fontStyle} item={item} scrollX={scrollX} scrollerWidth={scrollWidth} index={index} />
                </TouchableOpacity>
            );
        }, []);
    
        useEffect(()=>{
            const injectIncrement=(increment:number)=>{ 
                if (increment < 0 || increment >= numberArray.length) return;
                indexScroll(increment);
                setPrimeIndex(increment);
                getValue(increment + 1);
            }
            injectValue && injectIncrement(injectValue)
        },[injectValue])
    
    return (
        <View style={styles.container}>
            {AddSideButtons && <TouchableOpacity onPress={() => setIndex(primeIndex - 1)}>
                <MaterialCommunityIcons name={'chevron-left'} color={'black'} size={25} />
            </TouchableOpacity>}
            <View style={{ width: scrollWidth }}>
                <Animated.FlatList
                    data={numberArray}
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    keyExtractor={(item) => item.toString()}
                    numColumns={1}
                    getItemLayout={getItemLayout}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    snapToInterval={scrollWidth}
                    onEndReachedThreshold={0.5}
                    ref={moveIndexRef}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    renderItem={({ item, index }) => <RenderItem item={item} index={index}/>} />
            </View>
            {AddSideButtons && <TouchableOpacity onPress={() => setIndex(primeIndex + 1)}>
                <MaterialCommunityIcons name={'chevron-right'} color={'black'} size={25} />  
            </TouchableOpacity>}
        </View>
    )
}

export default React.memo(NumberScroll) as React.FunctionComponent<NumberScrollProps>


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        height: 60,
    },
    button:{
        height:40,
        width:120,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:15
    },
    item: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});