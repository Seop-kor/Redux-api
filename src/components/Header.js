import React, {useRef} from 'react';
import { Link } from 'react-router-dom';

import {slideUp, slideDown} from 'functions/Slide';

import 'css/Header.css';

// Onclick Function
const onClick = (history, e) => {
  e.preventDefault();
  if(document.referrer){
    window.open(document.referrer, '_self');
  }else{
    history.goBack();
    // history.goBack();
  }
};

const btnOnClick = (btn, menu) => {
  btn.current.classList.toggle('active');
  btn.current.classList.toggle('not-active');
  if(btn.current.classList.contains('active')){
    slideDown(menu.current);
  }else{
    slideUp(menu.current);
  }
}

const style = {
  position: 'sticky',
  top: '0',
  left: '0'
};

function Header({history}){
  const btn = useRef(null);
  const menu = useRef(null);
  return (
    <header id='header' style={style}>
      <div className='center'>
        <Link to="#" className="logo" onClick={onClick.bind(this, history)}>
          <i className='fa fa-chevron-left'></i>
        </Link>
        <div className='btn not-active' ref={btn} onClick={btnOnClick.bind(this, btn, menu)}>
          <span className='bar_line'></span>
          <span className='bar_line'></span>
          <span className='bar_line'></span>
        </div>
      </div>
      <div className='menu' ref={menu}>
        <Link to='/'><i className='fa fa-home'></i></Link>
        <Link to='/search?radi=10000'><i className='fa fa-map-marker'></i></Link>
        <Link to='#'><i className='fa fa-question'></i></Link>
      </div>
    </header>
  );
}

export default Header;