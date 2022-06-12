import React, { useState } from "react";
import { Container, Card, Row, Grid, Input, Button, Table } from "@nextui-org/react";
import styles from "../styles/generate-slip.module.css";
import { useRouter } from "next/router";
import { GET_PATIENT_DATA_GENERAL } from "../graphql/querys";
import { useQuery, useLazyQuery } from "@apollo/client";
import DropdownCustom from "../components/Dropdown";
import Header from "../components/Header";
import PatientDataCard from "../components/ShowPatientData";

export default function GenerateSlip() {
  const router = useRouter();

  // State Handling
  const [patients, setPatients] = React.useState(null)
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null)

  const genderItems = ['Male', 'Female', 'Other']

  const [getPatientsData, { loading: patientsDataLoading, data: patientsData, error: patientsDataError }] = useLazyQuery(GET_PATIENT_DATA_GENERAL, {fetchPolicy: 'network-only'})

  const handleSubmit = async(e) => {
    e.preventDefault()
    getPatientsData(
      {
        variables: {
          patientName: fullName != "" ? fullName : null,
          phoneNo: contact != "" ? parseFloat(contact) : null,
          gender: gender != "" ? gender : null,
          dateOfBirth: dob != "" ? dob : null,
          city: city != "" ? city : null,
          pincode: pincode != "" ? parseInt(pincode) : null
        }
      }
    )
  }

  React.useEffect(() => {
    if (!patientsDataLoading) {
      if (patientsDataError) {
        console.log(patientsDataError.message)
        setError("Error in fetching patients data!! Try again later.")
        return
      } else {
        if (patientsData) {
          var data = patientsData.fetchPatientGeneral
          setPatients(data)
          setError(null)
          return
        }
      }
    }
  }, [patientsDataLoading])

  const selectPatient = async(Id) => {
    var patient
    if (patients && patients.length > 0) {
      patient = patients.find(p => p.id === Id)
      setSelectedPatient(patient)
      setError(null)
    } else {
      setError("Error: Selected patient not found")
    }
  }

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

  const calculateAge = (dob) => { // birthday is a date
    var ageDifMs = Date.now() - (new Date(dob)).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const resetSelection = async() => {
    setSelectedPatient(null)
  }

  const resetValues = async() => {
    setPatients(null)
    setSelectedPatient(null)
    setFullName("");
    setGender("");
    setContact("");
    setCity("");
    setPincode("");
    setDob("");
    setError(null);
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const checkValueResponse = checkValues();

  //   if (checkValueResponse.status === true) {
  //     alert(checkValueResponse.msg);
  //   } else {
  //     await createPatient({
  //       variables: {
  //         patientName: fullName,
  //         dateOfBirth: dob,
  //         phoneNo: parseInt(contact),
  //         gender: gender,
  //         address: address1.concat(" ", address2),
  //         district: district,
  //         city: city,
  //         state: state,
  //         pincode: parseInt(pincode),
  //         encounterType: encounterTypesData.allEncounterType.find(en => en.encounterType === encounterType)?.id,
  //         existingAilments: ailments
  //       },
  //     });
  //     if (createPatientData) {
  //       console.log(createPatientData);
  //       alert('Data entered successfully')
  //       window.location.reload()
  //     } else if (createPatientError) {
  //       console.log(createPatientError instanceof Error);
  //     }
  //     //  const patient = await CreatePatient(body);
  //   }
  // }
  return (
    <>
    <Header backLabel={'Homepage'}/>
    {!selectedPatient ?
    <>
    <Container>
      <Button style={{marginLeft: 'auto'}} color="primary" onClick={() => router.push('/patient-registration')} className={styles.menuItems}>+ Register New Patient</Button>
    </Container>
    <Container className={styles.padding}>
      <Card>
        <Row>
          <Container className={styles.formTitle}>Search/Select Patient</Container>
        </Row>
        <Row>
          {/* Grid */}
          <form>
            <Grid.Container
              className={styles.padding}
              gap={2}
            >
              <Grid className={styles.Grid}>
                <Input
                  className={styles.fullNameInput}
                  rounded
                  bordered
                  label="Full Name"
                  placeholder="Full Name"
                  color="primary"
                  value={fullName}
                  onChange={(e) => {
                    const setFullNameState = e.target.value;
                    setFullName(setFullNameState);
                  }}
                />
              </Grid>

              <Grid className={styles.Grid}>
                <Input
                  className={styles.contactNoInput}
                  rounded
                  bordered
                  label="Contact Number"
                  placeholder="Contact Number"
                  color="primary"
                  value={contact}
                  onChange={(e) => {
                    const setContactState = e.target.value;
                    setContact(setContactState);
                  }}
                />
              </Grid>

              <Grid className={styles.Grid}>
                <DropdownCustom label={'Gender'} items={genderItems} handleChange={setGender} value={gender}/>
              </Grid>
              
              <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  type="date"
                  rounded
                  bordered
                  label="Date of Birth"
                  value={dob}
                  placeholder="DOB"
                  color="primary"
                  onChange={(e) => {
                    const setDobState = e.target.value;
                    setDob(setDobState);
                  }}
                />
              </Grid>
              <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  rounded
                  bordered
                  label="City"
                  placeholder="City"
                  color="primary"
                  value={city}
                  onChange={(e) => {
                    const setCityState = e.target.value;
                    setCity(setCityState);
                  }}
                />
              </Grid>
              <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  rounded
                  bordered
                  label="Pincode"
                  placeholder="Pincode"
                  color="primary"
                  value={pincode}
                  onChange={(e) => {
                    const setPincodeState = e.target.value;
                    setPincode(setPincodeState);
                  }}
                />
              </Grid>
              
              {/* <Grid className={styles.Grid}>
                <DropdownCustom label={'Reason for visit'} items={encounterTypes} handleChange={setEncounterType}/>
              </Grid> */}

              {/* <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  rounded
                  bordered
                  label="Existing Ailments"
                  placeholder="Existing Ailments"
                  color="primary"
                  onChange={(e) => {
                    const setAilmentState = e.target.value;
                    setAilment(setAilmentState);
                  }}
                />
              </Grid> */}
              
              
            </Grid.Container>
            {/* Dynamic Ailment */}
            {/* <Grid.Container>
              <Row>
                <Container className={styles.ailmentContainerTitle}>Existing Ailments, if any:</Container>
              </Row>
              <Container className={styles.ailmentsRowsContainer}>
              {ailments.map((ailment, index) => (
              <Row key={index}>
                  <Grid className={styles.Grid}>
                    <Input
                      className={styles.ailmentsInput}
                      rounded
                      bordered
                      label="Ailment"
                      placeholder="Ailment"
                      color="primary"
                      name="ailment"
                      value={ailment.ailment}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                  </Grid>
                  <Grid className={styles.Grid}>
                    <Input
                      className={styles.ailmentsInput}
                      rounded
                      bordered
                      label="Comment"
                      placeholder="Comment"
                      color="primary"
                      name="comment"
                      value={ailment.comment}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                  </Grid>

                  <Grid className={styles.Grid}>
                    <Button
                      css={{ my: "$12", mx: "$10", width: "50px" }}
                      shadow
                      color='warning'
                      size="sm"
                      onClick={() => handleRemoveField(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
              </Row>
            ))}
            </Container>
            </Grid.Container>
            <Button
              css={{ my: "$5", mx: "$12", width: "50px" }}
              shadow
              size="sm"
              onClick={() => handleAddField()}
            >Add Ailment</Button> */}

            {/*Dynamic Ailment End  */}
          </form>
          {/* Grid End */}
        </Row>
      </Card>
            <div>
              {error ? error : ''}
            </div>
      <Grid.Container gap={3} justify="center">
        <Grid>
        <Button
          color="success"
          auto
          type="submit"
          onClick={e => handleSubmit(e)}
        >
          Submit
        </Button>
        </Grid>
        <Grid>
        <Button
          color="warning"
          auto
          onClick={e => resetValues(e)}
        >
          Reset
        </Button>
        </Grid>
      </Grid.Container>
      
      <Container>
        <Table
          lined
          bordered
          sticked
          compact
          striped
          shadow={false}
          aria-label="Example static striped collection table"
        >
          <Table.Header>
            <Table.Column css={{textAlign: 'center'}}>Patient Name</Table.Column>
            <Table.Column css={{textAlign: 'center'}}>Phone No</Table.Column>
            <Table.Column css={{textAlign: 'center'}}>Gender</Table.Column>
            <Table.Column css={{textAlign: 'center'}}>Age</Table.Column>
          </Table.Header>
          <Table.Body>
            {patients ? patients.map((patient, i) => {
              console.log(patient)
              return(
                <Table.Row key={i}>
                  <Table.Cell css={{textAlign: 'center'}}>
                    <Container>
                      <Button className={styles.patientNameBtn} onClick={() => selectPatient(patient.id)}>{patient.patientName}</Button>
                    </Container>
                  </Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>{patient.phoneNo}</Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>{patient.gender}</Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>{patient.dateOfBirth ? calculateAge(patient.dateOfBirth) : '-'}</Table.Cell>
                </Table.Row>
              )
            }) : ''}
          </Table.Body>
        </Table>
      </Container>
    </Container>
    </>
    : ''}
    {selectedPatient ?
      <Container css={{marginTop: '20px'}}>
        <Row>
          Selected Patient:
        </Row>
        <PatientDataCard data={selectedPatient}/>
        <Grid.Container gap={3} justify="center">
          <Grid>
          <Button
            color="success"
            auto
            // onClick={e => handleSubmit(e)}
          >
            Generate Slip
          </Button>
          </Grid>
          <Grid>
          <Button
            color="warning"
            auto
            onClick={e => resetSelection(e)}
          >
            Back
          </Button>
          </Grid>
        </Grid.Container>
      </Container>
    : ''}
    </>
  );
}
