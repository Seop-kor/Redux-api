import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import 'css/Index.css';

function Index({keyBtnOnClick, dropOnClick, history}){
  const keyInput = useRef(null);
  const dropdown = useRef(null);
  const dropdownMenu = useRef(null);
  const dropdownI = useRef(null);
  return (
    <>
    {/* Main Background Image */}
    <img src='./img/gocamp_bg.png' alt='' className='bg' />
    {/* Header */}
    <Header history={history} />
    {/* Search and Select Bar */}
    <div className='contents_bar'>
      <div className='center'>
        <div className="search_bar">
          <input type="text" placeholder="검색할 키워드를 입력해 주세요." ref={keyInput} />
          <button onClick={keyBtnOnClick.bind(this, keyInput, history)}><img src="./img/gocamp_icon.png" alt="" /></button>
        </div>
        <div className="drop_bar">
          <div className="dropdown" ref={dropdown} onClick={dropOnClick.bind(this, dropdown, dropdownI, dropdownMenu)}>
            <div className="select">
              <span>내 주변 캠핑장 검색</span>
              <i className="fa fa-chevron-down" ref={dropdownI}></i>
            </div>
            <ul className="dropdown_menu" ref={dropdownMenu}>
              <li>
                <Link to='/search?radi=10000'>반경 10KM 검색</Link>
              </li>
              <li>
                <Link to='/search?radi=20000'>반경 20KM 검색</Link>
              </li>
              <li>
                <Link to='/search?radi=30000'>반경 30KM 검색</Link>
              </li>
              <li>
                <Link to='/search?radi=40000'>반경 40KM 검색</Link>
              </li>
              <li>
                <Link to='/search?radi=50000'>반경 50KM 검색</Link>
              </li>
            </ul>
          </div>    
        </div>
      </div>
    </div>
    </>
  );
}

export default Index;