import React from 'react';
import Header from 'components/Header';

import 'css/DetailPos.css';

function DetailPos({history, detailBg, detailCon}){
  return (
    <>
    <Header history={history} />
    <div className='details'>
      <div className='detail_bg'>
        {detailBg}
      </div>
      <div className='detail_contents'>
        {detailCon}
      </div>
    </div>
    </>
  );
}

export default DetailPos;