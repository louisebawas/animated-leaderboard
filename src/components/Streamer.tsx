import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AnimatedScore from './AnimatedScore';
import Image from '../components/Image';
import usePrevious from '../hooks/usePrevious';
import type { StreamerInfo } from '../data';


type Props = {
  streamer: StreamerInfo;
}

type StyledTriangle = {
  direction: 'up' | 'down' | null;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "rank image name score";
  grid-gap: 15px;
  background-color: rgba(204, 204, 204, 0.2);;
  border-radius: 50px;
  margin-bottom: 15px;
`;

const Rank = styled.div`
  position: relative;
  place-content: center;
  grid-area: rank;
  width: 50px;
  display: grid;
  padding: 0 1rem;

  h4 {
    color: rgba(63, 11, 99, 0.5);
    margin: 0;
  }
`;

const DisplayName = styled.div`
  grid-area: name;
  justify-self: start;
  align-self: center;
  color: rgb(63, 11, 99);
`;

const Score = styled(AnimatedScore)`
  grid-area: score;
  align-self: center;
  text-align: left;
`;

const Triangle = styled.span`
  position: absolute;
  ${ (props: StyledTriangle) => props.direction === 'up' ? 'top: 12px;': 'bottom: 12px;' }
  justify-self: center;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-${ (props: StyledTriangle) => props.direction === 'up' ? 'bottom' : 'top' }:
    5px solid ${ (props: StyledTriangle) => props.direction === 'up' ? 'rgb(28, 216, 230)' : 'rgb(199, 12, 168)' };
`;

const Streamer = React.forwardRef<HTMLDivElement, Props>(({ streamer }, ref) => {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const prevState = usePrevious(streamer);

  useEffect(() => {
    if (prevState?.rank < streamer.rank) {
      return setDirection('down');
    }

    if (prevState?.rank > streamer.rank) {
      return setDirection('up');
    }
  }, [prevState?.rank, streamer.rank]);

  return (
    <Wrapper ref={ ref }>
      <Rank>
        <h4>{ streamer.rank }</h4>
        { direction !== null && <Triangle direction={ direction } /> }
      </Rank>
      <Image
        alt={ streamer.displayName }
        size="sm"
        src={ streamer.picture }
      />
      <DisplayName>
        <h4>{ streamer.displayName }</h4>
      </DisplayName>
      <Score score={ streamer.score } />
    </Wrapper>
  );
});

export default Streamer;