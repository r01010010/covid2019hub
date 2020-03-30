/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import styled from 'styled-components'
import { useUXStore } from '../../index.js'

export default () => {
  const store = useUXStore()
    
  const activate = (section) => {
    store.section = section
  }

  return (
    <MenuButtons>
      <Button onClick={() => activate('we_need_help')} bg='red' color='white'>🆘 S O S !</Button>
      <Button onClick={() => activate('i_want_to_help')} bg='white'><img src="https://media-edg.barcelona.cat/wp-content/uploads/2014/05/RedCross.png" width="15"/>&nbsp;AYUDAR</Button>
      <Button onClick={() => activate('hospitals')}>🏥 HOSPITALES</Button>
      <Button onClick={() => activate('residencies')}>🏠 RESIDENCIAS</Button>
      <Button onClick={() => activate('donors')}>👋🏻 DONANTES</Button>
      {/* <Button selected={section === 'manuals'} onClick={() => activate('manuals')} style={{ background: '#ddd', color: '#444', height: 80}}>🖍 MANUALES <div style={{ color: '#aaa', fontWeight: 400, fontSize: 15, marginTop: 3}}>Házlo to mismo/a en casa!</div></Button> */}
      {/* <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white' style={{ background: '#ddd', color: '#444'}}><img src="https://cdn.onlinewebfonts.com/svg/img_564932.png" width="20"/> &nbsp;FARMACIAS</Button>
      <Button selected={section === 'i_want_to_help'} onClick={() => activate('i_want_to_help')} color='white' style={{ background: '#ddd', color: '#444'}}><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/shopping-trolley_1f6d2.png" width="20"/> &nbsp;SUPERMERCADOS</Button> */}
    </MenuButtons>
  )
}

const MenuButtons = styled.div`
  flex-direction: column;
  padding: 10px 0 0 0;
  width: 100%;
`
export const Button = styled.button`
  border-radius: 5px;
  height: 50px;
  cursor: pointer;
  background-color: #fff;
  width: 100%;
  border: 1px solid #d1d1d1;
  color: ${({ color }) => color || '#444'};
  font-size: 18px;
  font-weight: 800;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  background: ${({ bg }) => bg || '#ddd'};
`