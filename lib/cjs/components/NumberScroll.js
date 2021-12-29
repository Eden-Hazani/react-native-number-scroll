"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_2 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var generateArr_1 = __importDefault(require("../util/generateArr"));
var width = react_native_1.Dimensions.get('window').width;
var Item = function (_a) {
    var item = _a.item, scrollX = _a.scrollX, index = _a.index, scrollerWidth = _a.scrollerWidth, letterSize = _a.letterSize;
    var inputRange = [(index - 1) * scrollerWidth, index * scrollerWidth, (index + 1) * scrollerWidth];
    var scale = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [0, 1, 0]
    });
    return react_1.default.createElement(react_native_1.View, { style: [styles.item, { width: scrollerWidth }] },
        react_1.default.createElement(react_native_1.Animated.Text, { style: {
                fontSize: letterSize ? letterSize : 25,
                transform: [{ scale: scale }]
            } }, item));
};
var NumberScroll = function (_a) {
    var letterSize = _a.letterSize, AddSideButtons = _a.AddSideButtons, injectValue = _a.injectValue, pauseStart = _a.pauseStart, min = _a.min, max = _a.max, getValue = _a.getValue, startingValue = _a.startingValue, scrollerWidth = _a.scrollerWidth, onPress = _a.onPress;
    var numberArray = (0, react_1.useMemo)(function () { return (0, generateArr_1.default)(min, max, startingValue); }, [min, max, startingValue]);
    var scrollWidth = scrollerWidth ? scrollerWidth : (width / 3);
    var _b = (0, react_1.useState)(startingValue ? numberArray.indexOf(startingValue) : min), primeIndex = _b[0], setPrimeIndex = _b[1];
    var scrollX = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    var moveIndexRef = react_1.default.useRef(null);
    (0, react_1.useEffect)(function () {
        if (!pauseStart)
            getValue(startingValue ? startingValue : min);
        if (startingValue)
            indexScroll(primeIndex);
    }, []);
    var indexScroll = function (index) { return moveIndexRef.current.scrollToIndex({ animation: false, index: index }); };
    var onViewRef = (0, react_2.useRef)(function (_a) {
        var _b;
        var viewableItems = _a.viewableItems;
        if (viewableItems[0]) {
            getValue((_b = viewableItems[0]) === null || _b === void 0 ? void 0 : _b.item);
            setPrimeIndex(viewableItems[0].index || 0);
        }
    });
    var viewConfigRef = react_1.default.useRef({
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
    var RenderItem = (0, react_1.useCallback)(function (_a) {
        var item = _a.item, index = _a.index;
        return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return onPress && onPress(); } },
            react_1.default.createElement(Item, { item: item, scrollX: scrollX, letterSize: letterSize, scrollerWidth: scrollWidth, index: index })));
    }, []);
    (0, react_1.useEffect)(function () {
        var injectIncrement = function (increment) {
            if (increment < 0 || increment >= numberArray.length)
                return;
            indexScroll(increment);
            setPrimeIndex(increment);
            getValue(increment + 1);
        };
        injectValue && injectIncrement(injectValue);
    }, [injectValue]);
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        AddSideButtons && react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return setIndex(primeIndex - 1); } },
            react_1.default.createElement(vector_icons_1.MaterialCommunityIcons, { name: 'chevron-left', color: 'black', size: 25 })),
        react_1.default.createElement(react_native_1.View, { style: { width: scrollWidth } },
            react_1.default.createElement(react_native_1.Animated.FlatList, { data: numberArray, viewabilityConfig: viewConfigRef.current, onViewableItemsChanged: onViewRef.current, keyExtractor: function (item) { return item.toString(); }, numColumns: 1, getItemLayout: getItemLayout, showsHorizontalScrollIndicator: false, horizontal: true, scrollEventThrottle: 16, decelerationRate: "fast", snapToInterval: scrollWidth, onEndReachedThreshold: 0.5, ref: moveIndexRef, onScroll: react_native_1.Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true }), renderItem: function (_a) {
                    var item = _a.item, index = _a.index;
                    return react_1.default.createElement(RenderItem, { item: item, index: index });
                } })),
        AddSideButtons && react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () { return setIndex(primeIndex + 1); } },
            react_1.default.createElement(vector_icons_1.MaterialCommunityIcons, { name: 'chevron-right', color: 'black', size: 25 }))));
};
exports.default = react_1.default.memo(NumberScroll);
var styles = react_native_1.StyleSheet.create({
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
