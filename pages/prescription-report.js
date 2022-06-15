import React,{useState} from "react";
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

  const [ailments, setAilments] = useState([]);
    

     const handleChangeInput = (index, event) => {
    const values = [...ailments];
    values[index][event.target.name] = event.target.value;
    setAilments(values);
  };

  const handleAddField = () => {
    setAilments([...ailments, { ailment: "", comment: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...ailments];
    console.log(values)
    values.splice(index, 1);
    setAilments(values);
  };

  return (
    <>
      <Header />
      <Container className={styles.padding}>
        <Card css={{ padding: "30px 0" }}>
          <Row>
            <Container className={styles.formTitle}>
              Prescription Report Digitization
            </Container>
          </Row>

          <Row css={{ padding: "30px 30px" }}>
            <Grid xs={6}>
              <Input clearable bordered labelPlaceholder="Enter Encounter ID" />
            </Grid>
            <Grid xs={6}>
              <Button color="primary" auto ghost>
                Search
              </Button>
            </Grid>
          </Row>

          <Row css={{ padding: "0 20px" }}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={4}>
                <PrescriptionImageCard />
              </Grid>
              <Grid xs={8}>
                <Card isHoverable variant="bordered">
                  <Card.Body>
                    <Grid.Container gap={2}>
                      <Grid className={styles.Grid}>
                        <Input
                          className={styles.doctorName}
                          rounded
                          bordered
                          label="Doctor Name *"
                          placeholder="Doctor Name"
                          color="primary"
                          onChange={(e) => {
                            const setFullNameState = e.target.value;
                            setFullName(setFullNameState);
                          }}
                        />
                      </Grid>
                      <Grid className={styles.Grid}>
                        <Input
                          className={styles.contactNoInput}
                          bordered
                          label="Diagnosis *"
                          placeholder="Diagnosis"
                          color="primary"
                          onChange={(e) => {
                            const setContactState = e.target.value;
                            setContact(setContactState);
                          }}
                        />
                      </Grid>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Text color="primary" css={{ padding: "10px 40px" }}>
                        Medicines Suggested:
                      </Text>
                      <Row>
                        <Grid.Container>
                     
                          <Container className={styles.ailmentsRowsContainer}>
                            {ailments.map((ailment, index) => (
                              <Row key={index}>
                                <Grid className={styles.Grid}>
                                  <Input
                                    className={styles.ailmentsInput}
                                    rounded
                                    bordered
                                    label="Medicine"
                                    placeholder="Medicine"
                                    color="primary"
                                    name="ailment"
                                    value={ailment.ailment}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                  />
                                </Grid>
                                <Grid className={styles.Grid}>
                                  <Input
                                    className={styles.ailmentsInput}
                                    rounded
                                    bordered
                                    label="Dosage"
                                    placeholder="Dosage"
                                    color="primary"
                                    name="comment"
                                    value={ailment.comment}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                  />
                                </Grid>
                                <Grid className={styles.Grid}>
                                  <Input
                                    className={styles.ailmentsInput}
                                    rounded
                                    bordered
                                    label="Duration"
                                    placeholder="Duration"
                                    color="primary"
                                    name="comment"
                                    value={ailment.comment}
                                    onChange={(event) =>
                                      handleChangeInput(index, event)
                                    }
                                  />
                                </Grid>

                                <Grid className={styles.Grid}>
                                  <Button
                                    css={{
                                      my: "$12",
                                      width: "50px",
                                    }}
                                    shadow
                                    color="warning"
                                    size="sm"
                                    onClick={() => handleRemoveField(index)}
                                  >
                                    Remove
                                  </Button>
                                </Grid>
                              </Row>
                            ))}
                            <Button
                          css={{my: "$5", width: "50px" }}
                          shadow
                          size="sm"
                          onClick={() => handleAddField()}
                        >
                          Add Ailment
                        </Button>
                          </Container>
                          
                        </Grid.Container>
                        
                      </Row>
                    </Grid.Container>
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
