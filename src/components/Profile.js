import React from 'react';
import '../style/Profile.css';
import getBaseUrl from '../utils/getBaseUrl.js';

import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { getData } from '../utils/api.js';
highchartsMore(Highcharts);

export default function Profile({ setPage, navigate }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData(`${getBaseUrl()}/profile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('access_token'),
      },
    })
      .then((res) => {
        const glucose = res.data.glucose_reading;
        const time = res.data.time;
        const dataTimeArray = [];
        for (let i = 0; i < time.length; i++) {
          dataTimeArray.push([time[i], glucose[i]]); // why does data[0][0] come back undefined?
        }
        setData(dataTimeArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const options = {
    chart: {
      type: 'spline',
      scrollablePlotArea: {
        minWidth: 1000,
        scrollPositionX: 1,
      },
    },
    title: {
      text: 'Blood Glucose Level',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
      },
    },
    yAxis: {
      title: {
        text: 'BGL (mmol/mL)',
      },
    },

    series: [
      {
        name: 'Blood Glucose Level',
        data: data,
      },
      {
        name: 'Safe Range',
        data: [
          [parseInt(data[0]), 5, 7],
          [parseInt(data[data.length - 1]), 5, 7],
        ],
        type: 'arearange',
        lineWidth: 0,
        color: Highcharts.getOptions().colors[2],
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <>
      <h1>My Profile</h1>
      <figure class='highcharts-figure'>
        <div id='container'>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </figure>
    </>
  );
}
