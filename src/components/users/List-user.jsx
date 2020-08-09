// Develop: vmgabriel

// Libraries
import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Icons
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

// Material
import Button from '@material-ui/core/Button';

// Images
import anonUser from '../../assets/static/user.png';


const getIconValidation = (validation) => (
  (validation)
  ? <CheckIcon />
  : <ClearIcon />
);

const getPhotoUrl = (url) => (
  <img src={(url) ? url : anonUser} alt="avatar" className="image-circle min-image" />
);

const toDataValid = ({ id, name, lastName, email, isValid, photoUrl }) => (
  {
    key: id,
    name: name,
    lastName: lastName,
    email: email,
    isValid: getIconValidation(isValid),
    avatar: getPhotoUrl(photoUrl)
  }
);

const createFilter = (search) => {
  if (search === '') return undefined;
  return [
    {
      "column": "name",
      "op": "like",
      "value": search,
      "type_data": "str"
    },
    {
      "column": "lastName",
      "op": "like",
      "value": search,
      "type_data": "str"
    },
    {
      "column": "email",
      "op": "like",
      "value": search,
      "type_data": "str"
    }
  ]
};

const createOrder = (name, direction) => {
  const flag = (direction == 'asc') ? '' : '-';
  return flag + name;
};

function ListUser() {
  const columnsBase = [
    { title: 'Avatar', field: 'avatar' },
    { title: 'Name', field: 'name' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Email', field: 'email' },
  ];

  const getUsers = (query) => {
    return new Promise((resolve, reject) => {
      console.log('query get - ', query);
      console.log('query page - ', query.page);
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "filters": {
            "and_data": [
              {
                "column": "isValid",
                "op": "=",
                "value": true,
                "type_data": "bool"
              }
            ],
            "or_data": createFilter(query.search),
            "default": (query.search === "") ? undefined : 'AND'
          },
          "joins": [],
          "attributes": []
        })
      }
      let url = 'http://localhost:7202/api/v0/users/filter?';
      url += `limit=${query.pageSize}`;
      url += `&offset=${query.page}`;
      url += (query.orderBy &&
              query.orderBy.field != 'avatar' &&
              query.orderBy.field != 'isValid')
           ? `&orders=${createOrder(query.orderBy.field, query.orderDirection)}`
           : '';
      try {
        fetch(url, options)
          .then(resolve => resolve.json())
          .then(result => {
            console.log('result - ', result);
            const dataValues = result.rows.map(toDataValid);
            resolve({
              data: dataValues,
              page: query.page,
              totalCount: result.count
            });
          });
      } catch(err) {
        console.log('error -', error);
        reject(err);
      }
    });
  };

  return (
    <div>
      <h1>User's List</h1>

      <Link to="/users/create">
        <Button variant="contained">
          Create New User
        </Button>
      </Link>

      <MaterialTable
        title="Users"
        columns={columnsBase}
        data={getUsers}
        options={{
          exportButton: true
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}


export default ListUser;
