import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

import calculateBoundingBoxes from '../helpers/calculateBoundingBoxes';
import usePrevious from '../hooks/usePrevious';


type Props = {
  children: any;
}

const Wrapper = styled.div`
  grid-column: 5 / 11;
  padding: 2rem;
`;

const AnimatedList = ({ children }: Props): React.ReactElement => {
  const [boundingBox, setBoundingBox] = useState<{ [key: string]: DOMRect }>({});
  const [prevBoundingBox, setPrevBoundingBox] = useState<{ [key: string]: DOMRect }>({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);

    setBoundingBox(newBoundingBox);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInY = firstBox.top - lastBox.top;

        if (changeInY) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateY(${ changeInY }px)`;
            domNode.style.transition = 'transform 0s';

            requestAnimationFrame(() => {
              domNode.style.transform = '';
              domNode.style.transition = 'transform 500ms';
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);
  
  return <Wrapper>{ children }</Wrapper>;
};

export default AnimatedList;
