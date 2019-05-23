import * as React from 'react';
import './sidebar.scss';

class Sidebar extends React.Component {
  public render() {
    return (
      <div className="app-sidebar sidebar">
        <div className="sidebar-title">Yzh's Blog</div>
        <div className="sidebar-user">
          <div className="sidebar-logo" />
        </div>
      </div>
    );
  }
}

export default Sidebar;
