import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TypesItems from './Compounds/TypesItems'
import TypeList from './Compounds/TypeList'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    id: uuidv4(),
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    id: uuidv4(),
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    id: uuidv4(),
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    id: uuidv4(),
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    id: uuidv4(),
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    id: uuidv4(),
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    activeId: '',
    inputValue: '',
    optionId: tagsList[0].optionId,
    userList: [],
  }

  onChangeOption = e => {
    this.setState({optionId: e.target.value})
  }

  onChangeInput = e => {
    this.setState({inputValue: e.target.value})
  }

  onClickOnTab = id => {
    const {activeId} = this.state
    if (activeId === '') {
      this.setState({activeId: id})
    } else {
      this.setState({activeId: ''})
    }
  }

  onSubmitForm = e => {
    e.preventDefault()
    const {inputValue, optionId, userList} = this.state
    const optionList = tagsList.filter(each => each.optionId === optionId)
    const updateList = {
      id: uuidv4(),
      descriptions: inputValue,
      type: optionList[0].displayText,
    }
    this.setState({
      userList: [...userList, updateList],
      inputValue: '',
      optionId: tagsList[0].optionId,
    })
  }

  onchangeEvent = () => {
    const {activeId, userList} = this.state
    if (activeId !== '') {
      const tabList = tagsList.filter(each => each.optionId === activeId)
      const userTabList = userList.filter(
        each => each.type === tabList[0].displayText,
      )
      return userTabList
    }
    return userList
  }

  renderToGetTags = () => {
    const {userList, activeId} = this.state
    const userTabList = this.onchangeEvent()
    console.log(userTabList)
    return (
      <div className="details-container">
        <h1 className="tags-heading">Tags</h1>
        <ul className="tags-list">
          {tagsList.map(tab => (
            <TypesItems
              key={tab.id}
              tagsItem={tab}
              isActiveId={activeId === tab.optionId}
              onClickOnTab={this.onClickOnTab}
            />
          ))}
        </ul>
        <h1 className="tags-heading">Tasks</h1>
        {userList.length === 0 ? (
          <div className="no-product-container">
            <p className="no-heading">No Tasks Added Yet</p>
          </div>
        ) : (
          <ul className="task-list">
            {userTabList.map(each => (
              <TypeList key={each.id} taskItem={each} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {optionId, inputValue} = this.state
    return (
      <div className="bg-container">
        <form className="input-element-container" onSubmit={this.onSubmitForm}>
          <h1 className="main-heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="input" className="label">
              Task
            </label>
            <input
              type="text"
              id="input"
              className="input"
              placeholder="Enter the task here"
              value={inputValue}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="input-container">
            <label htmlFor="select" className="label">
              Tags
            </label>
            <select
              className="input"
              onChange={this.onChangeOption}
              value={optionId}
              id="select"
            >
              {tagsList.map(each => (
                <option value={each.optionId}>{each.displayText}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        {this.renderToGetTags()}
      </div>
    )
  }
}
export default App
