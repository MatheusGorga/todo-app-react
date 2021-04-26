import React from 'react'
import IconButton from '../template/iconButton'



export default props => {

   const renderRows = () => {
      const list = props.list || []
      return list.map(todo => (
         <tr key={todo._id}>
            <td className={todo.done ? 'markedAsDone' : ''}  >{todo.description}</td>
            <td >
               <IconButton   hide={todo.done} className='btn'  style="success" icon='check' onClick={() => props.handleMarkDone(todo)} />
               <IconButton   hide={!todo.done} className='btn' style="warning" icon='undo' onClick={() => props.handleMarkAsPending(todo)} />
               <IconButton   hide={!todo.done} className='btn' style="danger" icon='trash-o' onClick={() => props.handleRemove(todo)} />

            </td>
         </tr>
      ))
   }

   return(
      <table className="table">
         <thead >
            <tr  >
               <th>Descrição</th>
               <th className="tableActions" >Ações</th>
            </tr>
         </thead>
         <tbody>
            {renderRows()}
         </tbody>
      </table>
   )
}