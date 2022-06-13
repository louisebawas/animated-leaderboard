import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import AnimatedList from './components/AnimatedList';
import Streamer from './components/Streamer';
import utils from './data/utils';
import type { StreamerInfo } from './types/data';


const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.5rem)) 1fr;
  grid-template-rows: max-content;
  gap: 15px 15px;
`;

const App = (): React.ReactElement => {
  const [current, setCurrent] = useState<StreamerInfo[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(utils.update()), 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <Grid>
        <AnimatedList>
          { current.map((streamer) => (
            <Streamer streamer={ streamer } key={ streamer.userID } ref={ createRef<HTMLDivElement>() } />
          )) }
        </AnimatedList>
      </Grid>
    </div>
  );
}

export default App;
