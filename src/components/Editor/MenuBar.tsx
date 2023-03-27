/* eslint-disable react/require-default-props */
import { Editor } from '@tiptap/react'
import React, { FC } from 'react'

import { MenuBarWrapper } from './editor.styled.js'
import useTiptapCommands from './useTiptapCommands.js'
import HeadingSelect from './HeadingSelect.js'
import ImageButton from './ImageButton.js'
import MenuButton from './MenuButton.js'

interface MenuBarProps {
  editor: Editor | null
}

const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  const commands = useTiptapCommands({ editor })

  if (!editor) return null

  return (
    <MenuBarWrapper>
      <HeadingSelect editor={editor} />
      {commands.map(({ name, onClick, icon }) => (
        <MenuButton editor={editor} key={name} name={name} onClick={onClick} icon={icon} />
      ))}
      <ImageButton editor={editor} />
    </MenuBarWrapper>
  )
}

export default MenuBar
