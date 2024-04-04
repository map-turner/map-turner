// import React from "react";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { graphql } from "gatsby";

const toolLibrary = [53.3939431, -2.9486509, 15];

const palette = {
  rose: "f72585",
  fandango: "b5179e",
  grape: "7209b7",
  chryslerBlue: "560bad",
  darkBlue: "480ca8",
  zaffre: "3a0ca3",
  palatinateBlue: "3f37c9",
  neonBlue: "4361ee",
  chefchaouenBlue: "4895ef",
  vividSkyBlue: "4cc9f0",
};

const getColor = (magicNumber) => {
  if (magicNumber === 1) {
    return "#" + palette.rose;
  } else if (magicNumber < 10) {
    return "#" + palette.fandango;
  } else if (magicNumber < 50) {
    return "#" + palette.grape;
  } else if (magicNumber < 100) {
    return "#" + palette.chryslerBlue;
  } else if (magicNumber < 150) {
    return "#" + palette.darkBlue;
  } else if (magicNumber < 200) {
    return "#" + palette.zaffre;
  } else if (magicNumber < 250) {
    return "#" + palette.palatinateBlue;
  } else if (magicNumber < 300) {
    return "#" + palette.neonBlue;
  } else {
    return "#" + palette.vividSkyBlue;
  }
};

const prepareCircle = (roughItem) => {
  return {
    position: [roughItem.node.latitude, roughItem.node.longitude],
    postcode: roughItem.node.postcode,
    color: getColor(roughItem.node.Count_sum),
    sum: roughItem.node.Count_sum,
    result:
      "Postcode: " +
      roughItem.node.postcode +
      " - Loans: " +
      roughItem.node.Count_sum,
  };
};

const MapPage = ({ data }) => {
  const circles = data.allPostcodesCsv.edges.map((item) => {
    return prepareCircle(item);
  });

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
      {circles.map((circle) => (
        <Circle
          key={circle.postcode}
          center={circle.position}
          radius="50"
          opacity="0.7"
          color={circle.color}
        >
          <Popup>{circle.result}</Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export const query = graphql`
  query MyQuery {
    allPostcodesCsv {
      edges {
        node {
          Count_sum
          latitude
          longitude
          postcode
        }
      }
    }
  }
`;
export default MapPage;
