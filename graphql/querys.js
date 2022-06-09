import { gql} from "@apollo/client";

  const NEW_PATIENT =gql`mutation CreatePatient($patientName: String!, $dateOfBirth: DateTime!, $phoneNo: Float!, $gender: String!, $address: String!, $district: String!, $city: String!, $state: String!, $pincode: Int!) {
    createPatient(patientName: $patientName, dateOfBirth: $dateOfBirth, phoneNo: $phoneNo, gender: $gender, address: $address, district: $district, city: $city, state: $state, pincode: $pincode) {
      id
    }
  }`;


export {NEW_PATIENT};
