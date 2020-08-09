// Develop: vmgabriel

// Libraries
import React from 'react';

// Material
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidateEmail = data => (!reEmail.test(data.toLowerCase()))
                      ? { error: true, message: 'Email not Valid' }
                      : { error: false, message: '' }
;
const isValidateClear = data => (!data || data === '')
                      ? { error: true, message: 'Data clear' }
                      : { error: false, message: '' }
;

const CreateUpdateUser = () => {
  const [user, setUser] = React.useState({});
  const [form, setForm] = React.useState([]);

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
    setForm(validationAttributes);
  }, []);
  const filterValidation = field => form.filter(fr => fr.field === field)[0];

  const validateControl = ({ name, field }) => (validation) => {
    const result = validation(user[name]);
    let filter = filterValidation(field);
    filter.isError = result.error;
    filter.messageError = result.message;
    return filter;
  };

  const validate = ({ name, field, required, isEmail }) => {
    const validateField = validateControl({ name, field });

    let validationAttribute = {
      name,
      field,
      required,
      isEmail,
      isError: false,
      messageError: ''
    };

    validationAttribute = (required && !validationAttribute.isError)
                        ? validateField(isValidateClear)
                        : validationAttribute;
    validationAttribute = (isEmail && !validationAttribute.isError)
                        ? validateField(isValidateEmail)
                        : validationAttribute;

    return validationAttribute;
  };

  const handleCreateClick = () => {
    setForm(form.map(validate));
  };

  const handleChangeForm = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

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
      <h1>Create User</h1>

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
          />

          <Button variant="contained" color="primary" onClick={handleCreateClick}>
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};


export default CreateUpdateUser;
