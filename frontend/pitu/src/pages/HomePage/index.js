import React, { useState, useRef } from 'react';
import {Container, InputGroup, FormControl, Button, Alert, Spinner} from 'react-bootstrap';
import Header from '../../components/Header';
import {ContentContainer, Form} from './styles';
import service from '../../services/service';

function HomePage(){

    const input = useRef();
    

    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shortnedURL,setShortnedURL] = useState('');
    const [messageError, setMessageError] = useState('');

    async function handleSubmit (event) {
       event.preventDefault();
      
       setIsLoading(true);
       setMessageError('');

      if (!url || url === ''){
         setMessageError('Informe uma URL');
      } 
      else {
        try {  
          const result = await service.generate({url});   
          console.log('==> '+JSON.stringify(result));
          const {code} = result;
          setShortnedURL( code );
        } catch (error){
            setMessageError('Ops, ocorreu um erro.');  
        }  
      }

       setIsLoading(false);
    }


    function copyToClipBoard(){
        input.current.select();
        document.execCommand('copy');
    }



    return (
        <Container>
            <Header>Seu novo encurtador de URL. :)</Header>
            <ContentContainer>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                       <FormControl placeholder="Digite a url para encurtamento" 
                                    defaultValue=""
                                    onChange={e => setUrl(e.target.value)}/>

                       <InputGroup.Append>
                         <Button variant="primary" type="submit">Encurtar link</Button>
                       </InputGroup.Append>


                    </InputGroup>
                
                {
                   isLoading && <Spinner animation="border"/>
                }

                { shortnedURL && shortnedURL !== '' &&
                     <>
                       <InputGroup className="mb-3">
                        <FormControl autoFocus={true}
                                    defaultValue={`https://pitu.tk/${shortnedURL}`}
                                    onChange={e => setUrl(e.target.value)}
                                    ref={input}/>

                        <InputGroup.Append>
                          <Button variant="outline-secondary" onClick={()=> copyToClipBoard()}>Copiar</Button>
                        </InputGroup.Append>
                       </InputGroup>
                       <p>Para acompanhar as estatísticas, acesse https://pitu.tk/{shortnedURL}</p>
                     </>
                }


                { messageError && 
                       <Alert variant="danger">{messageError}</Alert>
                }
                </Form>
            </ContentContainer>
        </Container>
    )
}
export default HomePage;