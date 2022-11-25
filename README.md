# react-native-number-scroll

Create simple animated number scroller in react native.

## Main Props
| Prop | Type | Default | Required | Description
| --- | :--: | :--: | --- | :--:
| <b>max</b> | <i>number</i> | undefined | true | The maximum number that can be reached
| <b>min</b> |  <i>number</i> | undefined | true | The minimum number that can be reached
| <b>scrollerWidth</b> |  <i>number</i> | 300 | false | The width of the scroller
| <b>startingIndex</b> |  <i>number</i> | undefined | false | The initial index the scroller will center on
| <b>startingValue</b> |  <i>number</i> | undefined | false | The initial value the scroller will center on (overrides       startingIndex)
| <b>numberStyles</b> |  <i>TextStyle</i> | undefined | false | The styles of the number items
| <b>getValue</b> |  <i>Function</i> | (val:number)=>void | true | The callback the retrieves the currently centered value
| <b>itemMargin</b> |  <i>number</i> | 2 | false | Margin space between each item on the scroller.
| <b>injectedValue</b> |  <i>number</i> | undefined | false | if this value changes the scroller will auto-scroll to the index of that value in the array.
|<b>AddSideButtons</b> |  <i>boolean</i> | false | false | Adding manual side buttons.
|<b>sideButtonOptions</b> |  <i>SideButtonOptions</i> | undefined | false | additional options for the manual buttons.
|<b>pauseStart</b> |  <i>boolean</i> | false | false | if true, value will not be returned on mount.
|<b>listContainerStyle</b> |  <i>ViewStyle</i> | undefined | false | styling for the array container.
|<b>showIndicator</b> |  <i>boolean</i> | false | false | visual indicator that shows the center of the scroller.
|<b>indicatorStyle</b> |  <i>TextStyle</i> | undefined | false | styles for the indicator


## SideButtonOptions
| Prop | Type | Default | Required | Description
| --- | :--: | :--: | --- | :--:
|<b>leftName</b> |  <i>MaterialCommunityIcons name</i> | undefined | false | The type of the left icon (supports MaterialCommunityIcons).
|<b>rightName</b> |  <i>MaterialCommunityIcons name</i> | undefined | false | The type of the right icon (supports MaterialCommunityIcons).
|<b>size</b> |  <i>number</i> | undefined | false | size of the buttons.
|<b>color</b> |  <i>number</i> | undefined | false | color of the buttons.

