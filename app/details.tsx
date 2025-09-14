import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';

export default function Details() {
  return (
    <>
      <Stack.Screen options={{ title: 'Details', headerShown: true }} />
      <Container>
        <Text>FOO</Text>
      </Container>
    </>
  );
}
