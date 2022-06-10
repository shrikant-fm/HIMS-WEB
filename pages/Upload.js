import React from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Grid, Card, Container, Input, Button } from "@nextui-org/react";

export default function Upload(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  // TO DISPLAY IMAGE ON USER-2 PAGE ITSELF

  // const uploadToClient = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const i = event.target.files[0];

  //     setImage(i);
  //     setCreateObjectURL(URL.createObjectURL(i));
  //   }
  // };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/", {
      method: "POST",
      body,
    });
  };

  return (
    <Container css={{ width: 800 }}>
      <Card>
        <Card.Body>
          <Grid.Container css={{ my: 4 }} gap={2} justify="space-between">
            <Grid xs={4}>
              <Input clearable bordered labelPlaceholder="Enter Contact" />
            </Grid>
            <Grid xs={4}>
              <Button color="primary" auto ghost>
                Search
              </Button>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={2} justify="space-between">
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="fname"
                readOnly
                placeholder="Primary"
                initialValue="Full Name"
                label="Full Name"

              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="gender"
                readOnly
                placeholder="Primary"
                initialValue="Gender"
                label="Gender"
              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="state"
                readOnly
                placeholder="Primary"
                initialValue="State"
                label="State"
              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="district"
                readOnly
                placeholder="Primary"
                initialValue="District"
                label="District"
              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="city"
                readOnly
                placeholder="Primary"
                initialValue="City"
                label="City"
              />
            </Grid>
            <Grid xs={6} sm={6} lg={4} xl={4}>
              <Input
                name="pincode"
                readOnly
                placeholder="Primary"
                initialValue="Pincode"
                label="Pincode"
              />
            </Grid>

            <Grid xs={6} sm={6} lg={4} xl={4}>
              <input type="file" name="myImage"  />
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
        </Card.Body>
      </Card>
    </Container>
  );
}
