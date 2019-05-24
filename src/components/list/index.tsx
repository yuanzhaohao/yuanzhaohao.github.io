import * as React from 'react';
import data from '../../data.json';

class List extends React.Component {
  public render() {
    console.log(data);
    return <div className="list-container" />;
  }
}

export default List;
