import React, {useContext, useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {AuthenticationContext} from '../util/Authentication';
import {useForm} from '../util/FormHook';

// Registration page.
function RegistrationPage(props) {
    const context = useContext(AuthenticationContext);
    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, formValues} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Add user method
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(
            _,
            {
                data: {register: userData}
            }
        ) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            console.log(err);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: formValues
    });

    function registerUser() {
        addUser();
    }


    // Renders registration page
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={formValues.email}
                    error={errors.email}
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
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={formValues.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

}

// GraphQL Mutation Query to register user.
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default RegistrationPage;