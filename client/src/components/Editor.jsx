import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function Editor({ initialData = '', onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData()
        onChange(event, editor)
      }}
    />
  )
}
