import React from 'react';
import Header from 'components/Header';
import GMap from 'components/GMap';

import 'css/DetailPos.css';

function DetailPos({history, itemlist, latLon}){
  return (
    <>
    <Header history={history} />
    <div className='details'>
      <div className='detail_bg'>
        <img src={itemlist[0].firstImageUrl || './img/no_image.png'} alt="" />
        <span className="radi_bar"></span>
      </div>
      <div className='detail_contents'>
        <div className="detail_wrap" key={itemlist[0].contentId}>
          <h2 className="detail_tit">{itemlist[0].addr2}</h2>
          <span className="line"></span>
          <div className="detail_info">
            <p>
              <span className="info_ico"><i className="fa fa-map-marker"></i></span>
              <span className="info_txt">{itemlist[0].addr1}</span>
            </p>
            <p>
              <span className="info_ico"><i className="fa fa-dog"></i></span>
              <span className="info_txt">{itemlist[0].animalCmgCl}</span>
            </p>
            <p>
              <span className="info_ico"><i className="fa fa-cutlery"></i></span>
              <span className="info_txt">{itemlist[0].sbrsCl}</span>
            </p>
            <p>
              <span className="info_ico"><i className="fa fa-clock"></i></span>
              <span className="info_txt">{itemlist[0].operDeCl}, {itemlist[0].operPdCl}</span>
            </p>
          </div>
          <span className="line"></span>
          <h2 className="detail_tit">캠핑장 소개</h2>
          <span className="line"></span>
          <div className="info_desc">
            {itemlist[0].intro}
          </div>
          <span className="line"></span>
          <h2 className="detail_tit">위치 지도</h2>
          <div className="detail_map" id="map">
            <GMap itemlist={itemlist} latLon={latLon} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default DetailPos;