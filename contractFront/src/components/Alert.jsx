import React from 'react'
import {
  Alert,
  AlertIcon,
  
  AlertDescription,
} from '@chakra-ui/react'

 export const AlertError = ({error}) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  );
}
export const AlertSucess = () => {
    return (
      <Alert status="success">
        <AlertIcon />
        Data uploaded to the server. Fire on!
      </Alert>
    );
}

