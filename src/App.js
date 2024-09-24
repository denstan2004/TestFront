import './App.css';
import { useEffect, useState } from 'react';
import User from './User';
import axios from 'axios';
import Filter from './Filter';
import UpdateWindow from './UpdateWindow';
import SortWindow from './SortWindow';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [UpdateWindowVisivility, setUpdateWindowVisibility] = useState(false);
  const [selectedUser,setSelectedUser]=useState();
  const[sortWindowVisibility,setSortWindowVisibility]=useState(false)
  localStorage.setItem("back-prefix", "https://localhost:7293/api/test");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(`${localStorage.getItem("back-prefix")}/Get/All/Users`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);  
          setUsers(response.data);
          setFilteredUsers(response.data);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleFilterShow = () => {
    const state = !filterVisibility;
    setFilterVisibility(state);
  };

  const setFilters = (filterData) => {
    console.log(filterData)
    const temp = users.filter(user => {
      let check = true;
      if (filterData.name !== '') {
        check = check && user.name.toLowerCase().includes(filterData.name.toLowerCase());
      }

      if (filterData.birthday !== '') {
        const userDateOnly = new Date(user.birthDay).toISOString().slice(0, 10); 
        

        check = check && filterData.birthday === userDateOnly;
      }
      

      if (filterData.married !== '---') {
        if (filterData.married === "yes") {
          check = check && user.married === true;
        } else if (filterData.married === "no") {
          check = check && user.married === false;
        }
      }

      if (filterData.telNumber !== '') {
        check = check && user.phone.includes(filterData.telNumber);
      }

      if (filterData.higherSalary !== 0 && filterData.lowerSalary <= filterData.higherSalary) {
        check = check && user.salary <= filterData.higherSalary && user.salary >= filterData.lowerSalary;
      }

      return check;
    });

    setFilteredUsers(temp);
    
};
  
 const SelectUser=(user)=>{
  setSelectedUser(user);
  setUpdateWindowVisibility(!UpdateWindowVisivility);
 }
 const UpdateFillteredUsers = (updatedUser) => {
  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
  );
  
  const updatedFilteredUsers = filteredUsers.map((user) =>
    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
  );

  setUsers(updatedUsers);
  setFilteredUsers(updatedFilteredUsers);

  console.log('Updated user:', updatedUser);
};

 const CloseUpdateWindow=()=>
  {
    setUpdateWindowVisibility(false);
  };
  const SetSort = (sortParams) => {
    let sortedUsers = [...filteredUsers];
    if (sortParams.name !== '---') {
        sortedUsers.sort((a, b) => {
            if (sortParams.name === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    }

    if (sortParams.birthday !== '---') {
        sortedUsers.sort((a, b) => {
            const dateA = new Date(a.birthDay);
            const dateB = new Date(b.birthDay);
            if (sortParams.birthday === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    }

    if (sortParams.married !== '---') {
        sortedUsers.sort((a, b) => {
            const marriedA = a.married ? 1 : 0;
            const marriedB = b.married ? 1 : 0;
            if (sortParams.married === 'asc') {
                return marriedA - marriedB;
            } else {
                return marriedB - marriedA;
            }
        });
    }

    if (sortParams.telNumber !== '---') {
        sortedUsers.sort((a, b) => {
            if (sortParams.telNumber === 'asc') {
                return a.phone.localeCompare(b.phone);
            } else {
                return b.phone.localeCompare(a.phone);
            }
        });
    }


    if (sortParams.salary !== '---') {
        sortedUsers.sort((a, b) => {
            if (sortParams.salary === 'asc') {
                return a.salary - b.salary;
            } else {
                return b.salary - a.salary;
            }
        });
    }

    setFilteredUsers(sortedUsers);  
};

const handleSortShow=()=>{
  setSortWindowVisibility(!sortWindowVisibility)
}
  return (
    <div className="app-container">
      <div className="menu-buttons">
      <div>
        <button  className ="menu-button" onClick={handleFilterShow}>Фільтри</button>
      </div>
      <div>
        <button className ="menu-button" onClick={handleSortShow}>Сортувати</button>
      </div>
      </div>
      <div className="sort-window">
        {sortWindowVisibility && <SortWindow SetSort={SetSort}/>}
      </div>
      <div className="update-window">
      {UpdateWindowVisivility && <UpdateWindow CloseUpdateWindow={CloseUpdateWindow} UpdateFillteredUsers={UpdateFillteredUsers} user={selectedUser}/>}
      </div>
      <div className="filter">
      {filterVisibility && <Filter setFilters={setFilters} />}
      </div>

      <div className="table-header-container">
        <div className="table-header-item">Ім'я</div>
        <div className="table-header-item">День Народження</div>
        <div className="table-header-item">Одружен(ий/а)</div>
        <div className="table-header-item">Номер телефону</div>
        <div className="table-header-item">Зарплата</div>
      </div>
      <div className="table-body-container">
        {filteredUsers.map((user) => (
          <User SelectUser={SelectUser} key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
