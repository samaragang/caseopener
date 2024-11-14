import React from 'react'
import './CaseItem.css'
function caseItem({ itemInfo }) {
  const colors = {
    blue: 'rgb(81, 106, 242)',
    purple: 'rgb(127, 80, 246)',
    pink: 'rgb(193, 66, 222)',
    red: 'rgb(216, 87, 82)',
    gold: 'rgb(255 237 0)'
  };
  const originalString = itemInfo.name;
  const formattedString = originalString
  .split(' | ')  // Split the string at ' | '
  .map((part, index) => {
    if (index === 0) {
      // Make the first part bold
      return `<b>${part}</b>`;
    }
    return part;
  })
  .join(' <br> ');


  return (
    <div className='case-item' style={{ borderBottom: `solid 2px ${colors[itemInfo.type]}`  }}>
      <div className='case-item__img'>
        <img src={`./kilowatt-case/${itemInfo.name.replace(/ \| /g, ' ')}.png`} alt="prize" />
      </div>
      <div className='case-item__name' dangerouslySetInnerHTML={{ __html: formattedString }}></div>
    </div>
  )
}

export default caseItem