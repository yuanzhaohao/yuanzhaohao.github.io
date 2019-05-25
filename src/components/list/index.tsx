import * as React from 'react';
import data from '../../data.json';
import { Link } from 'react-router-dom';
import { formatTime } from '../../lib/utils';
import './style.scss';

class List extends React.Component {
  public render() {
    console.log();
    return (
      <div className="list">
        {data.map(itemData => (
          <div className="list-item" key={itemData.name}>
            <div className="list-item-title">
              <Link to={`/detail/${itemData.name}`}>{itemData.title}</Link>
            </div>
            <div className="list-item-date">
              <p>日期：{formatTime(itemData.date, 'MM 月 dd 日 × yyyy 年')}</p>
            </div>
            <p
              className="list-item-desc"
              dangerouslySetInnerHTML={{
                __html: itemData.description,
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default List;
