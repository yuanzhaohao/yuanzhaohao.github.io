import * as React from 'react';
import * as classNames from 'classnames';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon } from 'dashkit-ui';
import { sideBarRoutes, sideBarContact } from '../../lib/utils';
import './sidebar.scss';

const Sidebar = (props: RouteComponentProps) => {
  const { pathname } = props.location;
  return (
    <div className="app-sidebar sidebar">
      <div className="sidebar-title">
        <div className="sidebar-logo" />
        <p>Steven's Blog</p>
      </div>
      {sideBarRoutes.map(route => (
        <Link
          to="/"
          key={route.pathname}
          className={classNames('sidebar-item', {
            'sidebar-item-active': pathname === route.pathname,
          })}
        >
          <Icon type={route.icon} className="sidebar-item-icon" />
          {route.title}
        </Link>
      ))}

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">my contact</div>

      {sideBarContact.map(contact => (
        <a key={contact.title} className="sidebar-item" href={contact.link} target="_blank">
          <Icon type={contact.icon} className="sidebar-item-icon" />
          {contact.title}
        </a>
      ))}
    </div>
  );
};

export default withRouter(Sidebar);
