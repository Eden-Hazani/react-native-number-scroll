# react-native-number-scroll

Create simple animated number scroller in react native.

| Prop | Type | Default | Required | Description
| --- | :--: | :--: | --- | :--:
| <b>max</b> | <i>number</i> | undefined | true | The maximum number that can be reached
| <b>min</b> |  <i>number</i> | undefined | true | The minimum number that can be reached


#### max?: number;
   max:number - the maximum number allowed.

#### 



 max:number;
    min:number;
    disableManualWindow?:boolean;
    scrollerWidth?:number;
    startingIndex?:number;
    startingValue?:number;
    numberStyles?:TextStyle;
    getValue:(val:number)=>void;
    modelStyle?:ViewStyle;
    itemMargin?:number;
    injectedValue?:number;
    AddSideButtons?:boolean;
    sideButtonOptions?:{
        leftName?:keyof typeof MaterialCommunityIcons.glyphMap;
        rightName?:keyof typeof MaterialCommunityIcons.glyphMap;
        size?:number;
        color?:string;
    };
    pauseStart?:boolean;
    listContainerStyle?:ViewStyle;
    showIndicator?:boolean;
    indicatorStyle?:TextStyle;
