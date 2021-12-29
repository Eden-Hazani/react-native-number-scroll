import React from 'react';
declare type NumberScrollProps = {
    /**
     *  Arguments: `number`
     *
     *  Font size of the items
     */
    letterSize?: number;
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
     */
    startingValue: number;
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
    injectValue?: number;
};
declare const _default: React.FunctionComponent<NumberScrollProps>;
export default _default;
