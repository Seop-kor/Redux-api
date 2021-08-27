import React from 'react';
import { useSelector } from 'react-redux';

import SearchPos from 'components/SearchPos';

import {slideDown, slideUp} from 'functions/Slide';

const btBoxOnClick = (btBox) => {
  const btBoxSpan = btBox.current.children[0];
  const btBoxI = btBoxSpan.children[0];
  const h_bt_sl = btBoxSpan.getBoundingClientRect().height;
  const h_bt_box = btBox.current.getBoundingClientRect().height;
  btBoxSpan.classList.toggle('on');
  if(btBoxSpan.classList.contains('on')){
    btBoxI.className = 'fa fa-chevron-down';
    btBox.current.animate([{
      bottom: 0
    }], {duration: 300, fill: 'forwards'});
  }else{
    btBoxI.className = 'fa fa-chevron-up';
    btBox.current.animate([{
      bottom: -(h_bt_box - h_bt_sl)+'px'
    }], {duration: 300, fill: 'forwards'});
  }
};

const dropOnClick = (dropdown, dropdownI, dropdownMenu) => {
  dropdown.current.classList.toggle('on');
  if(dropdown.current.classList.contains('on')){
    slideDown(dropdownMenu.current, 300);
    dropdownI.current.className = 'fa fa-chevron-up';
  }else{
    slideUp(dropdownMenu.current, 300);
    dropdownI.current.className = 'fa fa-chevron-down';
  }
};

function SearchPosContainer({history, latLon}){
  const {location, kmVal} = useSelector(state => ({
    location: state.location.location,
    kmVal: state.location.kmVal
  }));
  console.log('Search에서의 현재 값 : ',location);
  const kmmessage = kmVal+'KM 반경 캠핑장';
  return (
    <SearchPos btBoxOnClick={btBoxOnClick} history={history} itemlist={location} kmVal={kmmessage} latLon={latLon} dropOnClick={dropOnClick} />
  );
}

export default React.memo(SearchPosContainer);