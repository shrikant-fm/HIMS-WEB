import React, {useState} from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { Card, Input, Button, Text, Row } from "@nextui-org/react";

export default function Login() {
  const router = useRouter();

  const[userName, setUsername] = useState("");
  const[passWord,setPassword] = useState("");

  const checkValues = () =>{
    if (userName === "") {
      return { status: true, msg: "Please Enter Username" };
    }else  if (passWord === "") {
      return { status: true, msg: "Please Enter Password" };
    }else {
      return { status: false };
    }
  }

  const handleClick =(e) => {
    e.preventDefault();
    const checkValueResponse = checkValues();

    if (checkValueResponse.status === true) {
      alert(checkValueResponse.msg);
    }else{
      console.log(" Success ");
      router.push('/');
    }
    
  };

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
              <Text
                h2
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
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

            <Button css={{margin:"50px"}} size="md"  color="primary" onClick={handleClick} >
              Submit
            </Button>
          </Card.Body>
        </Card>
      </main>
    </div>
  );
}
