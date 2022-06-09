import React, { useState } from "react";
import { Container, Card, Row, Grid, Input, Button } from "@nextui-org/react";
import styles from "../styles/Patient.module.css";
import { useRouter } from "next/router";
import { GET_ENCOUNTER_TYPES, NEW_PATIENT } from "../graphql/querys";
import {useMutation, useQuery } from "@apollo/client";
import DropdownCustom from "../components/Dropdown";

export default function PatientInfo() {
  const router = useRouter();

  // State Handling
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [contact, setContact] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState("");
  const [ailments, setAilments] = useState([]);
  const [encounterTypes, setEncounterTypes] = useState([]);
  const [encounterType, setEncounterType] = useState('');
  
  const genderItems = ['Male', 'Female', 'Other']
  
  const [createPatient, { data: createPatientData, error: createPatientError }] = useMutation(NEW_PATIENT);
  const { loading: encounterTypesLoading, data: encounterTypesData, error: encounterTypesError } = useQuery(GET_ENCOUNTER_TYPES)


  React.useEffect(() => {
    if (encounterTypesData) {
      var data = encounterTypesData.allEncounterType.map(en => {return(en.encounterType)})
      setEncounterTypes(data)
    }
  }, [encounterTypesLoading])

  const checkValues = () => {
    if (fullName === "") {
      return { status: true, msg: "Please Enter Full Name" };
    } else if (gender === "") {
      return { status: true, msg: "Please Select Gender" };
    } else if (contact === "") {
      return { status: true, msg: "Please Enter contact" };
    } else if (state === "") {
      return { status: true, msg: "Please Enter state" };
    } else if (district === "") {
      return { status: true, msg: "Please Enter district" };
    } else if (city === "") {
      return { status: true, msg: "Please Enter City" };
    } else if (pincode === "") {
      return { status: true, msg: "Please Enter pincode" };
    } else if (address1 === "") {
      return { status: true, msg: "Please Enter address line 1" };
    } else if (address2 === "") {
      return { status: true, msg: "Please Enter address line 2" };
    } else if (dob === "") {
      return { status: true, msg: "Please Enter Date Of Birth" };
    } else {
      return { status: false };
    }
  };

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

  async function handleSubmit(e) {
    e.preventDefault();
    const checkValueResponse = checkValues();

    if (checkValueResponse.status === true) {
      alert(checkValueResponse.msg);
    } else {
      await createPatient({
        variables: {
          patientName: fullName,
          dateOfBirth: dob,
          phoneNo: parseInt(contact),
          gender: gender,
          address: address1.concat(" ", address2),
          district: district,
          city: city,
          state: state,
          pincode: parseInt(pincode),
          encounterType: encounterTypesData.allEncounterType.find(en => en.encounterType === encounterType)?.id,
          existingAilments: ailments
        },
      });
      if (createPatientData) {
        console.log(createPatientData);
        alert('Data entered successfully')
        window.location.reload()
      } else if (createPatientError) {
        console.log(createPatientError instanceof Error);
      }
      //  const patient = await CreatePatient(body);
    }
  }
  return (
    <Container className={styles.padding}>
      <Card>
        <Row>
          <Container className={styles.formTitle}>Patient Information</Container>
        </Row>
        <Row>
          {/* Grid */}
          <form>
            <Grid.Container
              className={styles.padding}
              gap={2}
              justify="space-between"
            >
              <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  rounded
                  bordered
                  label="Full Name"
                  placeholder="Full Name"
                  color="primary"
                  onChange={(e) => {
                    const setFullNameState = e.target.value;
                    setFullName(setFullNameState);
                  }}
                />
              </Grid>

              <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  rounded
                  bordered
                  label="Contact Number"
                  placeholder="Contact Number"
                  color="primary"
                  onChange={(e) => {
                    const setContactState = e.target.value;
                    setContact(setContactState);
                  }}
                />
              </Grid>

              <Grid className={styles.Grid}>
                <DropdownCustom label={'Gender'} items={genderItems} handleChange={setGender}/>
              </Grid>
              
              <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  type="date"
                  rounded
                  bordered
                  label="Date of Birth"
                  placeholder="DOB"
                  color="primary"
                  onChange={(e) => {
                    const setDobState = e.target.value;
                    setDob(setDobState);
                  }}
                />
              </Grid>

              <Grid className={styles.address}>
                <Input
                  width="535px"
                  rounded
                  bordered
                  label="Address Line-1"
                  placeholder="Address Line-1"
                  color="primary"
                  onChange={(e) => {
                    const setFirstAddress = e.target.value;
                    setAddress1(setFirstAddress);
                  }}
                />
              </Grid>
              <Grid className={styles.address}>
                <Input
                  width="535px"
                  rounded
                  bordered
                  label="Address Line-2"
                  placeholder="Address Line-2"
                  color="primary"
                  onChange={(e) => {
                    const setSecondAddress = e.target.value;
                    setAddress2(setSecondAddress);
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
                  label="District"
                  placeholder="District"
                  color="primary"
                  onChange={(e) => {
                    const setDistrictState = e.target.value;
                    setDistrict(setDistrictState);
                  }}
                />
              </Grid>
              
              <Grid className={styles.Grid}>
                <Input
                  className={styles.Input}
                  rounded
                  bordered
                  label="State"
                  placeholder="State"
                  color="primary"
                  onChange={(e) => {
                    const setStateName = e.target.value;
                    setState(setStateName);
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
                  onChange={(e) => {
                    const setPincodeState = e.target.value;
                    setPincode(setPincodeState);
                  }}
                />
              </Grid>
              
              <Grid className={styles.Grid}>
                <DropdownCustom label={'Reason for visit'} items={encounterTypes} handleChange={setEncounterType}/>
              </Grid>

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
            <Grid.Container>
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
            >Add Ailment</Button>

            {/*Dynamic Ailment End  */}
          </form>
          {/* Grid End */}
        </Row>
      </Card>

      <div className={styles.container}>
        <Button
          size="xl"
          color="success"
          auto
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}
