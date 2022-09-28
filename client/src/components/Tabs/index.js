import React from 'react';
import TabContent from '../TabContent';
import Exercise from '../Exercise';
import Profile from '../Profile';
import Routine from '../Routine';

function Tabs({ currentTab }) {
  const tabRender = () => {
    switch (currentTab.name) {
      case 'Profile':
        return <Profile />;
      case 'Routine':
        return <Routine />;
      case 'Exercise':
        return <Exercise />;
      default:
        return <Profile />;
    }
  };

  return (
    <div>
      <TabContent>{tabRender()}</TabContent>
    </div>
  );
}

export default Tabs;
