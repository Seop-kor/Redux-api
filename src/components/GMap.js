import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

function GMap({latLon, itemlist}){
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "Google-Api-Key"
  });

  const [map, setMap] = React.useState(null);

  // const center = {
    // lat: Number(latLon.lat),
    // lng: Number(latLon.lon)
  // };
  // const center = latLon ? {lat: Number(latLon.lat), lng: Number(latLon.lon)} : {lat: Number(itemlist[0].mapY), lng: Number(itemlist[0].mapX)};
  const center = latLon ? {lat: Number(latLon.lat), lng: Number(latLon.lon)} : itemlist.length > 0 ? {lat: Number(itemlist[0].mapY), lng: Number(itemlist[0].mapX)} : {lat: 0, lng: 0};
  console.log("center : ", center);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
         {/* Marker ForEach */}
         {itemlist.map(i => <Marker position={{lat: Number(i.mapY), lng: Number(i.mapX)}} icon={'./img/marker.png'} key={i.contentId} />)}
      </GoogleMap>
  ) : <></>
}

export default React.memo(GMap);