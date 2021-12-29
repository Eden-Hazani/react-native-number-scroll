import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import generateArr from '../util/generateArr';
var width = Dimensions.get('window').width;
var Item = function (_a) {
    var item = _a.item, scrollX = _a.scrollX, index = _a.index, scrollerWidth = _a.scrollerWidth, letterSize = _a.letterSize;
    var inputRange = [(index - 1) * scrollerWidth, index * scrollerWidth, (index + 1) * scrollerWidth];
    var scale = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [0, 1, 0]
    });
    return React.createElement(View, { style: [styles.item, { width: scrollerWidth }] },
        React.createElement(Animated.Text, { style: {
                fontSize: letterSize ? letterSize : 25,
                transform: [{ scale: scale }]
            } }, item));
};
var NumberScroll = function (_a) {
    var letterSize = _a.letterSize, AddSideButtons = _a.AddSideButtons, injectValue = _a.injectValue, pauseStart = _a.pauseStart, min = _a.min, max = _a.max, getValue = _a.getValue, startingValue = _a.startingValue, scrollerWidth = _a.scrollerWidth, onPress = _a.onPress;
    var numberArray = useMemo(function () { return generateArr(min, max, startingValue); }, [min, max, startingValue]);
    var scrollWidth = scrollerWidth ? scrollerWidth : (width / 3);
    var _b = useState(startingValue ? numberArray.indexOf(startingValue) : min), primeIndex = _b[0], setPrimeIndex = _b[1];
    var scrollX = React.useRef(new Animated.Value(0)).current;
    var moveIndexRef = React.useRef(null);
    useEffect(function () {
        if (!pauseStart)
            getValue(startingValue ? startingValue : min);
        if (startingValue)
            indexScroll(primeIndex);
    }, []);
    var indexScroll = function (index) { return moveIndexRef.current.scrollToIndex({ animation: false, index: index }); };
    var onViewRef = useRef(function (_a) {
        var _b;
        var viewableItems = _a.viewableItems;
        if (viewableItems[0]) {
            getValue((_b = viewableItems[0]) === null || _b === void 0 ? void 0 : _b.item);
            setPrimeIndex(viewableItems[0].index || 0);
        }
    });
    var viewConfigRef = React.useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true,
        minimumViewTime: 5
    });
    var getItemLayout = function (data, index) { return ({ length: scrollWidth, offset: scrollWidth * index, index: index }); };
    var setIndex = function (newIndex) {
        var regex = new RegExp("^[0-9]+$");
        if (!regex.test(newIndex.toString()))
            return;
        setPrimeIndex(newIndex);
        getValue(newIndex + 1);
        indexScroll(newIndex);
    };
    var RenderItem = useCallback(function (_a) {
        var item = _a.item, index = _a.index;
        return (React.createElement(TouchableOpacity, { onPress: function () { return onPress && onPress(); } },
            React.createElement(Item, { item: item, scrollX: scrollX, letterSize: letterSize, scrollerWidth: scrollWidth, index: index })));
    }, []);
    useEffect(function () {
        var injectIncrement = function (increment) {
            if (increment < 0 || increment >= numberArray.length)
                return;
            indexScroll(increment);
            setPrimeIndex(increment);
            getValue(increment + 1);
        };
        injectValue && injectIncrement(injectValue);
    }, [injectValue]);
    return (React.createElement(View, { style: styles.container },
        AddSideButtons && React.createElement(TouchableOpacity, { onPress: function () { return setIndex(primeIndex - 1); } },
            React.createElement(MaterialCommunityIcons, { name: 'chevron-left', color: 'black', size: 25 })),
        React.createElement(View, { style: { width: scrollWidth } },
            React.createElement(Animated.FlatList, { data: numberArray, viewabilityConfig: viewConfigRef.current, onViewableItemsChanged: onViewRef.current, keyExtractor: function (item) { return item.toString(); }, numColumns: 1, getItemLayout: getItemLayout, showsHorizontalScrollIndicator: false, horizontal: true, scrollEventThrottle: 16, decelerationRate: "fast", snapToInterval: scrollWidth, onEndReachedThreshold: 0.5, ref: moveIndexRef, onScroll: Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true }), renderItem: function (_a) {
                    var item = _a.item, index = _a.index;
                    return React.createElement(RenderItem, { item: item, index: index });
                } })),
        AddSideButtons && React.createElement(TouchableOpacity, { onPress: function () { return setIndex(primeIndex + 1); } },
            React.createElement(MaterialCommunityIcons, { name: 'chevron-right', color: 'black', size: 25 }))));
};
export default React.memo(NumberScroll);
var styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        height: 60,
    },
    button: {
        height: 40,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    item: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
