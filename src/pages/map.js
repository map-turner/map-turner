// import React from "react";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

const toolLibrary = [53.3939431, -2.9486509, 15];

const users = [
  {
    position: [53.3913328, -2.9575773, 15],
    radius: 50,
    opacity: 0.5,
    color: "#33ff69",
    info: "Hello. Is it me you're looking for?",
  },
  {
    position: [53.395836, -2.949445, 17],
    radius: 100,
    opacity: 0.5,
    color: "#ff3392",
    info: "Coffee Lodge",
  },
  {
    position: [53.3952227, -2.959766, 15],
    radius: 135,
    opacity: 0.5,
    color: "#3388ff",
    info: "Red Sea",
  },
];

export default function IndexPage() {
  return (
    <MapContainer
      // style={{ height: "600px" }}
      style={{ height: "95vh" }}
      center={toolLibrary}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={toolLibrary}>
        <Popup>
          The Tool Library. <br /> That's where the tools are.
        </Popup>
      </Marker>
      {users.map((user) => (
        <Circle
          center={user.position}
          radius={user.radius}
          opacity={user.opacity}
          color={user.color}
        >
          <Popup>{user.info}</Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
