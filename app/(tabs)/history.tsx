import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getTodayLog } from '@/utils/storage';

import { useFocusEffect } from '@react-navigation/native';
import HistoryCard from '@/components/historyCard';
const History = () => {
  const [entries, setEntries] = useState<{ amount: number; time: string }[]>([]);


useFocusEffect(
  useCallback(() => {
    const fetch = async () => {
      const data = await getTodayLog();
      setEntries(data);
    };
    fetch();
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today&apos;s Water Intake 💧</Text>
      <View >
  <FlatList
    data={entries}
    keyExtractor={(item, index) => `${item.time}-${index}`}
    renderItem={({item})=>{
     return <HistoryCard item={item} />
    }}
    
    inverted
    ListEmptyComponent={
      <Text style={styles.empty}>No water intake yet today.</Text>
    }
  />
</View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5faff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
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
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
});
