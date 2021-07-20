import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map(item => {
        // use rest to save id and title of current item
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              {/* on click get id of element that we want to edit or remove and call function from App.js that will do it */}
              <button type="button" className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button type="button" className="delete-btn" onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
