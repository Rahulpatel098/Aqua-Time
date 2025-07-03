import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button, SegmentedButtons } from 'react-native-paper';
import { addTodayEntry } from '@/utils/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getTodayLog } from '@/utils/storage';

import { scheduleWaterReminder } from '@/utils/reminder';
import SettingsModal from '@/components/SettingsModal';

import HistoryCard from '@/components/historyCard';
const Status = () => {
  const { user, isLoadingUser, resetUser } = useUser();
  const [limit, setLimit] = useState<number>(0);
  const [drinkedWater, setDrinkedWater] = useState<number>(0);
  const [recentEntries, setRecentEntries] = useState<{ amount: number; time: string }[]>([]);

  const [modalVisible, setModalVisible] = useState(false); const FREQUENCIES = [100, 250, 500];
  useEffect(() => {
    const fetchRecentHistory = async () => {
      try {
        const allEntries = await getTodayLog();
        const lastTwo = allEntries.slice(-2).reverse(); // reverse to show most recent first
        setRecentEntries(lastTwo);
      } catch (error) {
        console.log("Failed to fetch recent history:", error);
      }
    };

    fetchRecentHistory();
  }, [drinkedWater]); // refresh when user drinks water

  useEffect(() => {
    if (user?.mode === 'auto') {
      setLimit(user.waterRequirement);
    }
    // handeling custom is remaining 
  }, [user]);

  const handleAddWater = async (value: number) => {
    setDrinkedWater((prev) => prev + value);
    try {
      await addTodayEntry(value);
    } catch (error) {
      console.log(error);
    }
  };
  const handelSetting = () => {
    setModalVisible(true);
  }
  const progress = limit > 0 ? (drinkedWater / limit) * 100 : 0;

  if (isLoadingUser || !user) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <CircularProgress
          value={progress}
          radius={100}
          duration={1500}
          progressValueColor={'#00e0ff'}
          maxValue={100}
          title={'Progress'}
          titleColor={'#333'}
          activeStrokeColor={'#00e0ff'}
          inActiveStrokeColor={'#d3d3d3'}
          inActiveStrokeOpacity={0.2}
        />
        <Text style={styles.statusText}>{drinkedWater} ml / {limit} ml</Text>
        <TouchableOpacity style={styles.settingButton}
          onPress={handelSetting}
        >
          <MaterialCommunityIcons
            name="cog"
            size={30}
            color={'black'}
          />
        </TouchableOpacity>
      </View>

      <SegmentedButtons
        value={null}
        onValueChange={(value: any) => handleAddWater(Number(value))}
        buttons={FREQUENCIES.map((freq) => ({
          value: freq.toString(),
          label: `${freq} ml`,
        }))}
        style={styles.segmentedButtons}
      />

      <Button
        mode="contained"
        onPress={() => {
          scheduleWaterReminder();
        }}>
        press for notifications
      </Button>

      <View style={styles.history}>
        <Text>last drink:</Text>
        <FlatList
          data={recentEntries}
          keyExtractor={(item, index) => `${item.time}-${index}`}
          renderItem={({ item }) => <HistoryCard item={item} />}
          ListEmptyComponent={<Text style={styles.empty}>No drinks yet today.</Text>}
        />
      </View>
      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}

      />
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  progress: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
  },
  history: {
    backgroundColor: '#ede7ff',
    padding: 16,
    borderRadius: 20,
  },
  historyText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  settingButton: {
    position: 'absolute',
    right: 2,
    bottom: 10
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
});
