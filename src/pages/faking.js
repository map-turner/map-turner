import * as React from "react";
import { fakerEN } from "@faker-js/faker";

let fakeTable = [
  {
    startDate: "start_date",
    endDate: "end_date",
    countSum: "Count_sum",
    postcode: "postcode",
    latitude: "latitude",
    longitude: "longitude",
  },
];

const startDate = process.env.GATSBY_RANGE_START_DATE;
const endDate = process.env.GATSBY_RANGE_END_DATE;
const incrementInDays = Number(process.env.GATSBY_STEP_SIZE_IN_DAYS);
const millisecondsInADay = 86400000;

const startDateInMilliseconds = new Date(startDate).valueOf();
const endDateInMilliseconds = new Date(endDate).valueOf();

const centreCoordinates = [
  Number(process.env.GATSBY_LIBRARY_LATITUDE),
  Number(process.env.GATSBY_LIBRARY_LONGITUDE),
];

const dateToString = (date) => {
  let dateObj = new Date(date);
  return (
    "" +
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getDate()
  );
};

const addOneDay = (date) => {
  return addDays(date, 1);
};

const addDays = (date, days) => {
  let dateInMilliseconds = new Date(date).valueOf();
  return dateInMilliseconds + millisecondsInADay * days;
};

let rangeStartDate = startDateInMilliseconds;
let rangeEndDate = addDays(rangeStartDate, incrementInDays);

for (let index = 0; index < 5000; index++) {
  const coordinates = fakerEN.location.nearbyGPSCoordinate({
    origin: centreCoordinates,
    isMetric: true,
    radius: 4,
  });

  const randomText =
    fakerEN.number.int({ min: 1 }) +
    " " +
    fakerEN.color.human() +
    " " +
    fakerEN.animal.dog();

  if (randomText.length % 2 === 0) {
    fakeTable.push({
      startDate: dateToString(rangeStartDate),
      endDate: dateToString(rangeEndDate),
      countSum: fakerEN.number.int({ min: 1, max: 48 }),
      postcode: randomText,
      latitude: coordinates[0],
      longitude: coordinates[1],
    });

    rangeStartDate = addOneDay(rangeEndDate);
    rangeEndDate = addDays(rangeStartDate, incrementInDays);
  } else {
    rangeStartDate = addOneDay(rangeEndDate);
    rangeEndDate = addDays(rangeStartDate, incrementInDays);

    fakeTable.push({
      startDate: dateToString(rangeStartDate),
      endDate: dateToString(rangeEndDate),
      countSum: fakerEN.number.int({ min: 1, max: 48 }),
      postcode: randomText,
      latitude: coordinates[0],
      longitude: coordinates[1],
    });
  }

  if (new Date(rangeStartDate).valueOf() > endDateInMilliseconds) {
    rangeStartDate = startDate;
    rangeEndDate = addDays(rangeStartDate, incrementInDays);
  }
}

const FakingPage = () => {
  return (
    <main>
      <code>
        {fakeTable.map((row) => (
          <span key={row.postcode}>
            {row.startDate},{row.endDate},{row.countSum},{row.postcode},
            {row.latitude},{row.longitude}
            <br />
          </span>
        ))}
      </code>
    </main>
  );
};

export default FakingPage;

export const Head = () => <title>Faking Page</title>;
