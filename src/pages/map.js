import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { graphql } from "gatsby";
import "./map.css";

const toolLibrary = [53.3939431, -2.9486509];

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
].reverse();

// TODO: take number of people per postcode into account
// TODO: add layers for income/education/density...?

const getColor = (magicNumber) => {
  let matchingRange = scales.find(
    (rangeObject) => rangeObject.value >= magicNumber
  );
  return matchingRange.color;
};

let uniqueStartDatesSet = new Set();
let uniqueEndDatesSet = new Set();
let scales;

const prepareCircle = (roughItem) => {
  uniqueStartDatesSet.add(roughItem.start_date);
  uniqueEndDatesSet.add(roughItem.end_date);

  return {
    position: [roughItem.latitude, roughItem.longitude],
    postcode: roughItem.postcode,
    startDate: roughItem.start_date,
    color: getColor(Number(roughItem.Count_sum)),
    sum: Number(roughItem.Count_sum),
    result:
      "Postcode: " + roughItem.postcode + " - Loans: " + roughItem.Count_sum,
  };
};

const setScale = (maxAmount) => {
  let currentTopValue = 1;
  let scales = [{ text: "1 loan", value: currentTopValue, color: palette[0] }];
  let base = 0;
  const justToString = " to ";
  const loans = " loans";

  let step = Math.floor(maxAmount / palette.length);
  let maxColorIndex = palette.length;

  if (palette.length > maxAmount) {
    maxColorIndex = maxAmount;
    step = 1;
  }
  //  0 1 - 2 3 - 4 5
  for (let index = 1; index < maxColorIndex; index++) {
    base = Number(currentTopValue) + 1;
    currentTopValue = base + step;
    if (currentTopValue > maxAmount || index === maxColorIndex - 1) {
      currentTopValue = maxAmount;
    }
    // if (base > currentTopValue) {
    //   base = currentTopValue;
    // }
    scales.push({
      text: base + justToString + currentTopValue + loans,
      value: currentTopValue,
      color: palette[index],
    });
    // scales.push({
    //   text:
    //     currentTopValue - base <= 1
    //       ? base + loans
    //       : base + justToString + currentTopValue + loans,
    //   value: currentTopValue,
    //   color: palette[index],
    // });
  }

  return scales;
};

const MapPage = ({ data }) => {
  let biggestSum = data.allPostcodesCsv.edges.reduce(
    (accumulator, currentItem) =>
      Number(currentItem.node.Count_sum) > accumulator
        ? Number(currentItem.node.Count_sum)
        : accumulator,
    0
  );

  scales = setScale(biggestSum);
  const circles = data.allPostcodesCsv.edges.map((item) => {
    return prepareCircle(item.node);
  });

  const uniqueStartDates = Array.from(uniqueStartDatesSet);
  const uniqueEndDates = Array.from(uniqueEndDatesSet);

  const [sliderPosition, setSliderPosition] = React.useState(0);

  const handleSliderChange = (event) => {
    setSliderPosition(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <MapContainer
        // style={{ height: "600px" }}
        style={{ height: "85vh" }}
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
        {circles
          .filter(
            (circle) => circle.startDate === uniqueStartDates[sliderPosition]
          )
          .map((circle) => (
            <Circle
              key={circle.postcode + circle.startDate}
              center={circle.position}
              radius="50"
              opacity="0.8"
              fillOpacity="0.5"
              color={circle.color}
            >
              <Popup>{circle.result}</Popup>
            </Circle>
          ))}
      </MapContainer>

      <div className="info">
        <div className="scale">
          {scales.map((val) => (
            <div style={{ backgroundColor: val.color }} key={val.value}>
              <p>{val.text}</p>
            </div>
          ))}
        </div>
        <div className="slider">
          <input
            type="range"
            min={0}
            max={uniqueStartDates.length - 1}
            value={sliderPosition}
            onChange={handleSliderChange}
          />
          <p>
            {uniqueStartDates[sliderPosition] +
              " to " +
              uniqueEndDates[sliderPosition]}
          </p>
        </div>
      </div>
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
          start_date
          end_date
        }
      }
    }
  }
`;
export default MapPage;
