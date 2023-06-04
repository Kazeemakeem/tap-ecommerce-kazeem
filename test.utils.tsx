
import React, {ReactElement} from 'react' 
import {render, RenderOptions} from '@testing-library/react-native' 
import StoreProvider from './providers/StoreProvider'

const customRender = ( 
  ui: ReactElement, 
  options?: Omit<RenderOptions, 'wrapper'>, 
) => render(ui, {wrapper: StoreProvider, ...options}) 

export * from '@testing-library/react-native' 
export {customRender as render} 