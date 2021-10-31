import getBaseUrl from './getBaseUrl';

function addData(token, glucose_reading) {
  let d = new Date();
  let time = d.getTime();
  let data = { glucose_reading, time };
  console.log(data);
  fetch(`${getBaseUrl()}/store-data`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  }).then(window.localStorage.setItem('data_added', 'hi'));
}

export default addData;
