import React from "react";
import { useState } from "react";
import { Grid, Card, Container, Input, Button, Row } from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { GET_PATIENT_DATA } from "../graphql/querys";
import styles from "../styles/Upload.module.css"
import Header from "../components/Header";

export default function Upload(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [phoneNo, setPhoneNo] = useState('');
  const [patientData, setPatientData] = useState(null);

  const getPatientData = async() => {
    refetch();
  }
  const emulateFetch = _ => {
    return new Promise(resolve => {
      resolve([{ data: "ok" }]);
    });
  };

  const { loading: patientDataLoading, data, error: patientDataError, refetch } = useQuery(GET_PATIENT_DATA,
    {variables: {phoneNo: parseFloat(phoneNo)}},
    emulateFetch,
    {
      refetchOnWindowFocus: false,
      enabled: false // disable this query from automatically running
    }
  )

  // TO DISPLAY IMAGE ON USER-2 PAGE ITSELF

  // const uploadToClient = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const i = event.target.files[0];

  //     setImage(i);
  //     setCreateObjectURL(URL.createObjectURL(i));
  //   }
  // };
  
  React.useEffect(() => {
    if (data && data.fetchPatientByPhoneNo) {
      setPatientData(data.fetchPatientByPhoneNo)
    } else {
      setPatientData(null)
    }
  }, [data])

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    console.log(body)
    const response = await fetch("/api/", {
      method: "POST",
      body,
    });
  };

  return (
    <>
    <Header/>
    <Container className={styles.root}>
      <Card>
        <Card.Body>
          <Grid.Container css={{ my: 4 }} gap={2} justify="space-between">
            <Row>
              <Container className={styles.formTitle}>Upload Prescription</Container>
            </Row>
            <Grid xs={4}>
              <Input clearable bordered label="Phone number" color="primary" placeholder="Enter phone number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
            </Grid>
            {/* <Grid xs={4}>
              <Button color="primary" auto ghost onClick={getPatientData}>
                Search
              </Button>
            </Grid> */}
          </Grid.Container>
          <Grid.Container gap={2} justify="space-between">
            <Grid xs={4}>
              <Input
                name="fname"
                readOnly
                color="primary"
                value={patientData ? patientData.patientName : '-'}
                label="Full Name"
              />
            </Grid>
            <Grid xs={4}>
              <Input
                name="gender"
                readOnly
                color="primary"
                value={patientData ? patientData.gender : '-'}
                label="Gender"
              />
            </Grid>
            <Grid xs={4}>
              <Input
                name="state"
                readOnly
                color="primary"
                value={patientData ? patientData.state : '-'}
                label="State"
              />
            </Grid>
            <Grid xs={4}>
              <Input
                name="district"
                readOnly
                color="primary"
                value={patientData ? patientData.district : '-'}
                label="District"
              />
            </Grid>
            <Grid xs={4}>
              <Input
                name="city"
                readOnly
                color="primary"
                value={patientData ? patientData.city : '-'}
                label="City"
              />
            </Grid>
            <Grid xs={4}>
              <Input
                name="pincode"
                readOnly
                color="primary"
                value={patientData ? patientData.pincode : '-'}
                label="Pincode"
              />
            </Grid>
          {patientData ? 
          <Row>
            <Grid xs={6}>
              <input type="file" name="myImage"  />
            </Grid>
            <Grid xs={6}>
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
          </Row> : ''}
          </Grid.Container>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}
