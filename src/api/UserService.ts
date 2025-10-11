import { useContext } from "react";
import { UserRegistrationData } from "../components/UserContext";


const API = process.env.EXPO_PUBLIC_APP_URL + "/TappsyBackEnd";

export const createNewAccount = async (
  userRegistrationData: UserRegistrationData
) => {
  let formData = new FormData();
  formData.append("firstName", userRegistrationData.firstName);
  formData.append("lastName", userRegistrationData.lastName);
  formData.append("countryCode", userRegistrationData.countryCode);
  formData.append("contactNo", userRegistrationData.contactNo);
  formData.append("pincode", userRegistrationData.pinCode);
  formData.append("profileImage", {
    uri: userRegistrationData.profileImage,
    name: "profile.png",
    type: "image/png",
  } as any);

  const response = await fetch(API + "/UserController", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return "OOPS! Account creation failed!";
  }
};

export const uploadProfileImage = async (userId: string, imageUri: string) => {
  let formData = new FormData();
  formData.append("userId", userId);
  formData.append("profileImage", {
    uri: imageUri,
    type: "image/png", // change if PNG
    name: "profile.png",
  } as any);

  const response = await fetch(API + "/ProfileController", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.warn("Profile image uploading failed!");
  }
};

export const signIn = async (contactNo: string, pincode: string) => {
  const formData = new FormData()
  formData.append("contactNo", contactNo)
  formData.append("pincode", pincode)

  // After: Using URLSearchParams
  const params = new URLSearchParams()
  params.append("contactNo", contactNo)
  params.append("pincode", pincode)

  try {
    const response = await fetch(API + "/LoginController", {
      method: "POST",
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })

    if (response.ok) {
      const json = await response.json()
      return json
    } else {
      const errorText = await response.text()
      console.error("Sign in failed:", errorText)
      return { success: false, message: "Invalid credentials" }
    }
  } catch (error) {
    console.error("Network error:", error)
    return { success: false, message: "Network error. Please try again." }
  }
}