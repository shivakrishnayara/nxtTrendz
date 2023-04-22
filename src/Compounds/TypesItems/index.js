import './index.css'

const TypesItems = props => {
  const {tagsItem, onClickOnTab, isActiveId} = props

  const onClickToChange = () => {
    onClickOnTab(tagsItem.optionId)
  }
  const classChange = isActiveId ? 'active' : 'in-active'

  return (
    <li>
      <button
        type="button"
        className={`${classChange} tag-button`}
        onClick={onClickToChange}
      >
        {tagsItem.displayText}
      </button>
    </li>
  )
}
export default TypesItems
