import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

// if there is some JSON data in local storage with name 'list' - convert json to array object and return it
const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
};

function App() {
  // storing input value
  const [name, setName] = useState('');
  // storing list items {id, title}. Can start with empty array, or get data from local storage 
  const [list, setList] = useState(getLocalStorage());
  // in list.js we add button that fires function "editItem" with id of clicked element.
  // we need id flag for edit element, and change "submit/edit" button title
  const [isEditing, setIsEditing] = useState(false);
  // we need editId for returning edited item to list
  const [editId, setEditId] = useState(null);
  // showing alert with flag, message and keyword for styles
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  // will update states depending on current name and isEditing state
  const handleSubmit = e => {
    e.preventDefault();
    // if input is empty inform user that it need to be filled
    if (!name) {
      showAlert(true, 'please enter value', 'danger')
    }
    // if user edit item, update list with new item title text
    else if (name && isEditing) {
      // for each item return item, if item has id of edited return new title for this item
      setList(list.map(item => {
        if (item.id === editId) {
          // return all properties(id) and change the title to whatever stored in name
          return { ...item, title: name }
        }
        return item;
      }));
      // after submitting clear input, editID, isEditing, and inform user that value has been changed
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'value changed', 'success')
    }
    // if input is not empty and it is not editing - add new item to the list
    else {
      showAlert(true, 'item added to the list', 'success');
      const newItem = { id: new Date().getTime().toString(), title: name };
      // copy existing list using spread and add new item
      setList([...list, newItem]);
      // clear input
      setName('');
    }
  }
  // if we call this function without arguments it will remove current alert
  // otherwise - set alert with arguments values
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  };

  const clearList = () => {
    showAlert(true, 'you cleared list', 'danger');
    setList([]);
  }
  // remove from list item using it's id that we pass from List.js when click on delete btn
  const removeItem = id => {
    showAlert(true, 'item has been removed', 'danger');
    setList(list.filter(item => item.id !== id));
  }
  // get item that we want to edit using id, update editing status, id and setName to go through editing scenario in handleSubmit 
  const editItem = id => {
    const specificItem = list.find(item => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }
  // after each list change save new copy to local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* each time when we want to show alert - create alert component*/}
        {/* in props copy all alert object properties, function that by default hides alert, and list of items */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder={`e.g. "bread"`}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {/* if we click edit item, than change button text to edit */}
          <button type="submit" className="submit-btn">{isEditing ? 'edit' : 'submit'}</button>
        </div>
      </form>
      {/* show grocery container only if there is at least one item in the list */}
      {list.length > 0 &&
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>

      }

    </section>
  )
}

export default App
