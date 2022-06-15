import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Grid,
  Input,
  Button,
  Text,
} from "@nextui-org/react";
import styles from "../styles/prescription-report.module.css";
import Header from "../components/Header";
import { PrescriptionImageCard } from "../components/PrescriptionImageCard";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PATIENT_ENCOUNTER, GET_PRESCRIPTION, CREATE_PRESCRIPTION_DATA } from "../graphql/strapi-query";

function PrescriptionReport() {
  const [doctorName, setDoctorName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [ encounterId , setEncounterId ] = useState(null);
  const [medicines, setMedicines] = useState([]);

  const [prescription, setPrescription] = useState(null);

  const [getEncouterData, { loading: encounterDataLoading, data: encounterData, error: encounterDataError }] = useLazyQuery(GET_PATIENT_ENCOUNTER, {fetchPolicy: 'network-only'})

  const [ getPrescription, { loading: getPrescriptionLoading, data: getPrescriptionData, error: getPrescriptionError} ] = useLazyQuery(GET_PRESCRIPTION);
  const [createPrescriptionData, {loading: createPrescriptionDataLoading, data: createPrescriptionDataData, error: createPrescriptionDataError }] = useMutation(CREATE_PRESCRIPTION_DATA)

  const handleSearch = async () => {
    if(encounterId) {
       await getEncouterData({ 
          variables : {
            encounterId: parseInt(encounterId)
          }
        })
    } else
      alert("Plese enter encounter id")
  }

  React.useEffect(() => {
    if (!encounterDataLoading) {
      if (encounterDataError) {
        console.log(encounterDataError.message)
        setError("Error in fetching patients data!! Try again later.")
        // return 
      } else {
        if(encounterData) {
          getPrescription({
            variables: {
              patientEncounterId: parseInt(encounterId)
            }
          })
        }
      }
    }
  }, [encounterDataLoading]);

  React.useEffect(() => {
    if (!getPrescriptionLoading) {
      if (getPrescriptionError) {
        console.log(getPrescriptionError.message)
        setError("Error in fetching patients data!! Try again later.")
        // return 
      } else {
        if(getPrescriptionData) {
          console.log(getPrescriptionData)
          if (getPrescriptionData.prescriptions.data.length > 0) {
            setPrescription(getPrescriptionData.prescriptions.data[0])
          } else {
            alert('Encounter/Prescription does not exist')
            setPrescription(null)
          }
        }
      }
    }
  }, [getPrescriptionLoading]);

  const handleChangeInput = (index, event) => {
    const values = [...medicines];
    values[index][event.target.name] = event.target.value;
    setMedicines(values);
  };

  const handleAddField = () => {
    setMedicines([
      ...medicines,
      { medicine: "", dosage: "", duration: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const values = [...medicines];
    // console.log(values);
    values.splice(index, 1);
    setMedicines(values);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault()
    if (!doctorName || doctorName == "") {
      alert("Enter doctor name")
      return
    }
    createPrescriptionData({
      variables: {
        doctorName: doctorName,
        medicines: medicines,
        labTestRecommended: null,
        diagnosis: diagnosis,
        prescriptionId: parseInt(prescription.id)
      }
    })
  }

  React.useEffect(() => {
    if (!createPrescriptionDataLoading) {
      if (createPrescriptionDataError) {
        console.log(createPrescriptionDataError.message)
        setError("Error in uploading prescription data!! Try again later.")
        // return 
      } else {
        if(createPrescriptionDataData) {
          alert("Prescription data uploaded successfully")
          window.location.reload()
        }
      }
    }
  }, [createPrescriptionDataLoading]);

  return (
    <>
      <Header />
      <Container className={styles.container}>
        <Card css={{ padding: "30px 0" }}>
          <Row>
            <Container className={styles.formTitle}>
              Prescription Report Digitization
            </Container>
          </Row>

          <Row css={{ padding: "30px 30px" }} gap={2}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={4}>
                <Input clearable bordered labelPlaceholder="Enter Patient Encounter ID" value={encounterId} 
                  onChange={(e)=>setEncounterId(e.target.value)}/>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Button color="primary" auto ghost onClick={() => handleSearch()}>
                  Search
                </Button>
              </Grid>
            </Grid.Container>
          </Row>

          <Row css={{ padding: "0 20px" }}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={12} md={4}>
                {prescription ? <PrescriptionImageCard data={prescription.attributes}/> : ''}
              </Grid>
              <Grid xs={12} md={8}>
                <Card
                  css={{ minWidth: "350px" }}
                  isHoverable
                  variant="bordered"
                >
                  <Card.Body>
                    <Row>
                      <Grid.Container>
                        <Grid xs={12} sm={6} md={6} className={styles.Grid}>
                          <Input
                            className={styles.doctorInput}
                            rounded
                            bordered
                            label="Doctor Name *"
                            placeholder="Doctor Name"
                            color="primary"
                            onChange={(e) => {
                              const setDoctorNameState = e.target.value;
                              setDoctorName(setDoctorNameState);
                            }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={6} className={styles.Grid}>
                          <Input
                            className={styles.diagnosisInput}
                            rounded
                            bordered
                            label="Diagnosis *"
                            placeholder="Diagnosis"
                            color="primary"
                            onChange={(e) => {
                              const setDiagnosisState = e.target.value;
                              setDiagnosis(setDiagnosisState);
                            }}
                          />
                        </Grid>
                      </Grid.Container>
                    </Row>

                    <Row>
                      <Text color="primary" css={{ padding: "10px 40px" }}>
                        Medicines Suggested:
                      </Text>
                    </Row>
                    <>
                      {medicines.map((m, index) => (
                        <Row key={index}>
                          <Grid.Container gap={2}>
                            <Grid
                              xs={3}
                              md={3}
                              className={styles.prescriptionGrid}
                            >
                              <Input
                                className={styles.medicineInput}
                                rounded
                                bordered
                                label="Medicine"
                                placeholder="Medicine"
                                color="primary"
                                name="medicine"
                                value={m.medicine}
                                onChange={(event) =>
                                  handleChangeInput(index, event)
                                }
                              />
                            </Grid>
                            <Grid
                              xs={3}
                              md={3}
                              className={styles.prescriptionGrid}
                            >
                              <Input
                                className={styles.dosageInput}
                                rounded
                                bordered
                                label="Dosage"
                                placeholder="Dosage"
                                color="primary"
                                name="dosage"
                                value={m.dosage}
                                onChange={(event) =>
                                  handleChangeInput(index, event)
                                }
                              />
                            </Grid>
                            <Grid
                              xs={3}
                              md={3}
                              className={styles.prescriptionGrid}
                            >
                              <Input
                                className={styles.durationInput}
                                rounded
                                bordered
                                label="Duration"
                                placeholder="Duration"
                                color="primary"
                                name="duration"
                                value={m.duration}
                                onChange={(event) =>
                                  handleChangeInput(index, event)
                                }
                              />
                            </Grid>

                            <Grid xs={3} className={styles.prescriptionGrid}>
                              <Button
                                css={{
                                  my: "$10",
                                }}
                                auto
                                shadow
                                color="error"
                                size="xs"
                                onClick={() => handleRemoveField(index)}
                              >
                                X
                              </Button>
                            </Grid>
                          </Grid.Container>
                        </Row>
                      ))}
                      <Row>
                        <Button
                          css={{ my: "$5", width: "50px" }}
                          shadow
                          size="sm"
                          onClick={() => handleAddField()}
                        >
                          Add Medicine
                        </Button>
                      </Row>
                      <Row>
                        <Button
                          css={{ my: "$5", width: "50px" }}
                          shadow
                          size="sm"
                          onClick={(e) => handleFormSubmit(e)}
                        >
                          Submit
                        </Button>
                      </Row>
                    </>
                  </Card.Body>
                </Card>
              </Grid>
            </Grid.Container>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default PrescriptionReport;
