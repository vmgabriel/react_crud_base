// Develop: vmgabriel

// Libraries
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// Material
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Validation
import validate from '../../utils/validation.js';

const CreateUpdateUser = (props) => {
  const idUser = props.match.params.idUser;
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const [form, setForm] = React.useState([]);
  const [mode, setMode] = React.useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const sendAlert = (message) => (variant='default') => {
    enqueueSnackbar(message, {variant});
  };

  const handleToBack = () => {
    history.goBack();
  };

  const getUser = () => {
    const url = `http://localhost:7202/api/v0/users/${idUser}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(resolve => resolve.json())
        .then(result => {
          if (result.message == 'User Found') {
            resolve({
              name: result.data.name,
              lastName: result.data.lastName,
              email: result.data.email
            });
          } else {
            console.log('Error in Get User by Id - ', result);
            sendAlert('User Not Found')('error');
            handleToBack();
            resolve();
          }
        })
        .catch(error => {
          console.log('Error in Get User by Id - ', error);
          sendAlert('Error in Get User By Id')('error');
          reject(error);
        });
    });
  };

  const getMode = () => {
    const dataPath = history.location.pathname.split('/');
    const nMode = dataPath[dataPath.length - 1];
    setMode(nMode);
    if (nMode == 'edit') {
      // Edit
      getUser()
        .then(res => {
          if (res.hasOwnProperty('name')) {
            console.log('to get user - ', res);
            setUser(res);
          }
        })
        .catch(error => {
          handleToBack();
        })
      ;
    }
  };

  const userDefault = {
    photoUrl: ''
  };

  React.useEffect(() => {
    const validationAttributes = [{
      field: 'txt_name',
      name: 'name',
      required: true,
      isError: false,
      messageError: ''
    }, {
      field: 'txt_lastName',
      name: 'lastName',
      required: true,
      isError: false,
      messageError: ''
    }, {
      field: 'txt_email',
      name: 'email',
      required: true,
      isEmail: true,
      isError: false,
      messageError: ''
    }];

    getMode();

    setForm(validationAttributes);
  }, []);
  const filterValidation = field => form.filter(fr => fr.field === field)[0];

  const createUser = () => {
    const url = 'http://localhost:7202/api/v0/users';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userDefault,
        ...user
      })
    };
    return new Promise((resolve, reject) => {
      try {
        fetch(url, options).then(resolve => resolve.json()).then(result => {
          console.log('result api create user - ', result);
          sendAlert('User Created Correctly')('success');
          resolve(true);
        });
      } catch(err) {
        console.log('Error to Saved User - ', err);
        sendAlert('User Saved Error')('error');
        resolve(false);
      }
    });
  };

  const updateUser = () => {
    const url = `http://localhost:7202/api/v0/users/${idUser}`;
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(resolve => resolve.json())
        .then(result => {
          console.log('result api edit user - ', result);
          sendAlert('User Updated Correctly')('success');
          resolve(true);
        })
        .catch(err => {
          console.log('Error to Updated User - ', err);
          sendAlert('User Edit Error')('error');
          resolve(false);
        });
    });
  };

  const handleCreateClick = () => {
    const validation = form.map(validate(user));
    const isError = validation.reduce((acc, curr) => curr.isError || acc, false);
    if (isError) {
      setForm(validation);
    } else {
      if (mode == 'create') {
        createUser().then(isSaved => {
          console.log('is Saved - ', isSaved);
          handleToBack();

        }).catch(err => console.err);
      } else {
        updateUser().then(isSaved => {
          console.log('is Saved - ', isSaved);
          handleToBack();
        }).catch(err => console.err);
      }
    }
  };

  const handleChangeForm = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const getIfError = (field) => {
    const validation = filterValidation(field);
    return validation ? validation.isError : false;
  };

  const getMessageError = (field) => {
    const validation = filterValidation(field);
    return validation ? validation.messageError : '';
  };

  return (
    <div>
      <h1>{mode} User</h1>

      <Button variant="contained" onClick={handleToBack}>Back</Button>

      <div className="content">
        <form className="box">
          <TextField
            required
            error={getIfError('txt_name')}
            helperText={getMessageError('txt_name')}
            name="name"
            id="txt_name"
            label="Name"
            onChange={handleChangeForm}
            defaultValue={user.name || ''}
            value={user.name || ''}
          />
          <TextField
            required
            error={getIfError('txt_lastName')}
            helperText={getMessageError('txt_lastName')}
            name="lastName"
            id="txt_lastName"
            label="Last Name"
            onChange={handleChangeForm}
            defaultValue={user.lastName || ''}
            value={user.lastName || ''}
          />
          <TextField
            required
            error={getIfError('txt_email')}
            helperText={getMessageError('txt_email')}
            name="email"
            id="txt_email"
            label="Email"
            type="email"
            onChange={handleChangeForm}
            defaultValue={user.email || ''}
            value={user.email || ''}
          />

          <Button variant="contained" color="primary" onClick={handleCreateClick}>
            {mode}
          </Button>
        </form>
      </div>
    </div>
  );
};


export default CreateUpdateUser;
