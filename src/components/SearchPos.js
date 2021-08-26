import React, {useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import Header from 'components/Header';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'css/KeyPos.css';
import GMap from './GMap';


function SearchPos({btBoxOnClick, history, itemlist, kmVal='내 주변 캠핑장 검색', latLon, dropOnClick}){
  const btBox = useRef(null);
  const dropdown = useRef(null);
  const dropdownMenu = useRef(null);
  const dropdownI = useRef(null);
  useEffect(() => {
    const h_bt_sl = btBox.current.children[0].getBoundingClientRect().height;
    const h_bt_box = btBox.current.getBoundingClientRect().height;
    btBox.current.style.bottom = -(h_bt_box - h_bt_sl)+'px';
  }, []);
  return (
    <>
    <Header history={history} />

    <div className="map_img" id="map">
      <GMap latLon={latLon} itemlist={itemlist}></GMap>
      <img src="./img/gocamp_map.jpg" alt="" />
    </div>

    <div className="contents_bar search_position">
      <div className="center">
        <div className="drop_bar">
          <div className="dropdown" ref={dropdown} onClick={dropOnClick.bind(this, dropdown, dropdownI, dropdownMenu)}>
            <div className="select">
              <span id="query_val">{kmVal}</span>
              <i className="fa fa-chevron-down" ref={dropdownI}></i>
            </div>
            <ul className="dropdown_menu" ref={dropdownMenu}>
              <li><Link to='/search?radi=10000'>반경 10KM 검색</Link></li>
              <li><Link to='/search?radi=20000'>반경 20KM 검색</Link></li>
              <li><Link to='/search?radi=30000'>반경 30KM 검색</Link></li>
              <li><Link to='/search?radi=40000'>반경 40KM 검색</Link></li>
              <li><Link to='/search?radi=50000'>반경 50KM 검색</Link></li>
            </ul>
          </div>    
        </div>
      </div>
    </div>

    <div className="bt_box" ref={btBox}>
      <span onClick={btBoxOnClick.bind(this, btBox)}>
        <i className="fa fa-chevron-up"></i>
      </span>
      <div className="bt_sl carousel_section">
        <div className="carousel_container">
          {/* <div className="owl-carousel owl-theme" id="contents_box">
          </div> */}
          <Slider dots={false} infinite={false} speed={400} slidesToShow={1} arrows={false} className='owl-carousel owl-theme' id='contents_box' style={{margin: '5px'}}>
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

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCKmt1KV983KgZJ20RTT-97mCTgOpmgJRs"
// })(SearchPos);
export default SearchPos;