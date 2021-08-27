import React,{useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setLoc, setKmVal } from 'moduls/locationModule';

import IndexContainer from 'containers/IndexContainer';
import SearchPosContainer from 'containers/SearchPosContainer';
import DetailPosContainer from 'containers/DetailPosContainer';
import KeyPosContainer from 'containers/KeyPosContainer';

const get_query = () => { 
  let url = document.location.href; 
  let qs = url.substring(url.indexOf('?') + 1).split('&'); 
  for (var i = 0, result = {}; i < qs.length; i++) { 
    qs[i] = qs[i].split('='); 
    result[qs[i][0]] = decodeURIComponent(qs[i][1]); 
  } 
  return result; 
};

function App() {
  const dispatch = useDispatch();

  const [latLon, setLatLon] = useState({lat: 0, lon: 0});

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' render={({history}) => {
        return <IndexContainer history={history} />
      }} />
      <Route exact path='/key' render={({history}) => {
        const query = get_query().key_val;
        let url = 'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/searchList'; /*URL*/
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'O5H9WBO3F1DUTXz9vUClI7YPQRpXaVEHjcuEeQnzxRUUebb%2FRbhtw54QV2t5FzNG%2Bkjio6Zsqea8HJRyeeqvTg%3D%3D'; /*Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
        queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
        queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
        queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(query); /**/
        axios.get(url+queryParams).then(res => {
          console.log('Key에서의 aPi호출임');
          dispatch(setLoc(res.data.response.body.items.item));
        }).catch(err => {
          alert(err);
        });
        return <KeyPosContainer history={history} />;
      }} />
      <Route exact path='/search' render={({history}) => {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const radi = get_query().radi;
          const kmVal = radi ? radi.slice(0,2) : '';
          setLatLon({lat:lat, lon:lon});
          let url = 'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/locationBasedList'; /*URL*/
          let queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'O5H9WBO3F1DUTXz9vUClI7YPQRpXaVEHjcuEeQnzxRUUebb%2FRbhtw54QV2t5FzNG%2Bkjio6Zsqea8HJRyeeqvTg%3D%3D'; /*Service Key*/
          queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
          queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
          queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
          queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
          queryParams += '&' + encodeURIComponent('mapX') + '=' + encodeURIComponent(lon); /**/
          queryParams += '&' + encodeURIComponent('mapY') + '=' + encodeURIComponent(lat); /**/
          queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent(radi); /**/
          axios.get(url+queryParams).then(res => {
            console.log('App에서의 값 호출임');
            dispatch(setLoc(res.data.response.body.items.item));
            dispatch(setKmVal(kmVal));
          });
        });
        return <SearchPosContainer history={history} latLon={latLon} />
        // useMemo 이용해서 리렌더링 방지하기
      }} />
      <Route exact path='/detail' render={({history}) =>{
        const query = get_query();
        const mapy = Number(query.lat);
        const mapx = Number(query.lon);
        document.querySelector('#root').style.overflowY = 'auto';
        return <DetailPosContainer history={history} mapX={mapx} mapY={mapy} />
      }} />
      </Switch>
    </BrowserRouter>
  );
}

export default React.memo(App);
