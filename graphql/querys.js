import { gql} from "@apollo/client";

  const NEW_PATIENT =gql`mutation CreatePatient($patientName: String!, $phoneNo: Int!, $gender: String!, $address: String!, $district: String!, $city: String!, $state: String!, $pincode: Int!) {
    createPatient(patientName: $patientName, phoneNo: $phoneNo, gender: $gender, address: $address, district: $district, city: $city, state: $state, pincode: $pincode) {
      id
    }
  }`;


export {NEW_PATIENT};
