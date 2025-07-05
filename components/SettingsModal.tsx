import { useUser } from '@/context/UserContext';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
    reminderEnabled?: boolean;
    onToggleReminder?: () => void;
}

const SettingsModal = ({
    visible,
    onClose,
    reminderEnabled,
    onToggleReminder,
}: SettingsModalProps) => {
    const { user, isLoadingUser, resetUser } = useUser();
    const [showCustom,setShowCustom]=useState<boolean>(false)
    const [customRequriment,setCustomRequriment]=useState("")
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalView}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Change the mode to Custom </Text>
          <Switch value={showCustom} onValueChange={setShowCustom} />
        </View>
        {showCustom && 
        <View>
            <Text > How much is your requiement</Text>
            <TextInput
        label="Your requiement (in Liters)"
        value={customRequriment}
        onChangeText={setCustomRequriment}
        mode="outlined"
        keyboardType="numeric"
      />
            
        </View>
        
        }
        <View style={styles.row}>
          <Text style={styles.label}>Enable Reminders</Text>
          <Switch value={reminderEnabled} onValueChange={onToggleReminder} />
        </View>
        <Button
                mode="contained"
                onPress={() => {
                  resetUser();
                }}>
                Reset The Data
              </Button>
        <Button mode="contained" onPress={onClose} style={{ marginTop: 20 }}>
          Close
        </Button>
      </View>
    </Modal>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000077',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
  },
});
