import { useEffect, useState } from "react";

interface UseCoordsState{
    longitude:number|null;
    latitude:number|null;
}

export default function useCoords(){
    const [coords,setCoords]=useState({
        latitude:0,
        longitude:0
    });
    const onSuccess=(coords:GeolocationPosition)=>{
        console.log(coords);
    }
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(onSuccess)
    },[])
    return coords;
}