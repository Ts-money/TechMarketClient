import React, {useContext, useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {AuthenticationContext} from '../util/Authentication';
import {useForm} from '../util/FormHook';

// LoginPage Page
function LoginPage(props) {
    const context = useContext(AuthenticationContext);
    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, formValues} = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(
            _,
            {
                data: {login: userData}
            }
        ) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err);
        },
        variables: formValues
    });

    function loginUserCallback() {
        loginUser();
    }

    // Renders LoginPage Page
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={formValues.username}
                    error={errors.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={formValues.password}
                    error={errors.password}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.values(errors).forEach((error) => console.log(error))}
        </div>
    );
}

// GraphQL Query to login user.
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default LoginPage;
