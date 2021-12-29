const generateArr = (min:number,max:number,startingValue:number) =>{
    if(min>max) throw new Error('min cannot be greater then max');
    if(startingValue>max || startingValue<min) throw new Error('starting value not in array boundaries');
    return [...Array(Math.floor((max - min) / 1) + 1)].map((_, i) => min + i * 1)
}

export default generateArr