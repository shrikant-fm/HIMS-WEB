import { gql} from "@apollo/client";

  const NEW_PATIENT =gql`mutation CreatePatient($patientName: String!, $dateOfBirth: DateTime!, $phoneNo: Float!, $gender: String!, $address: String!, $district: String!, $city: String!, $state: String!, $pincode: Int!, $encounterType: Int!, $existingAilments: JSON) {
    createPatient(patientName: $patientName, dateOfBirth: $dateOfBirth, phoneNo: $phoneNo, gender: $gender, address: $address, district: $district, city: $city, state: $state, pincode: $pincode, EncounterType: $encounterType, existingAilments: $existingAilments) {
      id
    }
  }`;

  const GET_ENCOUNTER_TYPES =gql`query AllEncounterType {
    allEncounterType {
      id
      encounterType
      createdAt
      updatedAt
    }
  }`;


export {NEW_PATIENT, GET_ENCOUNTER_TYPES};
