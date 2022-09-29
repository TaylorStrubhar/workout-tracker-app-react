import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Profile', description: 'each persons profile' },
  { name: 'Routines', description: 'a routine that people can customize' },
  { name: 'Exercises', description: 'people create their own exercise' },
];

function Nav() {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  useEffect(() => {
    document.title = currentTab.name;
  });
  return (
    <nav>
      <ul>
        {tabs.map(Tab => (
          <li className={`${currentTab.name === Tab.name ? 'highlight' : ''}`} key={Tab.name}>
            <span onClick={() => setCurrentTab(Tab)}>
              <Link to={`/${Tab.name}`}>{Tab.name}</Link>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
