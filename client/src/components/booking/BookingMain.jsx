import React, { useState, useEffect } from "react";
import style from "./BookingMain.module.css";
import BookingInfo from "./BookingInfo";
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from "react-google-maps";
import markersData from "./markers.json";

const MapComponent = withScriptjs(withGoogleMap(props => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);

  useEffect(() => {
    setMarkers(markersData);
  }, []);

  const handleMarkerClick = (markerInfo) => {
    console.log(markerInfo);
    setSelectedMarkerInfo(markerInfo);
  };

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 3.1791335713607203, lng: 101.71264274964003 }}
      mapContainerStyle={{
        width: "95%",
        height: "78vh",
        borderRadius: "0 20px 20px 0"
      }}
      style={{ borderRadius: "0 20px 20px 0" }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}

      {selectedMarkerInfo && (
        <InfoWindow
          position={{ lat: selectedMarkerInfo.lat, lng: selectedMarkerInfo.lng }}
          onCloseClick={() => setSelectedMarkerInfo(null)}
        >
          <div>
            <h3>{selectedMarkerInfo.name}</h3>
            <p>{selectedMarkerInfo.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}));

const BookingMain = () => {
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  console.log(selectedMarkerInfo); // Add this line for debugging

  return (
    <div className={style.mainwrap}>
      <div>
        <MapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "78vh", width: "95%", borderRadius: "0 20px 20px 0" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          setSelectedMarkerInfo={setSelectedMarkerInfo}
        />
      </div>

      <div>
        <BookingInfo selectedMarkerInfo={selectedMarkerInfo} />
      </div>
    </div>
  );
};

export default BookingMain;
