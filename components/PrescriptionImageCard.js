import React,{useState} from "react";
import { Card } from "@nextui-org/react";



export const PrescriptionImageCard = ({ data }) => {
  
  const[image, setImage] = useState(data);

  React.useEffect(() => {
    setImage(data)
  }, [data])

  // const handleSearch = async () => {
  //   if(encounterId) {
  //      await getEncouterData({ 
  //         variables : {
  //           encounterId: parseInt(encounterId)
  //         }
  //       })
  //   } else
  //     alert("Plese Enter Encounter ID")
  // } 

  // useEffect(() => {
  //   if (!ImageDataLoading) {
  //     if (ImageDataError) {
  //       console.log(ImageDataError.message)
  //       setError("Error in fetching Prescription Image!! Try again later.")
  //       // return 
  //     } else {
  //       if(ImageData) {
  //         setImage(ImageData.prescriptions.data.attributes.imagePath)
  //         console.log(ImageData)
  //       }
  //     }
  //   }
  // }, [ImageDataLoading]);
 return (
  <Card css={{ w: "100%", h: "400px",  minWidth: "350px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={`http://localhost:1337${data.imagePath}`}
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
  
  </Card>
 )
};
