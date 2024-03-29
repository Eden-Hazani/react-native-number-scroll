
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle, ViewToken } from "react-native";
import { core_moderateScale } from "../util/scalers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";
import generateArr from '../util/generateArr';
import NumberEngineItem from "./NumberEngineItem";

interface NumberScrollProps{
    /**
     *  @param max:number
     *  The maximum number that can be reached
     */
    max:number;
    /**
     * @param min:number
     * The minimum number that can be reached
     *  
     * @default undefined
     */
    min:number;
    /**
     * @param scrollerWidth:number
     * The width of the scroller
     * 
     * @default 300
     */
    scrollerWidth?:number;
    /**
     * @param startingIndex:number
     * The starting index of the scroller
     * 
     * @default undefined
     */
    startingIndex?:number;
    /**
     * @param startingValue:number
     * The starting value of the scroller (overrides startingIndex)
     *  
     * @default undefined
     */
    startingValue?:number;
    /**
     * @param numberStyles:TextStyle
     * The styles of the numbers
     * 
     * @default undefined
     */
    numberStyles?:TextStyle;
    /**
     * @param getValue:(val:number)=>void
     * The function that is called when the value changes, returning the value 
     */
    getValue:(val:number)=>void;
    /**
     * @param itemMargin:number
     * The margin of the scroller items
     *  
     * @default 2
     */
    itemMargin?:number;
    /**
     * @param injectedValue:number
     * if this value changes the scroller will auto-scroll to the index of that value in the array.
     * 
     * @default undefined
     */
    injectedValue?:number;
    /**
     * @param AddSideButtons:number
     * if this value is true, the scroller will have side buttons to increment and decrement the value
     *  
     * @default false
     */
    AddSideButtons?:boolean;
    /**
     * @param sideButtonOptions:Object
     * Additional options for the side buttons
     *  
     * @default undefined
     */
    sideButtonOptions?:{
        leftName?:keyof typeof MaterialCommunityIcons.glyphMap;
        rightName?:keyof typeof MaterialCommunityIcons.glyphMap;
        size?:number;
        color?:string;
    };
    /**
     * @param pauseStart:boolean
     * if this value is true, the scroller will not return value on mount
     * 
     * @default false
     */
    pauseStart?:boolean;
    /**
     * @param listContainerStyle:ViewStyle
     * The style of the list container
     * 
     * @default undefined
     */
    listContainerStyle?:ViewStyle;
    /**
     * @param showIndicator:boolean
     * if this value is true, the scroller will show an indicator
     *  
     * @default false
     */
    showIndicator?:boolean;
    /**
     * @param indicatorStyle:ViewStyle
     * The style of the indicator
     * 
     * @default undefined
     */
    indicatorStyle?:TextStyle;
}

const RenderSideButton : React.FC<any> = ({onPress,color,size,side}:{side:keyof typeof MaterialCommunityIcons.glyphMap,onPress:()=>void,color:string,size:number}) =>{
    return(
        <TouchableOpacity onPress={() => onPress() }>
            <MaterialCommunityIcons name={side} color={color ? color : 'white'} size={size ? size : core_moderateScale(35)} />
        </TouchableOpacity>
    )
}
 

