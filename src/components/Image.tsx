import React from 'react';
import styled from 'styled-components';


type Props = {
  size: 'sm' | 'md' | 'lg',
  src: string;
  alt: string;
}

type StyleProps = {
  size: string;
}

const Wrapper = styled.div`
  grid-area: image;
  min-height: 40px;
  min-width: 40px;
  border-radius: 50%;
  overflow: hidden;
  place-self: center;
  height: ${ (props: StyleProps) => props.size };
  width: ${ (props: StyleProps) => props.size };

  img {
    height: ${ (props: StyleProps) => props.size };
  }
`;

const Image = ({ size, src, alt }: Props): React.ReactElement => {
  const sizes = {
    sm: '40px',
    md: '90px',
    lg: '150px',
  }

  return (
    <Wrapper size={ sizes[size]}>
      <img src={ src } alt={ alt } />
    </Wrapper>
  );
}

export default Image;
