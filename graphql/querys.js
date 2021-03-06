import { gql} from "@apollo/client";

  const NEW_PATIENT =gql`mutation CreatePatient($patientName: String!, $dateOfBirth: DateTime!, $phoneNo: Float!, $gender: String!, $addressLine1: String!, $addressLine2: String!, $district: String!, $city: String!, $state: String!, $pincode: Int!) {
    createPatient(patientName: $patientName, dateOfBirth: $dateOfBirth, phoneNo: $phoneNo, gender: $gender, addressLine1: $addressLine1, addressLine2: $addressLine2, district: $district, city: $city, state: $state, pincode: $pincode) {
      id
    }
  }`;
                

  const GET_PATIENT_DATA =gql`query FetchPatientByPhoneNo($phoneNo: Float!) {
    fetchPatientByPhoneNo(phoneNo: $phoneNo) {
      patientName
      gender
      state
      city
      pincode
      district
    }
  }`;

  const GET_PATIENT_DATA_GENERAL = gql`query FetchPatientGeneral($patientName: String, $gender: String, $dateOfBirth: DateTime, $city: String, $pincode: Int, $phoneNo: Float) {
    fetchPatientGeneral(patientName: $patientName, gender: $gender, dateOfBirth: $dateOfBirth, city: $city, pincode: $pincode, phoneNo: $phoneNo) {
      id
      patientName
      gender
      state
      city
      pincode
      district
      dateOfBirth
      phoneNo
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

const UPLOAD_FILE= gql`
mutation SingleUpload($file: Upload!) {
  singleUpload(file: $file) {
    url
  }
}
`;

  const CREATE_ENCOUNTER = gql`mutation CreatePatientEncounter($patientId: Int!, $encounterCatalogId: Int!, $encounterTypeText: String, $primaryComplaint: String, $secondaryComplaint: String) {
    createPatientEncounter(patientId: $patientId, encounterCatalogId: $encounterCatalogId, encounterTypeText: $encounterTypeText, primaryComplaint: $primaryComplaint, secondaryComplaint: $secondaryComplaint) {
          id
        }
    }`;


export {
  NEW_PATIENT,
  GET_ENCOUNTER_TYPES,
  GET_PATIENT_DATA,
  GET_PATIENT_DATA_GENERAL,
  UPLOAD_FILE
};
