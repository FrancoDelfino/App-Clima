import { Container} from "@mui/material";

import Title from "./components/Title";
import Form from "./components/Form";
import CopyRight from "./components/CopyRight";




export default function App() {

  

  


  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 2 }}
    >
           <Title />
           <Form />     
           <CopyRight />
                
    </Container>
  )
} 