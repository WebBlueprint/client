import React, { useRef, useState } from "react";
import LessonHeader from "../block/Header/Header";
import styles from "../booking/booking.module.css";
import MyPro from "../booking/MyPro";
import Schedule from "../booking/Schedule";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";

const proData = [
  { name: "김민지 프로", lesson: "(10/20)" },
  { name: "김윤철 프로", lesson: "(8/20)" },
  { name: "김동현 프로", lesson: "(8/20)" },
  { name: "윤승우 프로", lesson: "(8/20)" },
  { name: "이현경 프로", lesson: "(8/20)" }
];

const MapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          label={marker.label}
        />
      ))}
    </GoogleMap>
  ))
);

function Booking() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setActiveIndex(null);
    }
  };

  const scrollRight = () => {
    if (startIndex < proData.length - 3) {
      setStartIndex((prevIndex) => Math.min(prevIndex + 1, proData.length - 3));
      setActiveIndex(null);
    }
  };

  const mapMarkers = [
    { lat: -34.397, lng: 150.644, label: "A" },
    // Add more markers as needed
  ];

  return (
    <>
      <div className={styles.lessonContainer}>
        <LessonHeader />
      </div>
      
      {/* Add the Map component with markers */}
      <MapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `119vh`, width: `45%`, float: 'left' }} />} 
        mapElement={<div style={{ height: `100%` }} />}
        markers={mapMarkers}
      />
      <MyPro />
      <Schedule />
    </>
  );
}

export default Booking;