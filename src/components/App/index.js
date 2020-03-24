/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-console */
import React from 'react';
import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import styled from 'styled-components'
import places from '../../db/places'
import hospitals from '../../db/hospitals'
import { useUXStore } from '../../index.js'
import restClient from '../../network/main_server/rest_api_client'

const orderedPlaces = _.chain(places).orderBy(['nm']).value()

export const App = observer(() => {
  const store = useUXStore()
  const { section } = store

  const activate = (section) => {
    store.section = section;
  }

  const createUser = () => {
    restClient.users.create({
      email: 'paloma@jejeje.com',
      name: 'Paloma',
      signup_date: Date.now(),
      description: 'Hola soy guay',
      isRegistered: false,
      lang: 'es-es',
      category: 'hospital',
      type: 'receiver'
    })
  }

  return (
    <>
      <Title>
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/pager_1f4df.png" width="120" height="120"></img>
        COVID2019 HUB
      </Title>

      <Welcome>
        Informe en tiempo real de lo que necesita cada hospital para que empresas y civiles puedan ayudar.
      </Welcome>

      <MenuButtons>
        <Button selected={section === 'hospitals'} onClick={() => activate('hospitals')}>Ver Estado Hospitales</Button>
        <Button selected={section === 'we_need_help'} onClick={() => activate('we_need_help')}>Necesito ayuda</Button>
        <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')}>Quiero ayudar</Button>
        <Button onClick={() => createUser()}>Create user</Button>
      </MenuButtons>

      { section === 'we_need_help' && 
        <HelpForm>
          <form>
            <div style={{ marginBottom: 5 }}>
              <Select>
                <option value='null'>Destino</option>
                <option value='hospital'>Hospital</option>
                <option value='pharm'>Farmacia</option>
                <option value='supermarket'>Supermercado</option>
                <option value='person'>Persona</option>
                <option value='other'>Otro</option>
              </Select>
            </div>
            <div style={{ marginBottom: 5 }}>
              <Select>
                <option>Provincia</option>
                { orderedPlaces.map(place => (<option value={place.id} key={place.id}>{place.nm}</option>)) }
              </Select>
            </div>
            <Input type='text' placeholder='Nombre y apellidos'></Input>
            <Input type='email' placeholder='Email'></Input>
            <Input type='tel' placeholder='Telefono'></Input>
            <Textarea placeholder='Indica qué necesitas, cuánto necesitas, para cuando lo necesitas, quien crees que podría aportarlo?' />
            <ButtonHelpMe>PEDIR AYUDA</ButtonHelpMe>
          </form>
        </HelpForm>
      }

      { section === 'i_want_to_help' && 
        <div>I want to help</div>
      }

      { section === 'hospitals' && 
        <div>
          <Title2><span role='img'>🏥</span> Hospitales de ...
          <Filter>
            <Select>
              <option>Selecciona una provincia:</option>
              { orderedPlaces.map(place => (<option value={place.id} key={place.id}>{place.nm}</option>)) }
            </Select>
          </Filter>
          </Title2>
          { hospitals.map(hospital => (
            <Hospital key={hospital.id}>
              <HName>{hospital.nm}</HName>
              <HDescription><a href={`https://www.google.com/maps/place/${hospital.nm.split(' ').join('+')}+${hospital.address.split(' ').join('+')}`} target='_blank' rel='noopener noreferrer'>{hospital.address}</a></HDescription>
              <HItem>😷 Mascarillas {hospital.status.masks.state }</HItem>
              <HItem>♻️ Respiradores {hospital.status.respirators.state}</HItem>
              <HItem>🥋 Epis {hospital.status.epis.state}</HItem>
              <Buttons>
                <Button><img src="https://media-edg.barcelona.cat/wp-content/uploads/2014/05/RedCross.png" width="15"></img> AYUDAR</Button>
              </Buttons>
            </Hospital>
          ))}
        </div>
      }
      <Footer>
        Autor Paloma Jiménez &nbsp;&nbsp;&nbsp;<b>Github</b> &nbsp; <a href='https://github.com/r01010010' rel='noopener noreferrer' target='_blank'>https://github.com/r01010010</a>
      </Footer>
    </>
  );
})

export default App;

const HelpForm = styled.div`
  padding: 20px 0;
`
const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
  font-size: 14px;
  border: none;
  margin-bottom: 5px;
  color: black;
`
const Textarea = styled.textarea`  
  height: 40px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
  font-size: 14px;
  border: none;
  margin-bottom: 5px;
  color: black;
  padding: 10px;
  height: 100px;
`
const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
`
const Welcome = styled.div`
  font-size: 14px;
  padding: 10px 0;
`
const MenuButtons = styled.div`
  flex-direction: row;
  padding: 10px 0 0 0;

  & button {
    color: white;
    border: none;
    padding: 10px;
    margin-right: 20px;
    background-color: ${props => props.selected ? 'green' : 'red'};
  }
`
const Title2 = styled.div`
  font-size: 30px;
  padding: 30px 0 10px 0;
  font-weight: 600;
`
const Hospital = styled.div`
  padding: 15px 0;
`
const HName = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
  font-weight: 600;
`
const HDescription = styled.div`
  font-size: 12px;
  padding-bottom: 10px;

`
const HItem = styled.div`
  font-size: 15px;
  padding-bottom: 4px;
`
const Buttons = styled.div`
  padding: 10px 0;
`
const Button = styled.button`
  border-radius: 5px;
  height: 40px;
  font-weight: 600;
  font-size: 15px;
  color: #ff0000;
  cursor: pointer;
`
const ButtonHelpMe = styled.button`
  border-radius: 5px;
  height: 40px;
  font-weight: 600;
  font-size: 15px;
  color: white;
  cursor: pointer;
  padding: 10px;
  background-color: red;
  width: 100%;
  border: none;
`
const Filter = styled.div`
  padding: 15px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Select = styled.select`
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 600;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%; 
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
`
const Footer = styled.div` 
  color: #333;
  font-size: 12px;
  padding: 30px 0;
  display: flex;
  flex-direction: row;
`