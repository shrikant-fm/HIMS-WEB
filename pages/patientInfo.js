import React, { useState } from "react";
import { Container, Card, Row, Grid, Input, Button } from "@nextui-org/react";
import styles from "../styles/Patient.module.css";
import { useRouter } from "next/router";

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
  const [ailment, setAilment] = useState("");
  const [dob, setDob] = useState("");
  const [inputFields, setInputFields] = useState([
    {
      ailment: '', comment: ''
    },
  ]);

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
    } else if (ailment === "") {
      return { status: true, msg: "Please Enter existing ailment" };
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

  const handleChangeInput = (index, event) =>{
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  }

  const handleAddField = () => {
    setInputFields([...inputFields,{ailment:'',comment:''}])
  }

  const handleRemoveField = (index) => {
    const values = [inputFields];
    values.splice(index,1);
    setInputFields(values);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const checkValueResponse = checkValues();

    if (checkValueResponse.status === true) {
      alert(checkValueResponse.msg);
    } else {
      router.push('/Upload')
    }
  }

  return (
    <Container className={styles.padding}>
      <Card>
        <Row>
          {/* Grid */}
          <form>
            <Grid.Container className={styles.padding} gap={2} justify="space-between">
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
                  label="Gender"
                  placeholder="Gender"
                  color="primary"
                  onChange={(e) => {
                    const setGenderState = e.target.value;
                    setGender(setGenderState);
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

              </Grid.Container>
            {/* Dynamic Ailment */}

              
                  { inputFields.map((inputField, index) =>(
                    
                    <div key={index}>
                  <Grid.Container className={styles.ailmentPadding} justify="space-between">
                    
                  <Grid className={styles.Grid}>
                      <Button 
                      css={{ my:"$12",mx:"$10",width:"50px"}} 
                      shadow color="gradient" 
                      size="sm"
                      onClick={() => handleAddField()}
                      >
                        Add Ailment
                      </Button>
                      </Grid>
                    
                    <Grid className={styles.Grid}>

                      <Input
                      className={styles.Input}
                       
                       rounded
                       bordered
                       label="Ailment"
                       placeholder="Ailment"
                       color="primary"
                       name="ailment"
                       value={inputField.ailment}
                        onChange={event => handleChangeInput(index,event)}
                      />
                      </Grid>
                      <Grid className={styles.Grid}>
                      <Input
                      className={styles.Input }
                      
                       rounded
                       bordered
                       label="Comment"
                       placeholder="Comment"
                       color="primary"
                       name="comment"
                       value={inputField.comment}
                       onChange={event => handleChangeInput(index,event)}
                      />
                      </Grid>
                     
                      <Grid className={styles.Grid}>
                      <Button 
                      css={{ my:"$12",mx:"$10",width:"50px"}}
                       shadow color="gradient" 
                       size="sm"
                       onClick={() => handleRemoveField(index)}
                       >
                        Remove
                      </Button>
                      </Grid>
                      </Grid.Container>

                    </div>
                    
                  ) )}
                   
              
                  
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
