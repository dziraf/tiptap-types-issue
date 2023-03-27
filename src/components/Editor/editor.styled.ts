import { styled } from 'styled-components'

export const EditorWrapper = styled.span`
  position: relative;
  padding: 16px;

  .ProseMirror-focused {
    outline: none;
  }

  .characterCount {
    position: absolute;
    bottom: 10px;
    right: 16px;
    color: #bbb;
  }
`
EditorWrapper.defaultProps = {
  className: 'EditorWrapper',
}

export const MenuBarWrapper: any = styled.div`
  border: 1px solid #333;
  border-bottom: none;
`

MenuBarWrapper.defaultProps = {
  px: 'md',
  py: 'md',
  className: 'MenuBarWrapper',
}
