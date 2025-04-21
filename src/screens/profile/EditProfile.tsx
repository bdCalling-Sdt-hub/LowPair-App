import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import tw from "../../lib/tailwind";
import { useAuthUser } from "../../lib/AuthProvider";
import { SvgXml } from "react-native-svg";
import { cameraicon } from "../../assets/Icons";
import { useUpdatePersonalInformationMutation, useUpdateProfilePasswodMutation } from "../../redux/features/users/UserApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Profile: React.FC = () => {
  const [updatePersonalInformation] = useUpdatePersonalInformationMutation();
  const [updateProfilePasswod] = useUpdateProfilePasswodMutation();
  const { user, triggerUserRefetch } = useAuthUser();

  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  const [isLoading, setIsLoading] = useState(false);

  // User profile info states
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Password states
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
const isFocused = useIsFocused();
  // Initialize form with user data
 const navigation = useNavigation();

  // Handle profile image upload
  const handleImageUpload = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: false,
      quality: 0.8,
      selectionLimit: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        Alert.alert("Error", "Failed to pick image: " + response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        if (selectedImage.fileSize && selectedImage.fileSize > 5 * 1024 * 1024) {
          Alert.alert("Error", "Image size should be less than 5MB");
          return;
        }
        setProfileImage(selectedImage.uri || null);
      }
    });
  };

  // Save profile changes
  const handleSaveProfile = async () => {

    if(!firstname || !lastname || !contactNumber || !location){
      Alert.alert("Error", "All fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("first_name", firstname); 
    formData.append("last_name", lastname);
    formData.append("phone", contactNumber);
    formData.append("address", location);
  
    if (profileImage) {
      formData.append("avatar", {
        uri: profileImage,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }
  
    try {
      const response = await updatePersonalInformation(formData).unwrap();
      AsyncStorage.setItem('user', JSON.stringify(response?.user));
      console.log("Profile update response:", response);
      if(response.success){
        triggerUserRefetch();
        Alert.alert("Success", response.message);
        navigation.navigate(`${user?.role === "user" ? "Profile" : "attornyProfile"}`, { id: user?.id });
      }

    } catch (error) {
      Alert.alert("Error",error?.data?.message);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All password fields are required");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateProfilePasswod({
        old_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword
      }).unwrap();
      
      Alert.alert("Success", response.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      console.log("Password update response:", response);
    } catch (error) {
      Alert.alert("Error",error?.data?.message);
      console.error("Password update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      {/* Profile Image */}
      <View style={tw`items-center mt-4`}>
        <View style={tw`relative`}>
          <View style={tw`bg-gray-200 w-24 h-24 rounded-full`}>
            <Image
              source={{ uri: user?.avatar || "https://via.placeholder.com/100" }}
              style={[tw`w-full h-full rounded-full`, styles.profileImage]}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={tw`absolute bottom-0 right-0 bg-primary rounded-full w-8 h-8 items-center justify-center`}
            onPress={handleImageUpload}
            disabled={isLoading}
          >
            <SvgXml xml={cameraicon} width="16" height="16" />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-lg font-bold mt-3`}>{`${firstname} ${lastname}`}</Text>
      </View>

      {/* Tab Navigation */}
      <View style={tw`flex-row bg-[#E9F1F9] rounded-lg mt-6`}>
        <TouchableOpacity
          onPress={() => setActiveTab("info")}
          style={[
            tw`flex-1 p-3 rounded-lg`,
            activeTab === "info" && tw`bg-primary`
          ]}
          disabled={isLoading}
        >
          <Text style={[
            tw`text-center font-medium`,
            activeTab === "info" ? tw`text-white` : tw`text-gray-600`
          ]}>
            Personal Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("password")}
          style={[
            tw`flex-1 p-3 rounded-lg`,
            activeTab === "password" && tw`bg-primary`
          ]}
          disabled={isLoading}
        >
          <Text style={[
            tw`text-center font-medium`,
            activeTab === "password" ? tw`text-white` : tw`text-gray-600`
          ]}>
            Update Password
          </Text>
        </TouchableOpacity>
      </View>

      {/* Personal Info Section */}
      {activeTab === "info" && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-[#41414D] text-[16px] font-semibold`}>First Name</Text>
          <TextInput
            style={tw`bg-[#E9F1F9] text-[#929299] text-[14px] font-medium p-3 rounded-lg mt-1 mb-2 border border-gray-200`}
            value={firstname}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            editable={!isLoading}
          />

          <Text style={tw`text-[#41414D] text-[16px] font-semibold`}>Last Name</Text>
          <TextInput
            style={tw`bg-[#E9F1F9] text-[#929299] text-[14px] font-medium p-3 rounded-lg mt-1 mb-2 border border-gray-200`}
            value={lastname}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            editable={!isLoading}
          />

          <Text style={tw`text-[#41414D] text-[16px] font-semibold mt-2`}>Contact number</Text>
          <TextInput
            style={tw`bg-[#E9F1F9] text-[#929299] text-[14px] font-medium p-3 rounded-lg mt-1 mb-2 border border-gray-200`}
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
            editable={!isLoading}
          />

          <Text style={tw`text-[#41414D] text-[16px] font-semibold mt-2`}>Location</Text>
          <TextInput
            style={tw`bg-[#E9F1F9] text-[#929299] text-[14px] font-medium p-3 rounded-lg mt-1 mb-2 border border-gray-200`}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
            multiline
            editable={!isLoading}
          />

          <TouchableOpacity
            onPress={handleSaveProfile}
            style={tw`mt-6 bg-primary p-3 rounded-lg shadow`}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white text-lg font-medium text-center`}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Update Password Section */}
      {activeTab === "password" && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-[#41414D] text-[16px] font-semibold`}>Current Password</Text>
          <TextInput
            style={tw`bg-[#E9F1F9] text-[#929299] text-[14px] font-medium p-3 rounded-lg mt-1 mb-2 border border-gray-200`}
            placeholder="Enter current password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            editable={!isLoading}
          />

          <Text style={tw`text-[#41414D] text-[16px] font-semibold mt-2`}>New Password</Text>
          <TextInput
            style={tw`bg-[#E9F1F9] text-[#929299] text-[14px] font-medium p-3 rounded-lg mt-1 mb-2 border border-gray-200`}
            placeholder="Enter new password (min 6 characters)"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            editable={!isLoading}
          />

          <Text style={tw`text-[#41414D] text-[16px] font-semibold mt-2`}>Confirm New Password</Text>
          <TextInput
            style={tw`bg-[#E9F1F9] text-[#929299] text-[14px] font-medium p-3 rounded-lg mt-1 mb-2 border border-gray-200`}
            placeholder="Confirm new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isLoading}
          />

          <TouchableOpacity
            onPress={handleUpdatePassword}
            style={tw`mt-6 bg-primary p-3 rounded-lg shadow`}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white text-lg font-medium text-center`}>
              {isLoading ? "Updating..." : "Update Password"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
});

export default Profile;