import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';

import Header from 'components/Header';
import GMap from 'components/GMap';

import 'css/KeyPos.css';

function KeyPos({history, btBoxOnClick, itemlist, latLon, keybtnOnclick}){
  const btBox = useRef(null);
  const keyBtn = useRef(null);
  useEffect(() => {
    const h_bt_sl = btBox.current.children[0].getBoundingClientRect().height;
    const h_bt_box = btBox.current.getBoundingClientRect().height;
    btBox.current.style.bottom = -(h_bt_box - h_bt_sl)+'px';
  }, []);
  return (
    <>
    <Header history={history} />

    <div className="map_img" id="map">
      <GMap itemlist={itemlist} latLon={latLon} />
      <img src="./img/gocamp_map.jpg" alt="" />
    </div>

    <div className="contents_bar search_position">
      <div className="center">
        <div className="search_bar">
          <input type="text" placeholder="검색할 키워드를 입력해 주세요." ref={keyBtn} />
          <button onClick={keybtnOnclick.bind(this, keyBtn, history)}><img src="./img/gocamp_icon.png" alt="" /></button>
        </div>
      </div>
    </div>

    <div className="bt_box" ref={btBox}>
      <span onClick={btBoxOnClick.bind(this, btBox)}><i className="fa fa-chevron-up"></i></span>
      <div className="bt_sl carousel_section">
        <div className="carousel_container">
          <Slider dots={false} infinite={false} speed={400} slidesToShow={1} arrows={false} className="owl-carousel owl-theme" id="contents_box" style={{margin: '5px'}}>
            {itemlist.map(i => {
              return (
                <div className="carousel_item" key={i.contentId}>
                  <div className="item_card">
                    <Link to={`/detail?lon=${i.mapX}&lat=${i.mapY}`}>
                      <div className="sl_img">
                        <img src={i.firstImageUrl || './img/no_image.png'} alt="" />
                      </div>
                    </Link>
                    <div className="sl_txt">
                      <h2>{i.facltNm}</h2>
                      <p>{i.addr1}</p>
                    </div>
                    <div className="sl_icons">
                      <img src="./img/ico_mart.png" alt="" />
                      <em>{i.sbrsCl}</em>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
    </>
  );
}

export default KeyPos;