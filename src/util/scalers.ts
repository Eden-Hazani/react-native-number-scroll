import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const core_factorFont=(size:number)=>{
    let factor = 320;
    if(Dimensions.get('window').width > 600) factor = 470;
    return width / factor * size;
}

const core_scale = (size:number) => width / guidelineBaseWidth * size;
const core_verticalScale = (size:number) => height / guidelineBaseHeight * size;
const core_moderateScale = (size:number, factor = 0.5) => size + ( core_scale(size) - size ) * factor;

export {core_scale, core_verticalScale, core_moderateScale,core_factorFont};