import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const HistoryCard = ( { item }:{item?:any}) => {
  return (
    <View style={styles.card}>
          <Text style={styles.amount}>{item.amount} ml</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
  )
}
const styles=StyleSheet.create({
  card: {
    backgroundColor: '#e0f7fa',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
  },
  time: {
    fontSize: 16,
    color: '#555',
  },
})

export default HistoryCard