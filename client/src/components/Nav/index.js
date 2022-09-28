import React from 'react';

function Nav(props) {
  const { tabs = [], setCurrentTab, currentTab } = props;
  return (
    <nav>
      <ul>
        {tabs.map((Tabs) => (
          <li
            className={`${currentTab.name === Tabs.name && 'highlight'}`}
            key={Tabs.name}
          >
            <span onClick={() => setCurrentTab(Tabs)}>{Tabs.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
