import React from 'react'

const CreateTask = () => {

  const FormHandler = ()  => {
    console.log("Task filled");
  }
  return (
    <div>
      Create your Task

      <form action="" onSubmit={FormHandler}>
        <input type='text' placeholder='Create your task' />
        <input type='number' placeholder='Task number' />
      </form>
    </div>
  )
}

export default CreateTask
