import * as Yup from "yup";

const YupPatterns = (key: string) => {
  switch (key) {
    case "email":
      return Yup.string().email("Invalid email format").required("Email is required");
    case "name": 
      return Yup.string().min(3, "Name must be not empty").required("Name is required");
    case "password":
      return Yup.string().min(8, "Minimum 8 characters").required("Password is required");
    case "confirmPassword":
      return Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Password confirmation is required");
    case "phone":
      return Yup.string()
        .max(16, "Maximum 16 numbers")
        .matches(
          /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
          "Phone number is not valid",
        )
        .required("Phone is required");
    case "termsAndConditions":
      return Yup.boolean().oneOf([true], "Terms and Conditions must be accepted");
    case "amount":
      return Yup.number().min(20, "Minimum amount must be more than 20$").required("Amount is required");
    case "ref":
      return Yup.string().min(1, "");
    case "addressTextData":
      return Yup.string().min(1, "This field must be not empty").required("All fields of address data are required!");
    case "postalCode":
      return Yup.string().min(1, "Postal code must be not empty").required("Postal code is required!");
    default:
      return Yup.string();
  }
};

export { YupPatterns };
