import React from 'react';

const AppContainer = ({children}) => 
  <div style = {{margin: '10px'}} >
    {children}
  </div>

export const AppSubComp = {
  AppContainer
}