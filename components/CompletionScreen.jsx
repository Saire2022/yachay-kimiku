import { View, Text } from 'react-native'
import React from 'react'

export default function CompletionScreen({categoria}) {
  return (
    <View>
      <Text>Felicidades completaste la categoria {categoria}</Text>
    </View>
  )
}