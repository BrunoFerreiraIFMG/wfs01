import React, { useEffect, useState } from 'react';

import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {StatsContainer} from './styles';
import Header from '../../components/Header';
import ServiceAPI from '../../services/service';
import { useParams } from 'react-router-dom';




function RedirectPage(){

    const service = ServiceAPI();

    const [messageError, setMessageError] = useState('');

    const { code } = useParams();

    useEffect(()=>{

        const consulta = async (id) => {

            const result = await service.getLink(id);

            if (result && result.url)
              window.location = result.url;
            else
              setMessageError('Link não encontrado');
        }

      //  setIsLoading(true);

       // try {
        consulta(code);
      //  console.log(shortnedURL.url);
       // if (shortnedURL.url)
       //  window.location = shortnedURL.url;
        // window.location.href = '/signin';
       // }catch(error){
       //    setMessageError('Ops, a url solicitada não existe.');
       /// }
        
      //  setIsLoading(true);
    }, []);

    return (

        <Container>

          {messageError !== '' ?
           (<>
             <Header>Seu novo encurtador de urls. :)</Header>
             <StatsContainer className="text-center">
               <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle"/>
                  <p className="m-3">{messageError}</p>
                  <a className="btn btn-primary" href="/">Encurtar nova URL</a>
             </StatsContainer>
            </>)
            :
            (<Header>Redirecionando...</Header>)
          }

        </Container>
        
    )
}
export default RedirectPage;
