import React from 'react';
import Index from 'components/Index';
import {slideDown, slideUp} from 'functions/Slide';

const keyBtnOnClick = (keyInput, history) => {
  const key_val =  keyInput.current.value;
  history.push('/key?key_val='+key_val);
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
}

function IndexContainer({history}){
  return (
    <Index keyBtnOnClick={keyBtnOnClick} dropOnClick={dropOnClick} history={history} />
  );
}

export default React.memo(IndexContainer);