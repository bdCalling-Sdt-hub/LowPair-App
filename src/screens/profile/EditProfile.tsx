import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import tw from "../../lib/tailwind";


const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  // User profile info states
  const [name, setName] = useState<string>("Riley Morgan");
  const [phone, setPhone] = useState<string>("+123 456 7892");
  const [email, setEmail] = useState<string>("riley254@gmail.com");
  const [address, setAddress] = useState<string>("43/2 New York, USA");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Password states
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Handle profile image upload
  const handleImageUpload = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "photo", includeBase64: false },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.error("Image Picker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri || null);
        }
      }
    );
  };

  // Save profile changes
  const handleSaveProfile = () => {
    Alert.alert("Success", "Profile updated successfully!");
  };

  // Update password
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    Alert.alert("Success", "Password updated successfully!");
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      {/* Profile Image */}
      <View style={tw`items-center`}>
        <Image
          source={{ uri: profileImage || "https://via.placeholder.com/100" }}
          style={tw`w-24 h-24 rounded-full`}
        />
        <TouchableOpacity style={tw`absolute bottom-0 right-4`} onPress={handleImageUpload}>
          <Text style={tw`text-blue-500 text-lg`}>📷</Text>
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold mt-3`}>{name}</Text>
      </View>

      {/* Tab Navigation */}
      <View style={tw`flex-row justify-between text-black p-2 rounded-lg mt-4`}>
        <TouchableOpacity
          onPress={() => setActiveTab("info")}
          style={[tw`flex-1 p-2 rounded-lg`, ]}
        >
          <Text style={[tw`text-center`, activeTab === "info" ? tw`text-white` : tw`text-gray-600`]}>Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("password")}
          style={[tw`flex-1 p-2 rounded-lg`,]}
        >
          <Text style={tw`text-center text-black`}>Update Password</Text>
        </TouchableOpacity>
      </View>

      {/* Personal Info Section */}
      {activeTab === "info" && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-gray-500`}>Full Name</Text>
          <TextInput style={tw`bg-gray-200 p-2 rounded-lg mt-1`} value={name} onChangeText={setName} />

          <Text style={tw`text-gray-500 mt-2`}>Phone</Text>
          <TextInput style={tw`bg-gray-200 p-2 rounded-lg mt-1`} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={tw`text-gray-500 mt-2`}>Email</Text>
          <TextInput style={tw`bg-gray-200 p-2 rounded-lg mt-1`} value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={tw`text-gray-500 mt-2`}>Address</Text>
          <TextInput style={tw`bg-gray-200 p-2 rounded-lg mt-1`} value={address} onChangeText={setAddress} />

          <TouchableOpacity onPress={handleSaveProfile} style={tw`mt-5 bg-blue-500 px-4 py-2 rounded-lg`}>
            <Text style={tw`text-white text-lg text-center`}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Update Password Section */}
      {activeTab === "password" && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-gray-500`}>Current Password</Text>
          <TextInput style={tw`bg-gray-200 p-2 rounded-lg mt-1`} placeholder="Enter current password" secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} />

          <Text style={tw`text-gray-500 mt-2`}>New Password</Text>
          <TextInput style={tw`bg-gray-200 p-2 rounded-lg mt-1`} placeholder="Enter new password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />

          <Text style={tw`text-gray-500 mt-2`}>Confirm New Password</Text>
          <TextInput style={tw`bg-gray-200 p-2 rounded-lg mt-1`} placeholder="Confirm new password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

          <TouchableOpacity onPress={handleUpdatePassword} style={tw`mt-5 bg-blue-500 px-4 py-2 rounded-lg`}>
            <Text style={tw`text-white text-lg text-center`}>Update Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;
