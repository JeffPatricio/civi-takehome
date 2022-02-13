import styled from 'styled-components/native';

export const Container = styled.View`
  height: 60px;
  background-color: white;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: bold;
`;

export const PressableIcon = styled.Pressable`
  position: absolute;
  left: 15px;
`;
