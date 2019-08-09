import {
  maxSensorsNumber,
  minSensorsNumber,
} from '../environments/environment';

export const getRandomArbitrary = (min, max) =>
  Math.random() * (max - min) + min;

export const getRandomDate = (start, end) =>
  // in unix format
  (start.getTime() + Math.random() * (end.getTime() - start.getTime())).toFixed(
    0,
  );

export const getRandomData = () => {
  let dataArr = [];

  for (let i = 0; i < 50; i++) {
    const randomDate = getRandomDate(new Date(2010, 1, 1), new Date());
    const randomValue = getRandomArbitrary(0, 200).toFixed(1);

    dataArr.push([Number(randomDate), Number(randomValue)]);
  }

  return dataArr.sort((a, b) => a[0] - b[0]);
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
