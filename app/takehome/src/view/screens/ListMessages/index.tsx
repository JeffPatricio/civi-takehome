import React from 'react';
import Header from '../../components/Header';
import List from './List';
import { Container, SafeArea } from './styles';

const ListMessages: React.FC = () => {
  return (
    <Container>
      <SafeArea>
        <Header title="Mensagens" />
        <List />
      </SafeArea>
    </Container>
  );
};

export default ListMessages;
