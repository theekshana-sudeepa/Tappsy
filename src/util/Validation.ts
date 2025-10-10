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
  if (!countryCode) {
    return "Country Is Required";
  }
  if (!regex.test(countryCode)) {
    return "Enter A Valid Country Code";
  }
  return null;
};

export const validatePhoneNo = (phoneNo: string): string | null => {
  const regex = /^[1-9][0-9]{6,14}$/;
  if (!phoneNo) {
    return "Contact Number Is Require";
  }
  if (!regex.test(phoneNo)) {
    return "Enter A Valid Contact Number";
  }
  return null;
};

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
