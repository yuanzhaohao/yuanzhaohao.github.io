import * as React from 'react';
import * as classNames from 'classnames';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon } from 'dashkit-ui';
import { sidebarRoutes, sidebarContact } from '../../lib/utils';
import './sidebar.scss';

type Props = RouteComponentProps;

const Sidebar = (props: Props) => {
  const [isShowList, setIsShowList] = React.useState(false);
  const { pathname } = props.location;

  function handleToggle() {
    setIsShowList(!isShowList);
  }

  function handleOverlay() {
    setIsShowList(false);
  }

  return (
    <div className="app-sidebar sidebar">
      <div className="sidebar-title">
        <Link to="/" className="sidebar-logo" />
        <Link to="/">Steven's Blog</Link>
      </div>
      <div
        className={classNames('sidebar-list', {
          'sidebar-list-slide': isShowList,
        })}
      >
        {sidebarRoutes.map(route => (
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
        <div className="sidebar-heading">contact me</div>

        {sidebarContact.map(contact => (
          <a key={contact.title} className="sidebar-item" href={contact.link} target="_blank">
            <Icon type={contact.icon} className="sidebar-item-icon" />
            {contact.title}
          </a>
        ))}
      </div>

      <div className="sidebar-toggle" onClick={handleToggle}>
        <Icon
          type={isShowList ? 'x' : 'align-justify'}
          className={classNames('sidebar-toggle-icon', {
            'sidebar-toggle-active': isShowList,
          })}
        />
      </div>

      {isShowList ? <div className="sidebar-overlay" onClick={handleOverlay} /> : null}
    </div>
  );
};

export default withRouter(Sidebar);