function NumberScroll({indicatorStyle,showIndicator,listContainerStyle,sideButtonOptions,pauseStart,AddSideButtons,injectedValue,itemMargin,startingValue,startingIndex,min,max,scrollerWidth,numberStyles,getValue}:NumberScrollProps){
    const [currentIndex,setCurrentIndex] = useState<number>(startingIndex ? startingIndex : 0);
    const numberArray = generateArr(min,max);
    const scrollWidth = scrollerWidth ? scrollerWidth : core_moderateScale(300);
    const itemWidth = scrollWidth / 3;
    const baseItemMargin = itemMargin ? itemMargin : core_moderateScale(2);
    const totalButtonSize = AddSideButtons ? sideButtonOptions?.size ? sideButtonOptions?.size * 2 : core_moderateScale(35) * 2 : 0;
    const moveIndexRef = React.useRef<any>(null);

    const indexScroll=(index:number)=> moveIndexRef.current.scrollToIndex({ animation: false, index });

    useEffect(()=>{
        if (!pauseStart) getValue(startingValue  !== undefined ? startingValue : min);
        if(startingValue){
            const index = numberArray.findIndex((val)=>val === startingValue);
            setCurrentIndex(index);       
        }
        else if (startingIndex) setCurrentIndex(startingIndex);
    },[])

    useDidUpdateEffect(() => {
        handleInjectedValue(injectedValue)
    },[injectedValue])

    const handleInjectedValue=(value:number|undefined)=>{
        if(value === undefined) return;
        if( value<min || value>max ) return;
        const index = numberArray.indexOf(value);
        if(index<0) return;
        indexScroll(index);
    }

    const onViewRef = useRef(({ viewableItems }:{viewableItems:ViewToken[]}) => {
        if (viewableItems.length>0 && viewableItems[0]?.index !== null) {
            updateValue(viewableItems[0]?.index);
        }
    });

    const updateValue=(value:number)=>{
        getValue(numberArray[value]);
        setCurrentIndex(value);
    }

    const viewConfigRef = React.useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true,
        minimumViewTime: 5
    })

    const getItemLayout = (data: number[] | null | undefined, index:number) => (
        { length: itemWidth + (baseItemMargin*2), offset: (itemWidth + (baseItemMargin*2)) * index, index }
    )

    const defineStartIndex=()=>{
        if(startingIndex !== undefined) return startingIndex
        if(startingValue !== undefined) return numberArray.indexOf(startingValue)
        return 0
    }
    
    const manualDecrement = (action:'add'|'deduct') => {
        if(action === 'add'){
            if(currentIndex === numberArray.length-1) return;
            setCurrentIndex(PS=>PS+1);
            indexScroll(currentIndex+1);
            getValue(numberArray[currentIndex+1]);
        }
        else if (action === 'deduct'){
            if(currentIndex === 0) return;
            setCurrentIndex(PS=>PS-1);
            indexScroll(currentIndex-1);
            getValue(numberArray[currentIndex-1]);
        }
    }

    const renderItem = useCallback(({item,index}:{item:number,index:number}) => {
        return(
            <NumberEngineItem 
                itemWidth={itemWidth}
                itemMargin={baseItemMargin}
                item={item}
                index={index}
                currentIndex={currentIndex}
                numberStyles={numberStyles}
            />
        )
    },[currentIndex,numberArray])

    return(
        <View style={[styles.container,{...listContainerStyle,width:scrollWidth + totalButtonSize}]}>
            {AddSideButtons ?  <RenderSideButton 
                size={sideButtonOptions?.size}
                color={sideButtonOptions?.color}
                side={sideButtonOptions?.leftName ? sideButtonOptions?.leftName : 'chevron-left'}
                onPress={() =>manualDecrement('deduct') }
            />
            :null}
            {showIndicator ? <MaterialCommunityIcons style={styles.indictor} name={'chevron-down'} size={core_moderateScale(20)} {...indicatorStyle} />:null}
            <FlatList
                    contentContainerStyle={{alignItems:'center',justifyContent:'center',marginLeft:itemWidth,paddingRight:itemWidth*2}}
                    style={{width:scrollWidth,alignSelf:'center'}}
                    data={numberArray}
                    initialScrollIndex={defineStartIndex()}
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    keyExtractor={(item) => item.toString()}
                    getItemLayout={getItemLayout}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    keyboardShouldPersistTaps='always'
                    snapToAlignment={"center"}
                    disableScrollViewPanResponder={true}
                    snapToOffsets={[...Array(numberArray.length)]?.map((x, i) => (i * (itemWidth + (baseItemMargin*2)) ))}
                    ref={moveIndexRef}
                    renderItem={renderItem}
                />
                {AddSideButtons ?  <RenderSideButton 
                    size={sideButtonOptions?.size}
                    color={sideButtonOptions?.color}
                    side={sideButtonOptions?.rightName ? sideButtonOptions?.rightName : 'chevron-right'}
                    onPress={() =>manualDecrement('add') }
                />
                :null}
        </View>
    )
}


export default NumberScroll

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        height: 60,
    },
    model:{
        width:core_moderateScale(150),
        height:core_moderateScale(120),
    },
    indictor:{
        position:'absolute',
        top:-core_moderateScale(16),
        alignSelf:'center',
    }
    
});