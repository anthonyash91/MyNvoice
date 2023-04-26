import { signUp } from '../../utilities/users-service';
import { useState } from 'react';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import states from '../../utilities/states';
import Button from '../Button/Button';

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    logo: '',
    firstName: '',
    lastName: '',
    email: '',
    userCompany: '',
    password: '',
    confirm: ''
  });

  const [userAddress, setUserAddress] = useState({
    userStreet: '',
    userCity: '',
    userState: '',
    userZipCode: ''
  });

  const [error, setError] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });

    setError('');
  };

  const handleChangeAddress = (evt) => {
    setUserAddress({
      ...userAddress,
      [evt.target.name]: evt.target.value
    });

    setError('');
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formDataCopy = { ...formData, userAddress };
      delete formDataCopy.confirm;
      const user = await signUp(formDataCopy);
      setUser(user);
    } catch (error) {
      setError(
        'Sign up failed. Username and/or email address may already be in use.'
      );
    }
  };

  const uploader = Uploader({
    apiKey: 'public_FW25b3h8aR2hb4QHapA4e1NkptXN'
  });

  const options = {
    multi: false,
    layout: 'modal',
    editor: {
      images: {
        crop: true,
        cropShape: 'rect'
      }
    },
    showFinishButton: true,
    showRemoveButton: false,
    maxFileCount: 1
  };

  const disable = formData.password !== formData.confirm;

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
        required
      />

      <input
        type="text"
        name="userCompany"
        value={formData.userCompany}
        onChange={handleChange}
        placeholder="Company Name"
        required
      />

      <input
        type="text"
        name="userStreet"
        value={userAddress.userStreet}
        onChange={handleChangeAddress}
        placeholder="Street Address"
        required
      />

      <input
        type="text"
        name="userCity"
        value={userAddress.userCity}
        onChange={handleChangeAddress}
        placeholder="City"
        required
      />

      <select name="userState" onChange={handleChangeAddress}>
        <option value="" defaultValue hidden>
          Choose a state
        </option>

        {states?.map((state, i) => {
          return <option value={state}>{state}</option>;
        })}
      </select>

      <input
        type="text"
        name="userZipCode"
        value={userAddress.userZipCode}
        onChange={handleChangeAddress}
        placeholder="Postal Code"
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <input
        type="password"
        name="confirm"
        value={formData.confirm}
        onChange={handleChange}
        placeholder="Confirm password"
        required
      />

      <button
        buttonFunction={() => {
          setFormData({
            ...formData,
            logo: `${
              companyLogo === ''
                ? 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x488-rddkk3u9.png'
                : companyLogo
            }`
          });
        }}
      >
        sign up
      </button>

      {error ? <div className="error-message">{error}</div> : ''}
    </form>
  );
}
