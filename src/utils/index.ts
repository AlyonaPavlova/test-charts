import {
  maxSensorsNumber,
  minSensorsNumber,
} from '../environments/environment';

export const getRandomArbitrary = (min, max) =>
  Math.random() * (max - min) + min;

export const getRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getRandomData = () => {
  const randomNumber = getRandomArbitrary(1, 100);

  let data = [];

  for (let i = 0; i < randomNumber; i++) {
    const randomDate = getRandomDate(new Date(2010, 1, 1), new Date());
    const randomValue = getRandomArbitrary(0, 200);

    data.push([randomDate, randomValue]);
  }

  return data;
};

export const getSensorsNumber = () => {
  return getRandomArbitrary(minSensorsNumber, maxSensorsNumber);
};

export const setSensorsData = (dataArr, sensorsNumber) => {
  for (let i = 0; i < sensorsNumber; i++) {
    dataArr.push({
      name: `Sensor №${i + 1}`,
      data: getRandomData(),
    });
  }
};
