
const SimpleForm = ({onSubmit, children}) => {
  return (
    <form className="simpleForm" onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default SimpleForm
