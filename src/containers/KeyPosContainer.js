import React from 'react';
import KeyPos from 'components/KeyPos';
import { useSelector } from 'react-redux';

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

function KeyPosContainer({history}){
  const {location} = useSelector(state => ({
    location: state.location.location
  }));
  console.log(location);
  return (
    <KeyPos history={history} btBoxOnClick={btBoxOnClick} itemlist={location} />
  );
}

export default React.memo(KeyPosContainer);