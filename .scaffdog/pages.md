---
name: "pages"
root: "./src/pages"
output: "**/*"
ignore: []
questions:
  name: "Please enter the name of page to be created"
---

# `{{ inputs.name | pascal }}/index.tsx`

```jsx
import React from 'react'
import { View } from 'react-native'

import * as S from './styles'

export const {{ inputs.name | pascal }} : React.FC = ():JSX.Element => {


  return <S.Container />
}

```

# `{{ inputs.name | pascal }}/styles.ts`

```jsx
import styled from 'styled-components/native'

export const Container = styled.View``

```
