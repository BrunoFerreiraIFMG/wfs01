import React, { useEffect, useState } from 'react';

import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {StatsContainer, StatsRow,StatsBox,StatsBoxTitle} from './styles';
import Header from '../../components/Header';
//import service from '../../services/service';
import ServiceAPI from '../../services/service';

import {parseISO, formatRelative} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useParams } from 'react-router-dom';
import vars from '../../configs/vars';

function StatsPage(props){

    const service = ServiceAPI();

    const [isLoading, setIsLoading] = useState(false);
    const [shortnedURL,setShortnedURL] = useState({});
    const [messageError, setMessageError] = useState('');
    //const [relativeDate, setRelativeDate] = useState();

    const {code} = useParams();

    useEffect(()=>{

        const consulta =  async (codigo) => {            
            setIsLoading(true);
            const result = await service.getStats(codigo);
             
            console.log('--->'+JSON.stringify(shortnedURL));
            
            if (shortnedURL.updatedAt){
              const parsedDate = parseISO(shortnedURL.updatedAt);
              const currentDate = new Date();
              //setRelativeDate(formatRelative(parsedDate, currentDate, {locale: ptBR}));
              result.relativeDate = formatRelative(parsedDate, currentDate, {locale: ptBR});
            }
            
            setShortnedURL(result);
            setIsLoading(false);
        }

        //const { code } = props.match.params
        consulta(code);
       
     // setRelativeDate('');
        
    }, []);


    return (
        <Container>
           <Header>Estatísticas:</Header>

           { messageError ?
                 (<StatsContainer className="text-center">
                     <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle"/>
                     <p className="m-3">{messageError}</p>
                     <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                  </StatsContainer>
                 )
                 :
                 (
                    <StatsContainer className="text-center">
                     <p><b>{vars.HOST_APP+shortnedURL.code}</b></p> {/*https://pitu.tk/{shortnedURL.code}*/}
                     <p>Redirecionar para: <br/> {shortnedURL.url} </p>
                     <StatsRow className="text-center">
                         <StatsBox>
                             <b>{shortnedURL.hits} </b>
                             <StatsBoxTitle>Visitas</StatsBoxTitle>
                         </StatsBox>
                         <StatsBox>
                             <b>{shortnedURL.relativeDate? shortnedURL.relativeDate : null} </b>
                             <StatsBoxTitle>Última visita</StatsBoxTitle>
                         </StatsBox>
                     </StatsRow>
                     <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer> 
                 )
           }


        </Container>
    )
}
export default StatsPage;