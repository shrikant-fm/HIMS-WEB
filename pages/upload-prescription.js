import React from "react";
import { useState } from "react";
import { Grid, Card, Container, Input, Button } from "@nextui-org/react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_PATIENT_ENCOUNTER,
  UPLOAD_FILE,
  CREATE_PRESCRIPTION,
  GET_USER_ROLE
} from "../graphql/strapi-query";
import Header from "../components/Header";

export default function Upload(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [encounterId, setEncounterId] = useState(null);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  const [
    getEncouterData,
    {
      loading: encounterDataLoading,
      data: encounterData,
      error: encounterDataError,
    },
  ] = useLazyQuery(GET_PATIENT_ENCOUNTER, { fetchPolicy: "network-only" });

  const [
    uploadFile,
    {
      loading: fileUploadLoading,
      data: fileUploadData,
      error: fileUploadError,
    },
  ] = useMutation(UPLOAD_FILE);
  const [
    createPrescription,
    {
      loading: createPrescriptionLoading,
      data: createPrescriptionData,
      error: createPrescriptionError,
    },
  ] = useMutation(CREATE_PRESCRIPTION);

 // User Authentication and Role Verification
 const [userRole, setUserRole] = useState(null);

 const {
   loading: userRoleLoading,
   data: userRoleData,
   error: userRoleError,
 } = useQuery(GET_USER_ROLE,{fetchPolicy: "no-cache"});

 React.useEffect(() => {
   if (userRoleData) {
     var data = userRoleData.me.role.name;
     setUserRole(data);
   }
 }, [userRoleLoading]);
 // Verification End

  // TO DISPLAY IMAGE ON USER-2 PAGE ITSELF

  // const uploadToClient = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const i = event.target.files[0];

  //     setImage(i);
  //     setCreateObjectURL(URL.createObjectURL(i));
  //   }
  // };
  const handleSearch = async () => {
    if (encounterId) {
      await getEncouterData({
        variables: {
          encounterId: parseInt(encounterId),
        },
      });
    } else alert("Plese Enter Encounter Id");
  };

  React.useEffect(() => {
    if (!encounterDataLoading) {
      if (encounterDataError) {
        console.log(encounterDataError.message);
        setError("Error in fetching patients data!! Try again later.");
        // return
      } else {
        if (encounterData) {
          setPatient(
            encounterData.patientEncounter.data.attributes.patient_catalog.data
              .attributes
          );
          console.log(encounterData);
        }
      }
    }
  }, [encounterDataLoading]);

  React.useEffect(() => {
    if (!fileUploadLoading) {
      if (fileUploadError) {
        console.log(fileUploadError.message);
        setError("Error in uploading!! Try again later.");
        return;
      } else {
        if (fileUploadData) {
          console.log(fileUploadData);
          createPrescription({
            variables: {
              imagePath: fileUploadData.upload.data.attributes.url,
              patientEncounterId: parseInt(encounterId),
            },
          });
        }
      }
    }
  }, [fileUploadLoading]);

  React.useEffect(() => {
    if (!createPrescriptionLoading) {
      if (createPrescriptionError) {
        console.log(createPrescriptionError.message);
        setError("Error in uploading!! Try again later.");
        return;
      } else {
        if (createPrescriptionData) {
          console.log(createPrescriptionData);
          alert("Prescription uploaded successfully.");
          window.location.reload();
        }
      }
    }
  }, [createPrescriptionLoading]);

  // React.useEffect(async () => {
  //   if (!patientsDataLoading) {
  //     if (patientsDataError) {
  //       console.log(patientsDataError.message)
  //       setError("Error in fetching patients data!! Try again later.")
  //       // return
  //     } else {
  //       if (patientsData) {
  //         var data = patientsData.fetchPatientById
  //         if(data) {
  //           setPatient(data)
  //           setError(null);
  //         } else {
  //           setPatient(null);
  //           setError("Data Not Found")
  //           // return
  //         }
  //       }
  //     }
  //   }

  // }, [patientsDataLoading]);

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;
    setPrescriptionFile(e.target.files[0]);
  };

  const uploadToServer = async () => {
    if (prescriptionFile) {
      await uploadFile({
        variables: {
          file: prescriptionFile,
        },
      });
    } else {
      alert("choose file first");
    }
  };

  const calculateAge = (dob) => {
    // birthday is a date
    var ageDifMs = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  if (userRole === "Upload Prescription") {
    return (
      <>
        <Header backLabel={"Homepage"} />
        <Container css={{ width: 800 }}>
          <Card>
            <Card.Body>
              <Grid.Container css={{ my: 4 }} gap={2} justify="space-between">
                <Grid xs={4}>
                  <Input
                    clearable
                    bordered
                    labelPlaceholder="Enter Patient Encounter ID"
                    value={encounterId}
                    onChange={(e) => setEncounterId(e.target.value)}
                  />
                </Grid>
                <Grid xs={4}>
                  <Button color="primary" auto ghost onClick={handleSearch}>
                    Search
                  </Button>
                </Grid>
              </Grid.Container>
              {patient ? (
                <Grid.Container gap={2} justify="space-between">
                  <Grid xs={6} sm={6} lg={4} xl={4}>
                    <Input name="fname" readOnly value={patient.patientName} />
                  </Grid>
                  <Grid xs={6} sm={6} lg={4} xl={4}>
                    <Input
                      name="gender"
                      readOnly
                      value={`${patient.gender}/${
                        patient.dateOfBirth
                          ? calculateAge(patient.dateOfBirth)
                          : "NA"
                      }`}
                    />
                  </Grid>
                  {/* <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="state"
                readOnly
                value={patient.state}
                label="State"
              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="district"
                readOnly
                value={patient.district}
                label="District"
              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="city"
                readOnly
                value={patient.city}
                label="City"
              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="pincode"
                readOnly
                value={patient.pincode}
                label="Pincode"
              />
            </Grid> */}

                  <Grid xs={6} sm={6} lg={4} xl={4}>
                    <input
                      type="file"
                      name="myImage"
                      onChange={handleFileChange}
                    />
                  </Grid>
                  <Grid xs={16} sm={6} lg={4} xl={4}>
                    <Button
                      shadow
                      color="success"
                      auto
                      className="btn btn-primary"
                      type="submit"
                      onClick={uploadToServer}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid.Container>
              ) : error ? (
                <div>{error}</div>
              ) : (
                ""
              )}
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}
