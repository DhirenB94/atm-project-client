import { useEffect, useState, useRef, useCallback } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl, NavigationControl} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import { Room } from "@material-ui/icons";
import AtmIcon from '@material-ui/icons/Atm';
import axios from "axios";
import { format } from "timeago.js";
import {addPin} from '../api'
import './map.css';
// import Register from '../components/Register'
// import Login from '../components/Login'




function Map() {
  const myStorage = window.localStorage;
  // const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const currentUser = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [name, setName] = useState(null);
  const [comment, setComment] = useState(null);
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 38.722252,
    longitude: -9.139337,
    zoom: 11,
  });
  const myMap = useRef();
  const geolocateControlStyle= {
    right: 20,
    top: 10
  };
  const navControlStyle= {
    right: 20,
    top: 50
  };  

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      name,
      comment,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await addPin(newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleLogout = () => {
  //   setCurrentUser(null);
  //   myStorage.removeItem("user");
  // };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
 
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  return (
    <div className="App">
      <ReactMapGL
      ref={myMap}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick ={handleAddClick}
        mapStyle ="mapbox://styles/dhirenb17/ckou2d2c92j4v17sed5zzij8x"
      >
     < Geocoder mapRef={myMap} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX} position="top-left" onViewportChange={handleGeocoderViewportChange}/> 
        <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}  
        auto
      />

      <NavigationControl style={navControlStyle} />
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-viewport.zoom * 1.5}
              offsetTop={-viewport.zoom * 3}
            >
              <AtmIcon
                style={{
                  fontSize: viewport.zoom * 3,
                  color:
                   p.username === currentUser  ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>

            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label className="label">ATM</label>
                  <h4>{p.name}</h4>
                  <p>{p.comment}</p>
                  <span className="username">
                    Created by <b>{p.username} </b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
    <>
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form className="cardsubmit" onSubmit={handleSubmit}>
            <label className="label">ATM</label>
            <input placeholder="Enter a name"
            autoFocus
            onChange={(e) => setName(e.target.value)} className="input"/>
            <label className="label">Comments</label>
            <textarea placeholder="Enter comments"
            onChange={(e) => setComment(e.target.value)} className="input" rows="3"/>
            <button type="submit" className="submitButton"> Add ATM </button>

            </form>
          </div>
        </Popup>
    </>
        )}
        {/* {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register" onClick={() => setShowRegister(true)}  
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>} */}
      </ReactMapGL>
    </div>
  );
}

export default Map;
