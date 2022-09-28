import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Profile', description: 'each persons profile' },
  { name: 'Routine', description: 'a routine that people can customize' },
  { name: 'Exercise', description: 'people create their own exercise' },
];

function Nav() {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  useEffect(() => {
    document.title = currentTab.name;
    console.log(currentTab);
  });
  return (
    <nav>
      <ul>
        {tabs.map(Tab => (
          <li className={`${currentTab.name === Tab.name ? 'highlight' : ''}`} key={Tab.name}>
            <Link to={`/${Tab.name}`}></Link>
            <span onClick={() => setCurrentTab(Tab)}>{Tab.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
