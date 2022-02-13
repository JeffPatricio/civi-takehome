import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { RemoteUpdateMessage } from '../../../data/usecases/remoteUpdateMessage';
import { Message } from '../../../domain/entities/Message';
import remoteHttpClient from '../../../infra/remoteHttpClient';
import { formatDateMinified } from '../../../utils';
import { navigate } from '../../navigators/navigationRef';
import {
  Container,
  ContainerDate,
  ContainerInfo,
  IntroDetail,
  Profile,
  Subject,
  Date,
  NotReadMark,
  NotReadCount,
} from './styles';

interface ItemMessageListProps {
  item: Message;
}

const remoteUpdateMessage = new RemoteUpdateMessage(remoteHttpClient);

const ItemMessageList = ({ item }: ItemMessageListProps) => {
  const [read, setRead] = useState(item.read);

  useEffect(() => {
    setRead(item.read);
  }, [item]);

  const navigateToDetails = useCallback(() => {
    setRead(true);
    navigate('details', { item });
  }, [item]);

  const markNotRead = useCallback(async () => {
    try {
      setRead(false);
      await remoteUpdateMessage.exec(item.id, { read: false });
    } catch (err: any) {
      setRead(true);
      Alert.alert('Erro', 'Ocorreu um erro ao marcar a mensagem como não lida');
    }
  }, [item]);

  const alertMarkNotRead = () => {
    Alert.alert('Atenção', 'Deseja marcar a mensagem como não lida?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: markNotRead,
      },
    ]);
  };

  return (
    <Container
      activeOpacity={0.5}
      onPress={navigateToDetails}
      onLongPress={alertMarkNotRead}
    >
      <Profile
        resizeMode="cover"
        source={{
          uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        }}
      />
      <ContainerInfo>
        <View>
          <Subject numberOfLines={1}>{item.subject}</Subject>
          <IntroDetail numberOfLines={1}>{item.detail}</IntroDetail>
        </View>
        <ContainerDate>
          <Date>{formatDateMinified(item.timestamp)}</Date>
          <NotReadMark blueColor={!read}>
            {!read && <NotReadCount>1</NotReadCount>}
          </NotReadMark>
        </ContainerDate>
      </ContainerInfo>
    </Container>
  );
};

export default ItemMessageList;
