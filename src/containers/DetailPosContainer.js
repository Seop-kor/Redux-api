import React from 'react';
import { useSelector } from 'react-redux';

import DetailPos from 'components/DetailPos';
import GMap from 'components/GMap';

function DetailPosContainer({history, mapX, mapY}){
  const {location} = useSelector(state => ({
    location: state.location.location
  }));
  const filterLocation = location.filter(i => i.mapX === mapX && i.mapY === mapY);
  console.log('디테일에서의 필터 값 : ',filterLocation);
  let latLon = {lat: 37.082, lon: 127.0883};
  if(filterLocation.length > 0 && filterLocation !== undefined){
    latLon = {lat: filterLocation[0].mapY, lon: filterLocation[0].mapX};
  }
  const detailBg = <><img src={filterLocation[0].firstImageUrl || './img/no_image.png'} alt="" /><span className="radi_bar"></span></>;
  const detailCon = (
    <div className="detail_wrap">
      <h2 className="detail_tit">{filterLocation[0].addr2}</h2>
      <span className="line"></span>
      <div className="detail_info">
        <p>
          <span className="info_ico"><i className="fa fa-map-marker"></i></span>
          <span className="info_txt">{filterLocation[0].addr1}</span>
        </p>
        <p>
          <span className="info_ico"><i className="fa fa-dog"></i></span>
          <span className="info_txt">{filterLocation[0].animalCmgCl}</span>
        </p>
        <p>
          <span className="info_ico"><i className="fa fa-cutlery"></i></span>
          <span className="info_txt">{filterLocation[0].sbrsCl}</span>
        </p>
        <p>
          <span className="info_ico"><i className="fa fa-clock"></i></span>
          <span className="info_txt">{filterLocation[0].operDeCl}, {filterLocation[0].operPdCl}</span>
        </p>
      </div>
      <span className="line"></span>
      <h2 className="detail_tit">캠핑장 소개</h2>
      <span className="line"></span>
      <div className="info_desc">
        {filterLocation[0].intro}
      </div>
      <span className="line"></span>
      <h2 className="detail_tit">위치 지도</h2>
      <div className="detail_map" id="map">
        <GMap itemlist={filterLocation} latLon={latLon} />
      </div>
    </div>
  )
  return (
    <DetailPos history={history} itemlist={filterLocation} latLon={latLon} />
  );
}

export default React.memo(DetailPosContainer);