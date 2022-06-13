import React from 'react'
import {useMutation} from '@apollo/client'
import { UPLOAD_FILE } from '../graphql/querys'
import { Button } from '@nextui-org/react';

export default function ImageUpload() {
    const [ uploadFile ] = useMutation( UPLOAD_FILE , {
        onCompleted: data=>console.log(data)
    });

const handleFileChange = e =>  {
    const file = e.target.files[0];
    if(!file)
    return ;
    uploadFile( { variables: { file } } )
}
const handleSubmit = () => {
    alert("submited");
}
  return (
    <div>
      <h1>Upload File</h1>
      <input type='file' onChange={ handleFileChange } />
      <Button
          size="sm"
          color="primary"
          type="submit"
          onClick={handleSubmit}
         css={{mt:20}}
         >
          Submit file
        </Button>
    </div>
  )
}
