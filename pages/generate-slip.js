import React, { useState } from "react";
import { Container, Card, Row, Grid, Input, Button, Table } from "@nextui-org/react";
import styles from "../styles/generate-slip.module.css";
import { useRouter } from "next/router";
import { GET_PATIENT_DATA_FILTERED, CREATE_PATIENT_ENCOUNTER, GET_ENCOUNTER_TYPES } from "../graphql/strapi-query";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
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
  const [encounterTypes, setEncounterTypes] = useState([]);
  const [selectedEncounterType, setSelectedEncounterType] = useState(null)
  const [getEncounterTypeText, setGetEncounterTypeText] = useState(null)
  const [encounterTypeText, setEncounterTypeText] = useState(null)
  const [primaryComplaint, setPrimaryComplaint] = useState(null)
  const [secondaryComplaint, setSecondaryComplaint] = useState(null)

  const genderItems = [{text: 'Male', value: 'Male'}, {text: 'Female', value: 'Female'}, {text: 'Other', value: 'Other'}]

  const [getPatientsData, { loading: patientsDataLoading, data: patientsData, error: patientsDataError }] = useLazyQuery(GET_PATIENT_DATA_FILTERED, {fetchPolicy: 'network-only'})
  const [createEncounter, { loading: createEncounterLoading, data: createEncounterData, error: createEncounterError }] = useMutation(CREATE_PATIENT_ENCOUNTER);
  const { loading: encounterTypesLoading, data: encounterTypesData, error: encounterTypesError } = useQuery(GET_ENCOUNTER_TYPES)

  React.useEffect(() => {
    if (encounterTypesData) {
      var data = encounterTypesData.encounterCatalogs.data.map(en => {return({
        value: en.id,
        text: en.attributes.encounterType
      })})
      setEncounterTypes(data)
    }
  }, [encounterTypesLoading])

  React.useEffect(() => {
    if (selectedEncounterType) {
      if (encounterTypes.find(e => e.value == selectedEncounterType)?.text == "Other") {
        setGetEncounterTypeText(true)
      } else {
        setGetEncounterTypeText(false)
      }
    } else {
      setGetEncounterTypeText(false)
    }
  }, [selectedEncounterType])

  const handleSubmit = async(e) => {
    e.preventDefault()
    // getPatientsData(
    //   {
    //     variables: {
    //       patientName: fullName != "" ? fullName : null,
    //       phoneNo: contact != "" ? parseFloat(contact) : null,
    //       gender: gender != "" ? gender : null,
    //       dateOfBirth: dob != "" ? dob : null,
    //       city: city != "" ? city : null,
    //       pincode: pincode != "" ? parseInt(pincode) : null
    //     }
    //   }
    // )
    // creating filters for the query
    var filterArray = []
    if (fullName && !fullName == "") {
      filterArray.push({ patientName: { containsi: fullName } })
    }
    if (gender && !gender == "") {
      filterArray.push({ gender: { eq: gender } })
    }
    if (contact && !contact == "") {
      filterArray.push({ phoneNo: { eq: parseInt(contact) } })
    }
    if (city && !city == "") {
      filterArray.push({ city: { containsi: city } })
    }
    if (pincode && !pincode == "") {
      filterArray.push({ pincode: { eq: parseInt(pincode) } })
    }
    if (dob && !dob == "") {
      filterArray.push({ dateOfBirth: { eq: dob } })
    }
    getPatientsData({
      variables: {
        filter: filterArray
      }
    })
  }

  const handleGenerateSlip = async(e) => {
    e.preventDefault()
    if (!selectedEncounterType || selectedEncounterType == "") {
      alert("Choose reason for visit")
      return
    }
    if (getEncounterTypeText && encounterTypeText == null) {
      alert('Enter reason to visit')
      return
    }
    await createEncounter({
      variables: {
        patientId: parseInt(selectedPatient.id),
        encounterTypeId: parseInt(selectedEncounterType),
        encounterTypeText: encounterTypeText,
        primaryComplaint: primaryComplaint,
        secondaryComplaint: secondaryComplaint
      },
    });
  }

  React.useEffect(() => {
    if (!patientsDataLoading) {
      if (patientsDataError) {
        console.log(patientsDataError.message)
        setError("Error in fetching patients data!! Try again later.")
        return
      } else {
        if (patientsData) {
          var data = patientsData.patientCatalogs.data
          setPatients(data)
          setError(null)
          return
        }
      }
    }
  }, [patientsDataLoading])

  React.useEffect(() => {
    if (!createEncounterLoading) {
      if (createEncounterError) {
        console.log(createEncounterError.message)
        setError("Error in generating slip!! Try again later.")
        return
      } else {
        if (createEncounterData) {
          console.log(createEncounterData)
          setError(null)
          alert("Slip generated successfully. Encounter id: " + createEncounterData.createPatientEncounter.data.id)
          window.location.reload()
        }
      }
    }
  }, [createEncounterLoading])

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
    setEncounterTypeText(null)
    setSelectedEncounterType(null)
    setPrimaryComplaint(null)
    setSecondaryComplaint(null)
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
    <Container className={styles.padding}>
      <Card css={{padding: '30px 0'}}>
        <Row>
          <Container className={styles.formTitle}>Search/Select Patient</Container>
        </Row>
        <Row>
          {/* Grid */}
          <form>
            <Grid.Container
              className={styles.padding}
              gap={3}
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
              return(
                <Table.Row key={i}>
                  <Table.Cell css={{textAlign: 'center'}}>
                    <Container>
                      <Button className={styles.patientNameBtn} onClick={() => selectPatient(patient.id)}>{patient.attributes.patientName}</Button>
                    </Container>
                  </Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>{patient.attributes.phoneNo}</Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>{patient.attributes.gender}</Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>{patient.attributes.dateOfBirth ? calculateAge(patient.attributes.dateOfBirth) : '-'}</Table.Cell>
                </Table.Row>
              )
            }) :
              <Table.Row>
                <Table.Cell css={{textAlign: 'center'}}>No Patient data found</Table.Cell>
                <Table.Cell css={{textAlign: 'center'}}></Table.Cell>
                <Table.Cell css={{textAlign: 'center'}}></Table.Cell>
                <Table.Cell css={{textAlign: 'center'}}></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>
        <Container>
          <Button style={{marginTop: '20px'}} color="primary" onClick={() => router.push('/patient-registration')} className={styles.menuItems}>+ Register New Patient</Button>
        </Container>
      </Container>
    </Container>
    </>
    : ''}
    {selectedPatient ?
      <Container css={{marginTop: '20px'}}>
        <Row>
          Selected Patient:
        </Row>
        <PatientDataCard data={selectedPatient.attributes}/>
        <Container css={{marginTop: '20px'}}>
          <Grid.Container gap={2}>
            <Grid>
              <DropdownCustom label={'Reason for visit'} items={encounterTypes} value={selectedEncounterType} handleChange={setSelectedEncounterType}/>
            </Grid>
            {getEncounterTypeText ?
            <Grid>
              <Input
                className={styles.enctrTypeTextInput}
                rounded
                bordered
                placeholder="Enter reason"
                color="primary"
                value={encounterTypeText}
                onChange={(e) => {
                  setEncounterTypeText(e.target.value);
                }}
              />
            </Grid>
            : ''}
            <Row>
            <Grid>
              <Input
                className={styles.pComplaintInput}
                rounded
                bordered
                label="Primary complaint"
                placeholder="Primary complaint"
                color="primary"
                value={primaryComplaint}
                onChange={(e) => {
                  setPrimaryComplaint(e.target.value);
                }}
              />
            </Grid>
            <Grid>
              <Input
                className={styles.sComplaintInput}
                rounded
                bordered
                label="Secondary complaint"
                placeholder="Secondary complaint"
                color="primary"
                value={secondaryComplaint}
                onChange={(e) => {
                  setSecondaryComplaint(e.target.value);
                }}
              />
            </Grid>
          </Row>
        </Grid.Container>
        </Container>
        <Grid.Container gap={3} justify="center">
          <Grid>
          <Button
            color="success"
            auto
            onClick={e => handleGenerateSlip(e)}
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
