import { LngLat, Marker } from "mapbox-gl";

export interface Markers{
    marker: Marker,
    color: string,
    lngLat: LngLat
}