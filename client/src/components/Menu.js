import React from 'react';
import { Link } from 'react-router-dom';
import MenuStyles from '../stylesheets/components/MenuStyles.module.css';

const Menu = () => {
  return (
    <ul className={MenuStyles.Menu}>
      <li className={MenuStyles.MenuItem}>
        <Link to='/granth'>Granth</Link>
      </li>
      <li className={MenuStyles.MenuItem}>
        <Link to='/chapters'>Chapters</Link>
      </li>
      <li className={MenuStyles.MenuItem}>
        <Link to='/chhand-types'>Chhands Types</Link>
      </li>
      <li className={MenuStyles.MenuItem}>
        <Link to='/chhands'>Chhands</Link>
      </li>
    </ul>
  );
};

export default Menu;
