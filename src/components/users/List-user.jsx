// Develop: vmgabriel

import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

// Icons
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

// Images
import anonUser from '../../assets/static/user.png';

const dataBase = {
  "count": 12,
  "message": "All Data",
  "rows": [
    {
      "createdAt": "Tue, 07 Jul 2020 00:06:33 GMT",
      "deletedAt": null,
      "email": "email@correo.com",
      "id": 2,
      "isValid": true,
      "lastName": "data",
      "name": "data",
      "photoUrl": "https://picsum.photos/200/300",
      "updatedAt": "Tue, 07 Jul 2020 00:06:38 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 00:02:23 GMT",
      "deletedAt": null,
      "email": "correo@correo.com",
      "id": 3,
      "isValid": true,
      "lastName": "establecer",
      "name": "establecer",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 00:02:23 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 00:18:04 GMT",
      "deletedAt": null,
      "email": "correo@correo.com",
      "id": 8,
      "isValid": true,
      "lastName": "establecer",
      "name": "establecer",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 00:18:04 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 00:18:15 GMT",
      "deletedAt": null,
      "email": "correo@correo.com",
      "id": 9,
      "isValid": true,
      "lastName": "establecer",
      "name": "establecer",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 00:18:15 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 15:24:44 GMT",
      "deletedAt": null,
      "email": "correo@correo.com",
      "id": 10,
      "isValid": true,
      "lastName": "apellidousuario1",
      "name": "usuario1",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 15:24:44 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 15:32:21 GMT",
      "deletedAt": null,
      "email": "correo2@correo.com",
      "id": 13,
      "isValid": true,
      "lastName": "apellidousuario2",
      "name": "usuario2",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 15:32:21 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 15:35:28 GMT",
      "deletedAt": null,
      "email": "correo2@correo.com",
      "id": 14,
      "isValid": true,
      "lastName": "apellidousuario2",
      "name": "usuario2",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 15:35:28 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 15:42:06 GMT",
      "deletedAt": null,
      "email": "correo2@correo.com",
      "id": 15,
      "isValid": true,
      "lastName": "apellidousuario2",
      "name": "usuario2",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 15:42:06 GMT"
    },
    {
      "createdAt": "Fri, 07 Aug 2020 13:23:59 GMT",
      "deletedAt": null,
      "email": "correo3@correo.com",
      "id": 16,
      "isValid": true,
      "lastName": "apellidousuario3",
      "name": "usuario3",
      "photoUrl": null,
      "updatedAt": "Fri, 07 Aug 2020 13:23:59 GMT"
    },
    {
      "createdAt": "Fri, 07 Aug 2020 13:24:40 GMT",
      "deletedAt": null,
      "email": "correo3@correo.com",
      "id": 17,
      "isValid": true,
      "lastName": "apellidousuario3",
      "name": "usuario3",
      "photoUrl": "https://picsum.photos/200/300",
      "updatedAt": "Fri, 07 Aug 2020 13:24:40 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 15:31:20 GMT",
      "deletedAt": "Thu, 09 Jul 2020 12:52:53 GMT",
      "email": "correo2@correo.com",
      "id": 11,
      "isValid": false,
      "lastName": "apellidousuario2",
      "name": "usuario0",
      "photoUrl": null,
      "updatedAt": "Wed, 08 Jul 2020 18:00:41 GMT"
    },
    {
      "createdAt": "Tue, 07 Jul 2020 15:31:34 GMT",
      "deletedAt": "Thu, 09 Jul 2020 12:53:19 GMT",
      "email": "correo2@correo.com",
      "id": 12,
      "isValid": false,
      "lastName": "apellidousuario2",
      "name": "usuario2",
      "photoUrl": null,
      "updatedAt": "Tue, 07 Jul 2020 15:31:34 GMT"
    }
  ]
};

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


function ListUser() {
  const columnsBase = [
    { title: 'Avatar', field: 'avatar' },
    { title: 'Name', field: 'name' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Is Active', field: 'isValid' },
  ];

  const getUsers = (query) => {
    return new Promise((resolve, reject) => {
      console.log('query get - ', query);
      const url = 'http://localhost:7202/api/v0/users';
      try {
        fetch(url)
          .then(resolve => resolve.json())
          .then(result => {
            console.log('result - ', result);
            const dataValues = result.rows.map(toDataValid);
            resolve({
              data: dataValues,
              page: 1,
              totalCount: dataBase.count
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
      <MaterialTable
        title="Users"
        columns={columnsBase}
        data={getUsers}
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
