import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base'
import {  DrawerItems } from 'react-navigation'

const DrawerCustom = (props) =>(
    <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Text>Custom Drawer</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>
);
export default DrawerCustom;