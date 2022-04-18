# react-native-number-scroll



This library gives you the ability to create simple and beautiful number scrollers in your react-native project. 
I am planing on addeing more functionality to this library soon. 

# Props: 

 letterSize?: Font size of the items (number)
 
 AddSideButtons?: Adds clickable buttons at the sides of the scroll allowing incremental clicks (boolean)
 
 pauseStart?: skip getValue at render (boolean)
 
 min: *required - minimum value of the scroll (number)

 max: *required -  maximum value of the scroll (number)
 
 startingValue: *required -  The position value that the scroll will start at (number)
 
 getValue: *required -  Callback returning the current value shown in the scroll (value: number) => void
 
 scrollerWidth?: Width of the scroll item (number)
 
 onPress?: Callback on press of the button () => void
 
 injectValue? Inject a new value to the current scroll state,if the number changes the new change will be injected to the state (number)

 sideButtonColor? hex of the wanted side button color (string)
  
