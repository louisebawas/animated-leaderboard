/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import usePrevious from '../hooks/usePrevious'; 


type Props = {
  score: number;
}
 
const StyledScore = styled.div`
  position: relative;
  color: rgb(199, 12, 168);
  width: 90px;
`;

const AnimatedScore = ({ score }: Props): React.ReactElement => {
  const initial = usePrevious(score);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = (score).toString();
    }

    if (score !== initial) {
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.innerHTML = initial?.toString();
          ref.current.style.transform = 'translateY(20px)';
          ref.current.style.transition = 'transform 0s';
        }

        requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.innerHTML = score.toString();
            ref.current.style.transform = '';
            ref.current.style.transition = 'transform 500ms';
          }
        });
      });
    }
  }, [initial, score]);

  return (
    <StyledScore>
      <h5 className="diff" ref={ ref }></h5>
    </StyledScore>
  );
};

export default AnimatedScore;