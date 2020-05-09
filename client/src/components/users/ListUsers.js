import React, { useState, useEffect } from 'react'
import { Table, Empty, Tag, notification, Popconfirm, Divider, Button } from 'antd'
import deleteUserFetch from './deleteUser_fecth'
import getUsersFetch from './getUsers_fetch'
import { Link } from 'react-router-dom'

function ListUsers() {

    const [users, setUsers] = useState([])

    const confirmDeleteUser = userId => {
      deleteUserFetch(userId)
      setUsers(users.filter(user => user.id !== userId))
      openNotificationWithIcon('success', 'The user was deleted successuflly')
    }

    const cancelDeleteUSer = () => {
      openNotificationWithIcon('error', 'The process of deletion was canceled!')
    }

    useEffect(() => {
      getUsersFetch().then(data => setUsers(data.users))
    }, [])

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
          message: 'User Deletion',
          description: message,
          placement: 'bottomRight',
        })
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href='/'>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Roles',
          dataIndex: 'roles',
          key: 'roles',
          render: roles => (
            <span>
              {
                roles.map( role => {
                  let color = role.name === 'Student' ? 'green' : 'geekblue'
                  if (role.name === 'Admin') {
                    color = 'volcano'
                  }
                return (
                  <Tag color={color} key={role.id}>
                    {role.name.toUpperCase()}
                  </Tag>
                )
              })}
            </span>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <a href='/' style={{ marginRight: 16, color: 'MEDIUMAQUAMARINE' }}>Update</a>
              <Divider type="vertical" />
              <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => confirmDeleteUser(record.id)}
              onCancel={cancelDeleteUSer}
              okText="Yes"
              cancelText="No"
              >
              {/* eslint-disable-next-line */}
              <a style={{color: 'salmon'}}>Delete</a>
              </Popconfirm>
            </span>
          ),
        },
      ]

    return (
        <div>
            {/*<pre>{JSON.stringify(users, null, 2)}</pre>*/}
            {users.length > 0 
            ?
            <div>
              <div style={{marginBottom: '1.5em'}}>
                <Button type="primary" block><Link to="/app/adduser">Add</Link></Button>
              </div>
              <Table columns={columns} dataSource={users} rowKey={record => record.id} /> 
            </div> 
            
            : 
            <Table columns={columns} dataSource={users} rowKey={record => record.id} ><Empty /></Table>}
        </div>
    )
}

export default ListUsers
