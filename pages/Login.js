import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { Card, Input, Button, Text, Row } from "@nextui-org/react";
import { LOGIN } from "../graphql/strapi-query";
import { useMutation } from "@apollo/client";

export default function Login() {
  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  

  const [
    getLoginData,
    {
      loading: loginTypesLoading,
      data: loginTypesData,
      error: loginTypesError,
    },
  ] = useMutation(LOGIN);

 

  const handleClick = async () => {
    if (userName) {
      if (passWord) {
        const loginData= await getLoginData({
          variables: {
            email: userName,
            password: passWord,
          },
          
        });
      localStorage.setItem('token',loginData.data.login.jwt);
      } else {
        alert("Please Enter Password");
      }
    } else {
      alert("Please Enter Username");
    }
  };

  React.useEffect(() => {
    if (!loginTypesLoading) {
      if (loginTypesError) {
        console.log(loginTypesError.message);
        alert("Error while login!! Try again later.");
        window.location.reload()
        // return
      } else {
        if (loginTypesData) {

          alert("Login Successfull");
          router.push("/");
        }
      }
    }
  }, [loginTypesLoading]);

  return (
    <div>
      <main className={styles.main}>
        <Card
          isHoverable
          variant="bordered"
          css={{ mw: "400px", padding: "30px 0" }}
          xs={12}
        >
          <Card.Header>
            <Row justify="center">
              <Text h2 color="primary" weight="bold">
                Login
              </Text>
            </Row>
          </Card.Header>
          <Card.Body>
            <Input
              css={{ margin: "20px " }}
              clearable
              underlined
              labelPlaceholder="Username"
              
              onChange={(e) => {
                const setUsernameState = e.target.value;
                setUsername(setUsernameState);
              }}
            />

            <Input.Password
              css={{ margin: "20px " }}
              clearable
              underlined
              labelPlaceholder="Password"
              
              onChange={(e) => {
                const setPasswordState = e.target.value;
                setPassword(setPasswordState);
              }}
            />

            <Button
              css={{ margin: "50px" }}
              size="md"
              color="primary"
              onClick={handleClick}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
      </main>
    </div>
  );
}
