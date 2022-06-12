import { Button, Container, Card, Row, Text, Grid } from '@nextui-org/react'
import styles from '../styles/Component-Dropdown.module.css'
import { useRouter } from 'next/router'
import React from 'react'

export default function PatientDataCard({ data }) {
    
    const [patientData, setPatientData] = React.useState(data)
    
    React.useEffect(() => {
        setPatientData(data)
    }, [data])

    return (
    <Container css={{marginTop: '20px'}}>
        <Card>
            <Grid.Container gap={2}>
                <Grid>
                    <Text size='90%'>Patient Name</Text>
                    <Text b>{patientData.patientName}</Text>
                </Grid>
                <Grid>
                    <Text size='90%'>Gender</Text>
                    <Text b>{patientData.gender}</Text>
                </Grid>
                <Grid>
                    <Text size='90%'>Phone No</Text>
                    <Text b>{patientData.phoneNo}</Text>
                </Grid>
                <Grid>
                    <Text size='90%'>City</Text>
                    <Text b>{patientData.city}</Text>
                </Grid>
            </Grid.Container>
        </Card>
    </Container>
  )
}
