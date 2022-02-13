import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { RemoteUpdateMessage } from '../../../data/usecases/remoteUpdateMessage';
import { Message } from '../../../domain/entities/Message';
import remoteHttpClient from '../../../infra/remoteHttpClient';
import { formatCompletedDate } from '../../../utils';
import Header from '../../components/Header';
import {
  Container,
  ContainerBody,
  Details,
  SafeArea,
  Subject,
  Date,
} from './styles';

type ParamList = {
  DetailsMessage: {
    item: Message;
  };
};

const remoteUpdateMessage = new RemoteUpdateMessage(remoteHttpClient);

const DetailsMessage: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'DetailsMessage'>>();
  const item = route.params.item;

  useEffect(() => {
    markMessageRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markMessageRead = useCallback(async () => {
    try {
      await remoteUpdateMessage.exec(item.id, { read: true });
    } catch (err: any) {
      Alert.alert('Erro', 'Ocorreu um erro ao marcar a mensagem como lida');
    }
  }, [item]);

  return (
    <Container>
      <SafeArea>
        <Header title="Detalhes" showBackButton />
        <ContainerBody>
          <Subject>{item.subject}</Subject>
          <Date>{formatCompletedDate(item.timestamp)}</Date>
          <Details>{item.detail}</Details>
        </ContainerBody>
      </SafeArea>
    </Container>
  );
};

export default DetailsMessage;
