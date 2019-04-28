import React from 'react';

const list = (props) => {
  console.log('Rendering the list...');
  return props.items.map((item) => (
    <li
      key={item.id}
      onClick={props.onClick.bind(this, item.id)}>
      {item.name}
    </li>
  ));
};

export default list;