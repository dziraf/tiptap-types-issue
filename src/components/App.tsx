import React, { useState } from 'react';
import RichTextEditor from './Editor/Editor.js';

const Application = () => {
  const [value, setValue] = useState('')

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <div>
      <span>Hello World</span>
      <RichTextEditor value={value} onChange={handleChange} />
    </div>
  )
}

export default Application
