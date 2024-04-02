// import React from "react";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

const toolLibrary = [53.3939431, -2.9486509, 15];

export default function IndexPage() {
  return (
    <MapContainer
      // style={{ height: "600px" }}
      style={{ height: "90vh" }}
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
    </MapContainer>
  );
}
