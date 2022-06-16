import { gql } from "@apollo/client";

  const CREATE_NEW_PATIENT = gql`
  mutation CreatePatientCatalog(
    $patientName: String!,
    $dateOfBirth: Date,
    $phoneNo: Float!,
    $gender: String!,
    $addressLine1: String,
    $addressLine2: String,
    $district: String!,
    $city: String!,
    $state: String!,
    $pincode: Int!
  ) {
    createPatientCatalog(
      data: {
        patientName: $patientName
        gender: $gender
        pincode: $pincode
        dateOfBirth: $dateOfBirth
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        city: $city
        state: $state
        phoneNo: $phoneNo
        district: $district
      }
    ) {
      data {
        id
        attributes {
          patientName
          gender
          phoneNo
          pincode
        }
      }
    }
  }`;

  const GET_PATIENT_DATA_FILTERED = gql`
  query GetPatientCatalogs($filter: [PatientCatalogFiltersInput]) {
    patientCatalogs( filters: { and: $filter } ) {
      data {
        id
        attributes {
          patientName
          gender
          dateOfBirth
          phoneNo
        }
      }
    }
  }`;

  const GET_ENCOUNTER_TYPES = gql`
  query GetEncounterCatalogs {
    encounterCatalogs {
      data {
        id
        attributes {
          encounterType
        }
      }
    }
  }`;
  
  const CREATE_PATIENT_ENCOUNTER = gql`
  mutation CreatePatientEncounter($encounterTypeText: String, $primaryComplaint: String, $secondaryComplaint: String, $patientId: ID!, $encounterTypeId: ID!) {
    createPatientEncounter(
      data: {
        encounterTypeText: $encounterTypeText
        primaryComplaint: $primaryComplaint
        secondaryComplaint: $secondaryComplaint
        patient_catalog: $patientId
        encounter_catalog: $encounterTypeId
      }
    ) {
      data {
        id
      }
    }
  }`;

  const GET_PATIENT_ENCOUNTER = gql`
  query GetPatientEncounter($encounterId: ID!) {
    patientEncounter(id: $encounterId) {
        data {
            id
            attributes {
                patient_catalog {
                    data {
                        attributes {
                            patientName
                            gender
                            dateOfBirth
                        }
                    }
                }
            }
        }
    }
  }`;

  const UPLOAD_FILE= gql`
    mutation SingleImageUpload($file: Upload!) {
        upload(file: $file) {
            data {
                attributes {
                    url
                }
            }
        }
    }`;

    const CREATE_PRESCRIPTION = gql`
    mutation CreatePrescription($imagePath: String!, $patientEncounterId: ID!) {
        createPrescription(
            data: {
                imagePath: $imagePath
                patient_encounter: $patientEncounterId
            }
        ) {
            data {
                id
            }
        }
    }`;

    const GET_PRESCRIPTION = gql`
    query GetPrescriptions($patientEncounterId: ID!) {
        prescriptions( filters: { patient_encounter: {id: {eq: $patientEncounterId}}}){
        data {
          id
          attributes {
            imagePath
            patient_encounter {
              data {
                attributes {
                  patient_catalog {
                    data {
                      attributes {
                        patientName
                      }
                    }
                  }
                }
              }
            }
            prescription_datum {
              data {
                id
                attributes {
                  doctorName
                  diagnosis
                  medicines
                  labTestRecommended
                }
              }
            }
          }
        }
      }
    }`;

    const CREATE_PRESCRIPTION_DATA = gql`
    mutation CreatePrescriptionData($doctorName: String!, $medicines: JSON, $labTestRecommended: JSON, $diagnosis: String, $prescriptionId: ID!) {
      createPrescriptionData(
        data: {
          doctorName: $doctorName
          medicines: $medicines
          labTestRecommended: $labTestRecommended
          diagnosis: $diagnosis
          prescription: $prescriptionId
        }
      ) {
        data {
          id
        }
      }
    }
    `;

    const UPDATE_PRESCRIPTION_DATA = gql`
    mutation UpdatePrescriptionData(
      $prescriptionDataId: ID!
      $doctorName: String
      $diagnosis: String
      $medicines: JSON
      $labTestRecommended: JSON
    ) {
      updatePrescriptionData(
        id: $prescriptionDataId
        data: {
          doctorName: $doctorName
          diagnosis: $diagnosis
          medicines: $medicines
          labTestRecommended: $labTestRecommended
        }
      ) {
        data {
          id
        }
      }
    }`;


export {
  CREATE_NEW_PATIENT,
  GET_ENCOUNTER_TYPES,
  GET_PATIENT_DATA_FILTERED,
  CREATE_PATIENT_ENCOUNTER,
  GET_PATIENT_ENCOUNTER,
  UPLOAD_FILE,
  CREATE_PRESCRIPTION,
  GET_PRESCRIPTION,
  CREATE_PRESCRIPTION_DATA,
  UPDATE_PRESCRIPTION_DATA
};
