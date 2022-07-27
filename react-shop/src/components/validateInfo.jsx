export default function validateInfo(values) {
    let errors = {};
    if (!values.name.trim()) {
        errors.name = 'Name required';
      }
     
    if (!values.phone.trim()) {
      errors.phone = 'Phone required';
    }

    if (!values.address.trim()) {
      errors.address = 'Address required';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    if (!values.confirmpassword) {
      errors.confirmpassword = 'Password is required';
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = 'Passwords do not match';
    }
    return errors;
  }