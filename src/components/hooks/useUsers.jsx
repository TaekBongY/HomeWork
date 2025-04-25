import { useState } from "react"

const initUsers = [
    { id: 1, name: 'mojio', age: 28, isOnline: 'online' },
    { id: 2,name: 'saki', age: 27, isOnline: 'offline' },
    { id: 3,name: 'erie', age: 23, isOnline: '' },
  ];


const useUsers = () => {
    const [users, setUsers] = useState(initUsers);

    const getUser = (id) => {
        return users.find(user => user.id === id);
    }

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    }

  return (
    { users, setUsers, getUser, deleteUser }
  )
}

export default useUsers
