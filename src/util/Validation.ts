export const validateFirstName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return "First Name Is Required";
  }
  return null;
};

export const validateLastName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return "Last Name Is Required";
  }
  return null;
};

export const validateCountryCode = (countryCode: string): string | null => {
  const regex = /^\+[1-9]\d{0,3}$/;
  if (!countryCode) return "Country Is Required";
  if (!regex.test(countryCode)) return "Enter A Valid Country Code";
  return null;
};

// Enhanced: validate based on selected country
export const validatePhoneNo = (phoneNo: string, countryCode?: string): string | null => {
  if (!phoneNo) return "Contact Number Is Required";

  // define patterns by country (you can expand this list)
  const regexMap: Record<string, RegExp> = {
    "+94": /^[1-9][0-9]{8}$/,   // Sri Lanka - 9 digits
    "+91": /^[6-9][0-9]{9}$/,   // India - 10 digits
    "+1": /^[2-9][0-9]{9}$/,    // USA/Canada - 10 digits
    "+44": /^[1-9][0-9]{9,10}$/, // UK - 10 to 11 digits
  };

  const regex = regexMap[countryCode || ""] || /^[0-9]{6,14}$/; // fallback

  if (!regex.test(phoneNo)) return "Enter A Valid Contact Number For Selected Country";

  return null;
};

export const validatePin = (pin: string): string | null => {
  if (!pin || pin.trim().length === 0) {
    return "PIN Is Required"
  }
  if (!/^\d{4}$/.test(pin)) {
    return "PIN Must Be Exactly 4 Digits"
  }
  return null
}

export const validateProfileImage = (
  image: {
    uri: string;
    type?: string;
    fileSize?: number;
  } | null
): string | null => {
  if (!image) {
    return "Profile Image Is Required";
  }
  if (
    image.type &&
    !["image/jpeg", "image/jpg", "image/png"].includes(image.type)
  ) {
    return "Select A Valid Image Type (JPEG, JPG, PNG)";
  }
  if (image.fileSize && image.fileSize > 10 * 1024 * 1024) {
    // 10MB
    return "Profile Image Must Be Less Than 10MB";
  }
  return null;
};
