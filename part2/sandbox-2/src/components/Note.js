const Note = ({ note }) => {
    return (
        <li id={note.id}>{note.content}</li>
    )
}
  
export default Note