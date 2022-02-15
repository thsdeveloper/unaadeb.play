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
import {AppPage} from '~/components'

import * as S from './styles'

interface IProps {

}

const {{ inputs.name | pascal }} : React.FC<IProps> = ():JSX.Element => {


  return <AppPage />
}

export default {{ inputs.name | pascal }}

```

# `{{ inputs.name | pascal }}/styles.ts`

```jsx
import styled from 'styled-components/native'

export const Container = styled.View``

```
