import React, { useState, useEffect } from 'react'
import { Table, Empty, Tag, notification, Popconfirm, Divider, Button, Space, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import deleteUserFetch from './deleteUser_fecth'
import getUsersFetch from './getUsers_fetch'
import { Link } from 'react-router-dom'

function ListUsers() {

    // Data holder
    const [users, setUsers] = useState([])
    // Search State
    const [search, setSearch] = useState({ searchText:'', searchedColumn: ''})

    // Custom Notification Method
    const openNotificationWithIcon = (type, message) => {
      notification[type]({
        message: 'User Deletion',
        description: message,
        placement: 'bottomRight',
      })
    }
    // For user Deletion Action
    const confirmDeleteUser = userId => {
      deleteUserFetch(userId)
      setUsers(users.filter(user => user.id !== userId))
      openNotificationWithIcon('success', 'The user was deleted successuflly')
    }
    const cancelDeleteUSer = () => {
      openNotificationWithIcon('error', 'The process of deletion was canceled!')
    }

    // Fetch users at first render & on users list change
    useEffect(() => {
      getUsersFetch().then(data => setUsers(data.users))
    }, [])

    // Table search methods
    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, searchInput }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} 
            size="small" 
            style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (searchInput,visible) => {
        if (visible) {
          setTimeout(() => searchInput.select());
        }
      },
      render: text =>
        search.searchedColumn === dataIndex ? (
          text.toString()
        ) : (
          text
        ),
    });
    // Tools for search method
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm()
      setSearch({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      })
    }
  
    const handleReset = clearFilters => {
      clearFilters();
      setSearch({ searchText: '' })
    }

    // Table columns
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          ...getColumnSearchProps('name'),
          // render: text => <a href='/'>{text}</a>,
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
