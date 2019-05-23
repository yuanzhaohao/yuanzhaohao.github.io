import * as React from 'react';
import './sidebar.scss';

class Sidebar extends React.Component {
  public render() {
    return (
      <div className="app-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-title">Yzh's Blog</div>
          <div className="sidebar-header-logo" />
        </div>
      </div>
    );
  }
}

export default Sidebar;
