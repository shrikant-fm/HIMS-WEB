import React, { useState } from "react";
import { Container, Card, Row, Grid, Input, Button } from "@nextui-org/react";
import styles from "../styles/Patient.module.css";
import { useRouter } from "next/router";
import { GET_ENCOUNTER_TYPES, CREATE_NEW_PATIENT } from "../graphql/querys";
import { useMutation, useQuery } from "@apollo/client";
import DropdownCustom from "../components/Dropdown";
import Header from "../components/Header";

export default function PatientRegistration() {
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
  // const [ailments, setAilments] = useState([]);
  // const [encounterTypes, setEncounterTypes] = useState([]);
  // const [encounterType, setEncounterType] = useState('');

  const genderItems = ["Male", "Female", "Other"];

  const [
    createPatient,
    {
      loading: createPatientLoading,
      data: createPatientData,
      error: createPatientError,
    },
  ] = useMutation(CREATE_NEW_PATIENT);
  // const { loading: encounterTypesLoading, data: encounterTypesData, error: encounterTypesError } = useQuery(GET_ENCOUNTER_TYPES)

  // React.useEffect(() => {
  //   if (encounterTypesData) {
  //     var data = encounterTypesData.allEncounterType.map(en => {return(en.encounterType)})
  //     setEncounterTypes(data)
  //   }
  // }, [encounterTypesLoading])

  React.useEffect(() => {
    if (!createPatientLoading) {
      if (createPatientError) {
        console.log(createPatientError.message);
        alert("Error in creating patients data!! Try again later.");
        return;
      } else {
        if (createPatientData) {
          var data = createPatientData.fetchPatientGeneral;
          alert("Success");
          // setError(null)
          // redirect generate-slip
        }
      }
    }
  }, [createPatientLoading]);

  const checkValues = () => {
    if (fullName === "") {
      return { status: true, msg: "Please Enter Full Name" };
    } else if (
      contact === "" ||
      !/^[0-9]{10}(\s*,*,\s*[0-9]{10})*$/.test(parseInt(contact))
    ) {
      return { status: true, msg: "Please Enter Valid contact" };
    } else if (gender === "") {
      return { status: true, msg: "Please Select Gender" };
    } else if (dob === "") {
      return { status: true, msg: "Please Enter Date Of Birth" };
    } else if (state === "") {
      return { status: true, msg: "Please Enter state" };
    } else if (city === "") {
      return { status: true, msg: "Please Enter City" };
    } else if (
      pincode === "" ||
      !/^[0-9]{6}(\s*,*,\s*[0-9]{6})*$/.test(parseInt(pincode))
    ) {
      return { status: true, msg: "Please Enter valid pincode" };
    } else {
      return { status: false };
    }
  };

  //   checkPinCode = val => {
  //     return (/^[0-9]{6}(\s*,*,\s*[0-9]{6})*$/.test(parseInt(val)))
  // }

  // const handleChangeInput = (index, event) => {
  //   const values = [...ailments];
  //   values[index][event.target.name] = event.target.value;
  //   setAilments(values);
  // };

  // const handleAddField = () => {
  //   setAilments([...ailments, { ailment: "", comment: "" }]);
  // };

  // const handleRemoveField = (index) => {
  //   const values = [...ailments];
  //   console.log(values)
  //   values.splice(index, 1);
  //   setAilments(values);
  // };

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
          // address: address1.concat(" ", address2),
          addressLine1: address1,
          addressLine2: address2,
          district: district,
          city: city,
          state: state,
          pincode: parseInt(pincode),
          // encounterType: encounterTypesData.allEncounterType.find(en => en.encounterType === encounterType)?.id,
          // existingAilments: ailments
        },
      });
      // if (createPatientData) {
      //   console.log(createPatientData);
      //   alert('Data entered successfully')
      //   // window.location.reload()
      //   router.push('/generate-slip')
      // } else if (createPatientError) {
      //   console.log(createPatientError instanceof Error);
      // }
      //  const patient = await CreatePatient(body);
    }
  }
  return (
    <>
      <Header />
      <Container className={styles.padding}>
        <Card css={{ padding: "30px 0" }}>
          <Row>
            <Container className={styles.formTitle}>
              Patient Information
            </Container>
          </Row>
          <Row>
            {/* Grid */}
            <form>
              <Grid.Container className={styles.padding} gap={2}>
                <Grid className={styles.Grid}>
                  <Input
                    className={styles.fullNameInput}
                    rounded
                    bordered
                    label="Full Name *"
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
                    className={styles.contactNoInput}
                    rounded
                    bordered
                    label="Contact Number *"
                    placeholder="Contact Number"
                    color="primary"
                    onChange={(e) => {
                      const setContactState = e.target.value;
                      setContact(setContactState);
                    }}
                  />
                </Grid>

                <Grid className={styles.Grid}>
                  <DropdownCustom
                    label={"Gender *"}
                    items={genderItems}
                    value={gender}
                    handleChange={setGender}
                  />
                </Grid>

                <Grid className={styles.Grid}>
                  <Input
                    className={styles.dobInput}
                    type="date"
                    rounded
                    bordered
                    label="Date of Birth *"
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
                    className={styles.pincodeInput}
                    rounded
                    bordered
                    label="Pincode *"
                    placeholder="Pincode"
                    color="primary"
                    onChange={(e) => {
                      const setPincodeState = e.target.value;
                      setPincode(setPincodeState);
                    }}
                  />
                </Grid>
                <Row>
                  <Grid.Container gap={3}>
                    <Grid className={styles.Grid}>
                      <Input
                        className={styles.addressInput}
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
                    <Grid className={styles.Grid}>
                      <Input
                        className={styles.addressInput}
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
                  </Grid.Container>
                </Row>
                <Grid className={styles.Grid}>
                  <Input
                    className={styles.cityInput}
                    rounded
                    bordered
                    label="City *"
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
                    className={styles.districtInput}
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
                    className={styles.stateInput}
                    rounded
                    bordered
                    label="State *"
                    placeholder="State"
                    color="primary"
                    onChange={(e) => {
                      const setStateName = e.target.value;
                      setState(setStateName);
                    }}
                  />
                </Grid>

                {/* <Grid>
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
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
}
