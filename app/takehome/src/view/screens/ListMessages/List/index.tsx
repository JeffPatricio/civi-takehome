import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { RemoteFetchMessagesList } from '../../../../data/usecases/remoteFetchMessagesList';
import { Message } from '../../../../domain/entities/Message';
import remoteHttpClient from '../../../../infra/remoteHttpClient';
import ItemMessageList from '../../../components/ItemMessageList';
import {
  ContainerCentered,
  EmptyMessage,
  ErrorMessage,
  TextReload,
} from './styles';

type PageStatus = 'OK' | 'LOADING' | 'ERROR' | 'REFRESHING';

const remoteFetchMessagesList = new RemoteFetchMessagesList(remoteHttpClient);
const keyExtractor = (item: Message) => String(item.id);

const List = () => {
  const errorMessageRef = useRef('');
  const [status, setStatus] = useState<PageStatus>('LOADING');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessagesList('LOADING');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMessagesList = useCallback(async (statusToSet: PageStatus) => {
    try {
      setStatus(statusToSet);
      const list = await remoteFetchMessagesList.exec();
      setMessages(list);
      setStatus('OK');
    } catch (err: any) {
      console.log(err);
      if (statusToSet === 'REFRESHING') {
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar a lista');
        setStatus('OK');
        return;
      }

      errorMessageRef.current =
        'Ocorreu um erro ao buscar\n a lista de mensagens';
      setStatus('ERROR');
      return;
    }
  }, []);

  const refetch = useCallback(async () => {
    fetchMessagesList('LOADING');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshList = useCallback(async () => {
    fetchMessagesList('REFRESHING');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(({ item }: { item: Message }) => {
    return <ItemMessageList item={item} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listEmpty = useCallback(() => {
    return (
      <ContainerCentered>
        <EmptyMessage>Não há mensagens na lista</EmptyMessage>
      </ContainerCentered>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {status === 'LOADING' && (
        <ContainerCentered>
          <ActivityIndicator size={30} color="#000000" />
        </ContainerCentered>
      )}

      {status === 'ERROR' && (
        <ContainerCentered>
          <ErrorMessage>{errorMessageRef.current}</ErrorMessage>
          <Pressable hitSlop={30} onPress={refetch}>
            <TextReload>Tentar novamente</TextReload>
          </Pressable>
        </ContainerCentered>
      )}

      {(status === 'OK' || status === 'REFRESHING') && (
        <FlatList
          data={messages}
          refreshing={status === 'REFRESHING'}
          onRefresh={refreshList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={styles.containerFlatList}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  containerFlatList: {
    flex: 1,
  },
});

export default List;
