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

function PrescriptionReport() {
  const [doctorName, setDoctorName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const [prescriptions, setPrescription] = useState([]);

  const handleChangeInput = (index, event) => {
    const values = [...prescriptions];
    values[index][event.target.name] = event.target.value;
    setPrescription(values);
  };

  const handleAddField = () => {
    setPrescription([
      ...prescriptions,
      { medicine: "", dosage: "", duration: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const values = [...prescriptions];
    // console.log(values);
    values.splice(index, 1);
    setPrescription(values);
  };

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
              <Grid xs={12} sm={6} md={6}>
                <Input
                  className={styles.encounterInput}
                  clearable
                  bordered
                  labelPlaceholder="Enter Encounter ID"
                />
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Button color="primary" auto ghost>
                  Search
                </Button>
              </Grid>
            </Grid.Container>
          </Row>

          <Row css={{ padding: "0 20px" }}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={12} md={4}>
                <PrescriptionImageCard />
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
                      {prescriptions.map((prescription, index) => (
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
                                value={prescription.medicine}
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
                                value={prescription.dosage}
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
                                value={prescription.duration}
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
                          Add Prescription
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
