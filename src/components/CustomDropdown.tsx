import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import tw from '../lib/tailwind';

// Define TypeScript Interface for Props
interface DropdownProps {
  label: string;
  options: string[]; // Array of strings
  selectedValue: string | null; // Can be a string or null initially
  onSelect: (value: string) => void; // Function to handle selection
}

const CustomDropdown: React.FC<DropdownProps> = ({ label, options, selectedValue, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Text style={tw`text-base text-gray-700 mb-1`}>{label}</Text>

      {/* Dropdown Button */}
      <TouchableOpacity
        style={tw`border border-gray-300 rounded-md p-3 bg-white`}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tw`text-gray-600`}>{selectedValue || 'Select...'}</Text>
      </TouchableOpacity>

      {/* Modal for Dropdown Options */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white w-80 p-4 rounded-lg`}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={tw`p-3 border-b border-gray-200`}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={tw`text-gray-700`}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={tw`p-3 mt-2 bg-gray-300 rounded-lg`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-center text-gray-700`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
