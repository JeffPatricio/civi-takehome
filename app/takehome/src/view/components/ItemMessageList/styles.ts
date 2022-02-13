import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const ContainerInfo = styled.View`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  flex: 1;
  justify-content: space-between;
`;

export const Profile = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const Subject = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: 600;
  margin-bottom: 8px;
  max-width: 220px;
`;

export const IntroDetail = styled.Text`
  font-size: 14px;
  color: #666666;
  max-width: 200px;
`;

export const ContainerDate = styled.View`
  align-items: flex-end;
`;

export const Date = styled.Text`
  font-size: 14px;
  color: black;
  margin-bottom: 4px;
`;

interface NotReadMarkProps {
  blueColor: boolean;
}

export const NotReadMark = styled.View<NotReadMarkProps>`
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 10px;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.blueColor &&
    css`
      background-color: #46b1ff;
    `}
`;

export const NotReadCount = styled.Text`
  font-size: 12px;
  color: white;
`;
