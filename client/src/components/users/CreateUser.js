import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Button,
  DatePicker,
  AutoComplete,
  notification,
  Radio,
  Select,
  Spin
} from 'antd'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import createUserFetch from './createUser_fetch'
import updateUserFetch from './updateUser_fetch'
import getRolesFetch from './getRoles_fetch'
import getUserFetch from './getUser_fecth'


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 8,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const CreateUser = () => {

  const [form] = Form.useForm()
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [OPTIONS, setOPTIONS] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const { id } = useParams()

  const onFinish = values => {
    console.log('Received values of form: ', values)
    createUserFetch(values.email, values.password, values.username, values.firstName, values.lastName, values.gender, JSON.stringify(values.roles), values.birthDate )
    notification['success']({
      message: 'User Creation',
      description: 'User created successfully!',
      placement: 'bottomRight',
    })
    form.resetFields()
  }

  const OnFinishUpdate = values => {
    console.log('Received values of form: ', values)
    const usernameChanged = values.username !== user.username ? true : false
    const emailChanged = values.email !== user.email ? true : false
    updateUserFetch(id, values.email, values.username, values.firstName, values.lastName, values.gender, JSON.stringify(values.roles), values.birthDate, usernameChanged, emailChanged )
    notification['success']({
      message: 'User Update',
      description: 'User updated successfully!',
      placement: 'bottomRight',
    })
  }

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['@esprit.tn'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  const initialValues = 
  Object.entries(user).length !== 0 ?
  {
    email: user.email,
    username: user.username,
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1],
    birthDate : moment.unix(user.birthDate / 1000),
    gender: user.gender,
    roles: user.roles.map(role => role.id)
  }
  :
  {}
  

  useEffect( () => {
    if(id) {
      getUserFetch(id).then(data => setUser(data.user)).finally(()=> setLoading(false))
    } else{
      setLoading(false)
    }
    getRolesFetch().then(data => setOPTIONS(data.roles))
    // eslint-disable-next-line 
  }, [])
  

  return (
    !loading ?
    <Form
      style={{marginRight: '30%', marginTop: '20%'}}
      {...formItemLayout}
      form={form}
      name="register"
      initialValues={initialValues}
      onFinish={Object.entries(user).length === 0 ? onFinish : OnFinishUpdate}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="What do you want others to call you?">
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="birthDate"
        label="Birth Date"
        rules={[
          {
            required: true,
            message: 'Please provide your birth date.'
          }
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item 
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Choose your gender.'
          }
        ]}
      >
        <Radio.Group buttonStyle="outline">
          <Radio.Button value="Male">Male</Radio.Button>
          <Radio.Button value="Female">Female</Radio.Button>
          <Radio.Button value="Other">Other</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
        hasFeedback
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="E-mail">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="roles"
        label="Roles"
      >
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          style={{ width: '100%' }}
        >
          {OPTIONS.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {Object.entries(user).length === 0 ? <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            pattern: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/,
            message: 'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.'
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
       : null}

      {Object.entries(user).length === 0 ? <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      :null}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" >
          Register
        </Button>
        <Button type="danger" style={{
              margin: '0 16px',
            }}>
          <Link to="/app/users">Cancel</Link>
        </Button>
      </Form.Item>
    </Form>
    :
    <Spin style={{position:"absolute", left: "50%", top: "50%"}} size="large" />

  )
}

export default CreateUser
