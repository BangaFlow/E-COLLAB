import React, { Fragment, useState, useEffect } from "react"
import {
  List,
  Card,
  PageHeader,
  Button,
  Tag,
  Modal,
  Input,
  Form,
  Typography,
  message,
  Alert
} from "antd"
import TextLoop from 'react-text-loop'
import getRolesFetch from "./getRoles_fetch"
import createRoleFetch from "./creatRole_fetch"
import deleteRoleFetch from "./deleteRole_fetch"
import updateRoleFetch from "./updateRole_fetch"
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"

// Notification Message Global config
message.config({
  top: 120,
  duration: 2,
  maxCount: 3,
})

// Breadcrumb routes
const routes = [
  {
    path: "",
    breadcrumbName: "Home",
  },
  {
    path: "roles",
    breadcrumbName: "Roles",
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

function ListRoles() {
  const { Paragraph } = Typography
  const { confirm } = Modal
  const [form] = Form.useForm()
  const [roles, setRoles] = useState([])
  const [visible, setVisible] = useState(false)
  const [alert, setAlert] = useState(false)

  const showModal = () => {
    setVisible(true)
  }
  // Handle the moodal footer elements actions
  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setVisible(false)
    setAlert(false)
  }
  // For update method
  const onEdit = (id, input, name) => {
    if (input !== name) {
      updateRoleFetch(id, input)
      let arr = [...roles]
      arr.forEach((role) => (role.id === id ? (role.name = input) : role))
      setRoles(arr)
      message.success({ content: 'Role updated successfuly!'});
    }
  }
  // For the form inside the create modal
  const onFinish = (values) => {
    console.log("These are form values :", values)
    createRoleFetch(values.name)
    form.resetFields()
    setAlert(true)
  }
  // for deletion button
  const showDeleteConfirm = (id) => {
    confirm({
      centered: true,
      title: "Confirmation",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure delete this task?",
      okText: "Yes, Delete it.",
      okType: "danger",
      cancelText: "No, Keep it.",
      onOk() {
        console.log("OK")
        deleteRoleFetch(id)
        setRoles(roles.filter((role) => role.id !== id))
        message.loading({ content: 'Deleting Role...', key: 'updatable' });
        setTimeout(() => {
        message.success({ content: 'Role deleted successfuly!', key: 'updatable', duration: 3 });
      }, 400)
      },
      onCancel() {
        console.log("Cancel")
        message.info({ content: 'Role deletion canceled!'});
      },
    })
  }

  // Fetch users at first render & on users list change
  useEffect(() => {
    getRolesFetch().then((data) => setRoles(data.roles))
  }, [visible])

  return (
    <Fragment>
      <PageHeader
        title="Roles List"
        className="site-page-header"
        subTitle="You have everything related to roles here."
        tags={<Tag color="blue">Running</Tag>}
        extra={[
          <Button
            key="1"
            icon={<AppstoreAddOutlined />}
            type="dashed"
            onClick={showModal}
          >
            Add a new role
          </Button>,
        ]}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
        style={{ marginBottom: "2em" }}
        breadcrumb={{ routes, itemRender }}
      ></PageHeader>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        dataSource={roles}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              title={
                <Paragraph
                  editable={{
                    onChange: (content) => onEdit(item.id, content, item.name),
                  }}
                >
                  {item.name}
                </Paragraph>
              }
              extra={
                <Button
                  shape="circle-outline"
                  type="dashed"
                  icon={<DeleteOutlined />}
                  onClick={() => showDeleteConfirm(item.id)}
                  danger
                ></Button>
              }
            >
              Role description
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="New Role"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: "Please input the role name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        {alert && <Alert message={
        <TextLoop interval={2000} mask>
          <div>Role created successufly.</div>
          <div>No further inserts?</div>
          <div>Click the X icon to close this window.</div>
        </TextLoop>
        }
        type="success" banner />}
      </Modal>
    </Fragment>
  )
}

export default ListRoles
