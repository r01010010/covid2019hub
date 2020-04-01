import React from 'react';
import styled from 'styled-components'

export default () => (
  <>
    <Title>EMERGENCIA</Title>
    <Subtitle>COVID2019</Subtitle>
    <Contact>
        Escríbenos 
        <Email>emergenciacovid2019@gmail.com</Email>
    </Contact>
    <Welcome>
      Informe en tiempo real de lo que necesita cada hospital 
      para que empresas y civiles puedan ayudar.
    </Welcome>
  </>
 )

 const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const Subtitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 35;
`
const Contact = styled.div`
  font-size: 18px;
  color: #999;
  font-weight: 400;
  margin-top: 3px;
  width: 100%;
  text-align: left;
`
const Email = styled.u`
  display: inline-block;
  padding-left: 5px;
  color: #999;
`
const Welcome = styled.div`
  font-size: 16px;
  padding: 10px 0;
  text-align: left;
  width: 100%;
`