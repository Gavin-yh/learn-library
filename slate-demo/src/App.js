import React, { useState, useMemo } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

// const initialState = Slate.fromJSON({
//   document: {
//     nodes: [
//       {
//         kind: 'block',
//         type: 'paragraph',
//         nodes: [
//           {
//             kind: 'text',
//             ranges: [
//               {
//                 text: 'A line of text in a paragraph.'
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// })

const initialValue  = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const PlainTextExample = () => {
  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        placeholder="Type something"
        renderPlaceholder={({ children, attributes }) => (
          <div {...attributes}>
            <p>{children}</p>
            <pre>
              Use the renderPlaceholder prop to customize rendering of the
              placeholder
            </pre>
          </div>
        )}
      />
    </Slate>
  )
}

export default PlainTextExample;
