import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Table, Empty, Tag, notification, Popconfirm, Divider, Button, Space, Input, Avatar, PageHeader } from 'antd'
import { SearchOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons'
import deleteUserFetch from './deleteUser_fecth'
import getUsersFetch from './getUsers_fetch'
import { Link } from 'react-router-dom'
import { history } from '../../helpers/history'

// Breadcrumb routes
const routes = [
  {
    path: "",
    breadcrumbName: "Home",
  },
  {
    path: "users",
    breadcrumbName: "Users",
  },
  {
    breadcrumbName: "List",
  },
]
// For the breadcrumb routes
function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
  )
}


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
      openNotificationWithIcon('info', 'The process of deletion was canceled!')
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
          width: 40,
          dataIndex: 'avatarUrl',
          key: 'avatarUrl',
          align: 'center',
          render: (avatarUrl) =>avatarUrl ? <Avatar shape="square" src={avatarUrl} style={{verticalAlign: 'middle'}} />:<Avatar shape="square" style={{ color: '#f56a00', backgroundColor: '#fde3cf', verticalAlign: 'middle'}} icon={<UserOutlined />}/>,
        },
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
          ...getColumnSearchProps('email'),
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
              <a href={`/app/moduser/${record.id}`} style={{ marginRight: 16, color: 'MEDIUMAQUAMARINE' }}>Update</a>
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

      const getAge = (birthDate) => {
        const birthYear = moment.unix(birthDate / 1000).year()
        const currentYear = new moment().year()
        return currentYear - birthYear
      }

    return (
        <div>
            {/*<pre>{JSON.stringify(users, null, 2)}</pre>*/}
            {users.length > 0 
            ?
            <>
              <PageHeader
                title="Users List"
                className="site-page-header"
                subTitle="You can check the list of users here."
                tags={<Tag color="blue">Running</Tag>}
                extra={[
                  <Button
                    key="1"
                    icon={<UserAddOutlined />}
                    type="dashed"
                    onClick={() => history.push('/app/adduser')}
                  >
                    Add a new user
                  </Button>,
                ]}
                avatar={{
                  src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                }}
                style={{ marginBottom: "2em" }}
                breadcrumb={{ routes, itemRender }}
              ></PageHeader>
              <Table 
              columns={columns} 
              dataSource={users} 
              rowKey={record => record.id} 
              expandable={{
                expandedRowRender: record => <p style={{ margin: 0, paddingLeft: "1rem" }}>{`${record.name} is  ${record.gender ? record.gender  : 'of unkown gender'}, who is ${record.birthDate ? getAge(record.birthDate) + ' years old.' : 'of unkown age.'}`}</p>
              }}        
            />
            </>
            : 
            <>
            <PageHeader
                title="Users List"
                className="site-page-header"
                subTitle="There is no users at the moment."
                tags={<Tag color="blue">Running</Tag>}
                extra={[
                  <Button
                    key="1"
                    icon={<UserAddOutlined />}
                    type="dashed"
                  >
                    Add a new user
                  </Button>,
                ]}
                avatar={{
                  src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                }}
                style={{ marginBottom: "2em" }}
                breadcrumb={{ routes, itemRender }}
            ></PageHeader>
            <Table  columns={columns} dataSource={users} rowKey={record => record.id}  ><Empty /></Table>
            </>
            }
        </div>
    )
}

export default ListUsers
