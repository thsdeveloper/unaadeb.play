---
name: "components"
root: "./src/components"
output: "**/*"
ignore: []
questions:
  name: "Please enter the name of component to be created"
---

# `{{ inputs.name | pascal }}/index.tsx`

```jsx
import React from 'react'
import { View } from 'react-native'

import * as S from './styles'

interface IProps {

}

export const {{ inputs.name | pascal }} : React.FC<IProps> = ():JSX.Element => {


  return <S.Container />
}

```

# `{{ inputs.name | pascal }}/styles.ts`

```jsx
import styled from 'styled-components/native'

export const Container = styled.View``

```
