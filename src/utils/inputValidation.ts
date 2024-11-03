const phoneNumberRegex = /[^0-9]/g; // E.164 format
const emailRegex = /[^a-zA-Z0-9._%+-@]/g; // Basic email format
const nameRegex = /[^a-zA-Z\s]/; // Only letters and spaces

export const validateInput = (
  input: string,
  type: "phone" | "email" | "name"
) => {
  switch (type) {
    case "phone":
      return input.replace(phoneNumberRegex, "");
    case "email":
      return input.replace(emailRegex, "");
    case "name":
      return input.replace(nameRegex, "");
    default:
      return input;
  }
};
