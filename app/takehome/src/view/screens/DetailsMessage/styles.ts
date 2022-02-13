import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #ffffff;
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerBody = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Subject = styled.Text`
  font-size: 22px;
  color: black;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Details = styled.Text`
  font-size: 16px;
  color: black;
  text-align: justify;
  margin-bottom: 60px;
`;

export const Date = styled.Text`
  font-size: 14px;
  color: #666666;
  text-align: center;
  margin-bottom: 20px;
`;
