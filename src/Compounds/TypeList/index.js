import './index.css'

const TypeList = props => {
  const {taskItem} = props
  return (
    <li className="list">
      <p className="task-description">{taskItem.descriptions}</p>
      <p className="task-button">{taskItem.type}</p>
    </li>
  )
}

export default TypeList
