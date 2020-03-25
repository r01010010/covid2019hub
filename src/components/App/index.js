/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import styled from 'styled-components'
import places from '../../db/places'
import hospitals from '../../db/hospitals'
import { useUXStore } from '../../index.js'
import restClient from '../../network/main_server/rest_api_client'
import products from '../../db/products'

const orderedPlaces = _.chain(places).orderBy(['nm']).value()

export const App = observer(() => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState(null);

  const store = useUXStore()
  const { section } = store
  
  const activate = (section) => {
    setResponse(null)
    store.section = section;
  }

  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value})
  }

  const handleChangePlace = (e) => {
    store.placeId = parseInt(e.target.value)
  }

  const createUser = () => {
    restClient.users.create({
      email: form.email,
      name: form.name,
      center: form.center,
      description: form.description,
      placeId: parseInt(form.placeId),
      isRegistered: false,
      lang: 'es-es',
      category: form.category,
      type: section === 'we_need_help' ? 'receiver' : 'donor',
      masks: form.masks,
      visors: form.visors,
      respirators: form.respirators,
      epis: form.epis,
      hidrocloroquine: form.hidrocloroquine,
      stretchers: form.stretchers,
      money: form.money,
      printer: form.printer 
    }, (err, data) => {
      setResponse({ err, data })
    })
  }

  const filteredHospitals = hospitals.filter(h => h.placeId === store.placeId);

  return (
    <>
      <Title>
        {/* <div><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/pager_1f4df.png" width="120" height="120"></img></div> */}
        <div>EMERGENCIA</div>
        <div style={{ fontSize: 35 }}>COVID2019</div>
      </Title>

      <Welcome>
        Informe en tiempo real de lo que necesita cada hospital para que empresas y civiles puedan ayudar.
      </Welcome>

      <MenuButtons>
        <Button selected={section === 'we_need_help'} onClick={() => activate('we_need_help')} style={{ background: 'red', color: 'white', border: '1px solid #ff0000' }}>🆘 S O S !</Button>
        <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white'><img src="https://media-edg.barcelona.cat/wp-content/uploads/2014/05/RedCross.png" width="15"/> AYUDAR</Button>
        <Button selected={section === 'hospitals'} onClick={() => activate('hospitals')} style={{ background: '#ddd', color: '#444'}}>🏥 HOSPITALES</Button>
        {/* <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white' style={{ background: '#ddd', color: '#444'}}><img src="https://cdn.onlinewebfonts.com/svg/img_564932.png" width="20"/> &nbsp;FARMACIAS</Button>
        <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white' style={{ background: '#ddd', color: '#444'}}><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/shopping-trolley_1f6d2.png" width="20"/> &nbsp;SUPERMERCADOS</Button> */}

      </MenuButtons>

      { response && <FormResponse><div style={{ fontSize: 40 }}>GRACIAS</div>Estamos verificando tu información. Si todo es correcto aparecerá en la web en unos minutos. Gracias!</FormResponse> }

      { ((section === 'we_need_help' || section === 'i_want_to_help') && !response) && 
        <div>
          <Title3>{section === 'we_need_help' ? 'Ayuda!' : 'Ayudar'}</Title3>
          {section === 'we_need_help' ? 
            <div style={{ marginTop: 8 }}>Trabajas en un Hospital u otro centro que necesita ayuda? Usa este formulario para solicitarla.</div>
          : 
            <div style={{ marginTop: 8 }}>Tienes una impresora 3D? Quizás una máquina de coser? Conocimientos? Se te ocurre algo para ayudar? Usa el formulario y registrate en nuestra base de datos. Te pondremos en contacto con centros que lo necesitan!</div> 
          }
          
          <HelpForm>
            <div style={{ marginBottom: 5, width: '100%' }}>
              { section === 'we_need_help' &&
                <Select value={form.category} onChange={(e) => handleChange(e, 'category')}>
                  <option value='null'>Destino</option>
                  <option value='hospital'>Hospital</option>
                  <option value='pharm'>Farmacia</option>
                  <option value='supermarket'>Supermercado</option>
                  <option value='person'>Persona</option>
                  <option value='other'>Otro</option>
                </Select>
              }
              
              { section === 'i_want_to_help' && 
                <Select value={form.category} onChange={(e) => handleChange(e, 'category')}>
                  <option value='null'>Soy/Tengo ...</option>
                  <option value='3dprinter'>Impresora 3D</option>
                  <option value='specialist'>Especialista</option>
                  <option value='other'>Otro</option>
                </Select> 
              }
            </div>
            <div style={{ marginBottom: 5 }}>
              <Select value={form.placeId} onChange={(e) => handleChange(e, 'placeId')}>
                <option>Provincia</option>
                { orderedPlaces.map(place => (<option value={parseInt(place.id)} key={place.id}>{place.nm}</option>)) }
              </Select>
            </div>
            <Input type='text' placeholder='Centro (Ej. Hospital Santa Cristina)' value={form.center} onChange={(e) => handleChange(e, 'center')} ></Input>
            <Input type='text' placeholder='Nombre y apellidos' value={form.name} onChange={(e) => handleChange(e, 'name')} ></Input>
            <Input type='email' placeholder='Email' value={form.email} onChange={(e) => handleChange(e, 'email')} ></Input>
            <Input type='tel' placeholder='Telefono' value={form.phone} onChange={(e) => handleChange(e, 'phone')} ></Input>
            
            <ProductList>
            { products.map(p => (
              <ProductItem>
                <ProductName>
                  {p.name}
                </ProductName>
                <ProductQuantity>
                  <Select value={form[p.id]} onChange={(e) => handleChange(e, p.id)}>
                    <option value={0}>0</option>
                    <option value={1}>+ 1</option>
                    <option value={10}>+ 10</option>
                    <option value={50}>+ 50</option>
                    <option value={200}>+ 200</option>
                    <option value={1000}>+ 1000</option>
                    <option value={5000}>+ 5000</option>
                    <option value={10000}>+ 10000</option>
                  </Select>
                </ProductQuantity>
              </ProductItem>
            ))}
            </ProductList>

            <Textarea 
              placeholder={ 
                section === 'we_need_help' 
                  ? 'Indica qué necesitas, cuánto necesitas, para cuando lo necesitas, quien crees que podría aportarlo?' 
                  : 'Indica en qué puedes ayudar. Cuanto puedes aportar, cuando, a quien? Gracias!'
              }
              value={form.description}
              onChange={(e) => handleChange(e, 'description')}   
              />
            { section === 'we_need_help' &&  <ButtonHelpMe onClick={createUser}>PEDIR AYUDA</ButtonHelpMe> }
            { section === 'i_want_to_help' &&  <ButtonHelpMe onClick={createUser}>AYUDAR</ButtonHelpMe> }
          </HelpForm>
        </div>
      }

      { section === 'hospitals' && 
        <List>
          <Title2>🏥 Hospitales de ...
          <Filter>
            <Select onChange={handleChangePlace}>
              <option>Selecciona una provincia:</option>
              { orderedPlaces.map(place => (<option value={place.id} key={place.id} selected={place.id === store.placeId}>{place.nm}</option>)) }
            </Select>
          </Filter>
          </Title2>
          { filteredHospitals.map(hospital => (
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
          { filteredHospitals.length === 0 && <div>No hay datos para esta provincia.</div>}
        </List>
      }
      <Footer>
        <div>Gracias por ayudar. (r) </div>
        <div>Para más información covid2019hub@gmail.com</div>
      </Footer>
    </>
  );
})

export default App;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`
const ProductItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`
const ProductName = styled.div`
  flex: 1;
`
const ProductQuantity = styled.div`
  flex: 1;
`

const List = styled.div`
  width: 100%;
`
const FormResponse = styled.div`
  padding: 40px 0 0 0;
  text-align: center;
`
const HelpForm = styled.div`
  padding: 20px 0;
  width: 100%;
`
const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
  border: none;
  margin-bottom: 5px;
  color: black;
`
const Textarea = styled.textarea`  
  height: 40px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
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
  width: 100%;
`
const Welcome = styled.div`
  font-size: 16px;
  padding: 10px 0;
`
const MenuButtons = styled.div`
  flex-direction: column;
  padding: 10px 0 0 0;
  width: 100%;

  & button {
    color: #FB0000;
    font-size: 18px;
    font-weight: 800;
    border: none;
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
    width: 100%;
  }
`
const Title2 = styled.div`
  font-size: 30px;
  padding: 30px 0 10px 0;
  font-weight: 600;
`
const Title3 = styled.div`
  font-size: 30px;
  padding: 10px 0 5px 0;
  font-weight: 600;
`
const Hospital = styled.div`
  padding: 15px 0;
`
const HName = styled.div`
  font-size: 25px;
  padding-bottom: 10px;
  font-weight: 600;
`
const HDescription = styled.div`
  font-size: 14px;
  padding-bottom: 10px;
`
const HItem = styled.div`
  font-size: 18px;
  padding-bottom: 4px;
`
const Buttons = styled.div`
  padding: 10px 0;
`
const Button = styled.button`
  border-radius: 5px;
  height: 50px;
  font-weight: 600;
  font-size: 15px;
  color: #ff0000;
  cursor: pointer;
  background-color: #fff;
  width: 100%;
  border: 1px solid #d1d1d1;
`
const ButtonHelpMe = styled.button`
  border-radius: 5px;
  height: 50px;
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
  color: #ff0000;
  font-size: 12px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & div {
    color: #999;
 
  }
`