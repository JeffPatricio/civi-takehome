import React from 'react';
import Arrow from '../../assets/svg/arrow-left.svg';
import { goBack } from '../../navigators/navigationRef';
import { Container, PressableIcon, Title } from './styles';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header = ({ title, showBackButton }: HeaderProps) => {
  return (
    <Container>
      {!!showBackButton && (
        <PressableIcon hitSlop={30} onPress={goBack}>
          <Arrow height={25} width={25} color="black" />
        </PressableIcon>
      )}
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
