import { httpClient } from './httpClient';

const END_POINT = '/tours';

const getAllTours = () => httpClient.get(END_POINT);
const getOneTour = (tourID) => httpClient.get(END_POINT + '/' + tourID);

export { getAllTours, getOneTour };
