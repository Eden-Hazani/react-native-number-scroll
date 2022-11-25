# react-native-number-scroll



This library gives you the ability to create simple and beautiful number scrollers in your react-native project. 
I am planing on addeing more functionality to this library soon. 

# Props: 
#### AddSideButtons?: boolean;
   AddSideButtons:boolean - Adds clickable buttons at the sides of the scroll allowing incremental clicks
#### pauseStart?: boolean; 
    skip getValue at render
#### min: number;
    min:number - minimum value of the scroll
#### max: number;
    max:number - maximum value of the scroll
#### startingValue?:number;
    startingValue:number - The position value that the scroll will start at if not filled scroll will start at min
#### startingIndex?:number:
    startingIndex:number - The index value that the scroll will start at if not filled scroll will start at min (overrides startingValue)
     
#### getValue: (value: number) => void:
    value:number - Callback returning the current value shown in the scroll
     
#### scrollerWidth?: number: 
    Width of the scroll item

#### onPress?: () => void: 
    - Callback on press of the button 

#### injectValue?:number:
    injectValue:number - The current item you wish to auto scroll to (can be managed by state, updates on state update)
#### fontStyle?:TextStyle:
    injectValue:TextStyle - Style of the scroll font

#### sideButtonStyle:
    {color:string,size:number} - object containing the color and size of the side buttons.
#### sideButtonName?:
    {left:string,right:string} - Object containing the icon name of the side buttons (supports MaterialCommunityIcons);
  
