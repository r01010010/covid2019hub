// import ACTNS from '../action_types';
// import addresses from '../../lib/addresses';
//
// function requestGeocode() {
//   return {
//     type: ACTNS.GEOCODE_REQUEST,
//     isFetching: true,
//     err: null
//
//   };
// }
//
// function receiveGeocode(err, geocode, target, address) {
//   return {
//     type: ACTNS.GEOCODE_RECEIVE,
//     err,
//     isFetching: false,
//     geocode,
//     target,
//     address
//   };
// }
//
// const checkGeocode = function (address, target, dispatch) {
//   dispatch(requestGeocode());
//   return addresses.getGeocode(address, (err, geocode) => {
//     dispatch(receiveGeocode(err, geocode, target, address));
//   });
// };
//
// export default {
//   checkGeocode
// };
