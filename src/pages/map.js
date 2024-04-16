// import React from "react";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { graphql } from "gatsby";
import "./map.css";

const toolLibrary = [53.3939431, -2.9486509, 15];

const palette = [
  "#03071e",
  "#370617",
  "#6a040f",
  "#9d0208",
  "#d00000",
  "#dc2f02",
  "#e85d04",
  "#f48c06",
  "#faa307",
  "#ffba08",
];

// TODO: contrast people who came only once with recurring users
// TODO: take number of people per postcode into account
// TODO: add layers for income/education/density...?

const getColor = (magicNumber) => {
  // TODO: find min/max values and use max here???
  const percentage = (magicNumber / 200) * 100;
  // TODO: improve split of numbers
  if (percentage < 3) {
    return palette[0];
  } else if (percentage < 6) {
    return palette[1];
  } else if (percentage < 10) {
    return palette[2];
  } else if (percentage < 15) {
    return palette[3];
  } else if (percentage < 25) {
    return palette[4];
  } else if (percentage < 35) {
    return palette[5];
  } else if (percentage < 45) {
    return palette[6];
  } else if (percentage < 60) {
    return palette[7];
  } else if (percentage < 80) {
    return palette[8];
  } else {
    return palette[9];
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

  // TODO: add time ranges to items in Python and use slider to change range
  const [sliderPosition, setSliderPosition] = React.useState(0);

  const handleSliderChange = (event) => {
    setSliderPosition(parseInt(event.target.value, 10));
  };

  const scale = [
    // TODO: display actual values rather than percentages
    { text: "1 to 2%", value: palette[0] },
    { text: "3 to 5%", value: palette[1] },
    { text: "5 to 9%", value: palette[2] },
    { text: "10 to 14%", value: palette[3] },
    { text: "15 to 24%", value: palette[4] },
    { text: "25 to 34%", value: palette[5] },
    { text: "35 to 44%", value: palette[6] },
    { text: "45 to 59%", value: palette[7] },
    { text: "60 to 79%", value: palette[8] },
    { text: "89 to 100%", value: palette[9] },
  ];

  return (
    <div>
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
            opacity="0.8"
            color={circle.color}
          >
            <Popup>{circle.result}</Popup>
          </Circle>
        ))}
      </MapContainer>
      <div className="container">
        {scale.map((val) => (
          <div style={{ backgroundColor: val.value }}>
            <p>{val.text}</p>
          </div>
        ))}
      </div>
      <p>
        <input
          type="range"
          min={0}
          max={palette.length - 1}
          value={sliderPosition}
          onChange={handleSliderChange}
        />
        <p>{palette[sliderPosition]}</p>
      </p>
    </div>
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
