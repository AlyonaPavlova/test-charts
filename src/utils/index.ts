import {
  maxSensorsNumber,
  minSensorsNumber,
} from '../environments/environment';

export const getRandomArbitrary = (min, max) =>
  Math.random() * (max - min) + min;

export const getRandomDate = (start, end) =>
  // in unix format
  (
    (start.getTime() + Math.random() * (end.getTime() - start.getTime())) /
    1000
  ).toFixed(0);

export const getRandomData = () => {
  const randomNumber = getRandomArbitrary(1, 100);

  let dataArr = [];

  for (let i = 0; i < randomNumber; i++) {
    const randomDate = getRandomDate(new Date(2010, 1, 1), new Date());
    const randomValue = getRandomArbitrary(0, 200).toFixed(1);

    dataArr.push([randomDate, randomValue]);
  }

  return dataArr;
};

export const getSensorsNumber = () => {
  return getRandomArbitrary(minSensorsNumber, maxSensorsNumber);
};

export const getSensorsData = () => {
  const sensorsNumber = getSensorsNumber();

  let dataArr = [];

  for (let i = 0; i < sensorsNumber; i++) {
    dataArr.push({
      name: `Sensor №${i + 1}`,
      data: getRandomData(),
    });
  }

  return dataArr;
};
