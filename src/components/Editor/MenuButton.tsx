import { Editor } from '@tiptap/react'
import React, { FC, useMemo, PropsWithChildren } from 'react'
import { styled } from 'styled-components'

import * as EditorIcons from './icons/index.js'

interface MenuButtonProps {
  editor: Editor
  name: string
  onClick: () => void
  icon?: string
  attributes?: Record<string, any>
  children?: any
}

const StyledText: any = styled.span`
  cursor: pointer;
  color: #bbb;
  & svg path {
    fill: #bbb;
  }
`

const MenuButton: FC<MenuButtonProps> = (props) => {
  const { name, editor, onClick, icon, attributes, children } = props

  const isActive = useMemo(
    () => (editor.isActive(attributes || name) ? 'active' : ''),
    [name, attributes],
  )

  // Using icons from: https://github.com/Keyamoon/IcoMoon-Free
  const Icon = icon ? EditorIcons[icon] : null

  return (
    <StyledText as="span" onClick={onClick} className={isActive} size="icon" mx="md">
      {Icon ? <Icon /> : name}
      {children}
    </StyledText>
  )
}

export default MenuButton
