import React, {useState} from 'react'
import TextLoop from 'react-text-loop'
import { Avatar, Card, List, Tag, Typography, Dropdown, Menu, Button,Form, Modal, Radio, Select, Input, Alert, message } from 'antd'
import { FileTextOutlined, EllipsisOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, BugFilled, FireFilled, ToolFilled} from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd'
import getUsersFetch from '../users/getUsers_fetch'
import updateTaskFetch from './updateTask_fetch'

const { Text } = Typography
const { confirm } = Modal
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
message.config({
  top: 120,
  duration: 2,
  maxCount: 3,
})
const ShowAlert = ({alert}) => {
  return (
  <Alert 
  message={
  <TextLoop interval={2000} mask>
    <div>{alert.message}</div>
    <div>No further changes?</div>
    <div>Click the X icon to close this window.</div>
  </TextLoop>
  }
  type={alert.type} banner /> )
}

function Task({deleteTask, updateParents, task, index}) {

    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [users, setUsers] = useState([])
    const [alert, setAlert] = useState({visible: false, message: '', type: ''})
    const initialValues = {
      id: task.id,
      title: task.title,
      type: task.type,
      doers: task.doers.map(member => member.id)
    }

    const showModal = async () => {
      await getUsersFetch().then(data => setUsers(data.users))
      setVisible(true)
    }
    // Handle the moodal footer elements actions
    const handleOk = () => {
      form.submit()
    }

    const handleCancel = () => {
      setAlert({visible: false, message: '', type: ''})
      setVisible(false)
    }

    const onFinish = async (newValues) => {
      console.log("These are form values :", newValues)
      const oldValues = { 
        title: task.title,
        type: task.type,
        doers: task.doers.map(member => member.id)
      }
      if(JSON.stringify(oldValues)===JSON.stringify(newValues)) {
        alert('No changes made!')
        return
      }
      if(JSON.stringify(oldValues)!==JSON.stringify(newValues)) {
        await updateTaskFetch(task.id, newValues.title, newValues.type, JSON.stringify(newValues.doers)).then( () => {
        updateParents(task.id, newValues)
        setAlert({visible: true, message: "Task has been updated successfuly!", type: "success" })
        return
      })
    }
  }

  // for deletion button
  const showDeleteConfirm = () => {
    confirm({
      centered: true,
      title: <strong>Confirmation</strong>,
      icon: <ExclamationCircleOutlined />,
      content: `The task to be deleted is: ${task.title}`,
      okText: "Yes, Delete.",
      okType: "danger",
      cancelText: "No, Keep it.",
      onOk() {
        console.log("OK")
        deleteTask.task(task.id, index)
      },
      onCancel() {
        message.info({ content: 'Task deletion canceled!'})
        console.log("Cancel")
      },
    })
  }
    
    // DropDown Menu
    const menu = (
      <Menu>
        <Menu.Item onClick={showModal} style={{color: "MEDIUMAQUAMARINE"}}>
        <EditOutlined style={{color: "MEDIUMAQUAMARINE"}} />
          Edit
        </Menu.Item>
        <Menu.Item onClick={showDeleteConfirm} style={{color: "salmon"}}>
        <DeleteOutlined style={{color: "salmon"}} />
          Delete
        </Menu.Item>
      </Menu>
    )
    const DropdownMenu = () => {
      return (
        <Dropdown key="more" overlay={menu}>
          <Button
            style={{
              border: 'none',
              padding: 0,
              float: "right"
            }}
          >
            <EllipsisOutlined
              style={{
                fontSize: 20,
                verticalAlign: 'top',
              }}
            />
          </Button>
        </Dropdown>
      )
    }

    return (
        <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card
              size="small"
              style={{
                borderRadius: "7px", 
                border: "1px solid #E4E4E4",
                marginTop: "1rem",
                background: snapshot.isDragging ? '#FBEECC' : 'white'
              }}
            >
              <DropdownMenu key="more" />
              <FileTextOutlined style={{fontSize: "1.4rem", paddingRight: "0.6rem"}}/>
              <Text style={{fontWeight: "900", textTransform: "capitalize", color: "#333"}} strong>{task.title}</Text><br/>
              {/*List of users */}
              <div style={{paddingTop: "0.8rem", paddingBottom:"0.4rem"}}>
              <List
                grid={{
                    gutter: 16,
                    column: 2
                  }}
                dataSource={task.doers}
                renderItem={(item) => (
                  <List.Item>
                   <Avatar size={24} src={item.avatarUrl ? item.avatarUrl : "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"} style={{marginRight: "0.4rem"}} />
                   <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                  </List.Item>
                )}
                />
              </div>
              <Tag 
              style={{borderRadius: "7px", color: "#4A4A4A", fontWeight: "bold", fontSize: "0.82rem"}}
              color={
                task.type === "Task" 
                ? '#F3EED9' 
                : task.type === "Bug"  
                ? '#FF9790'
                : '#C6FCED'
              }
              >
               {task.type} 
               {
                task.type === "Task" 
                ? <ToolFilled style={{ paddingLeft: "0.6rem"}} /> 
                : task.type === "Bug"  
                ? <BugFilled style={{ paddingLeft: "0.6rem"}} />
                : <FireFilled style={{ paddingLeft: "0.6rem"}} /> 
               }
              </Tag>
            </Card>
          </div>
          <Modal
          title="New Task"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
        >
          <Form
           {...formItemLayout}
           style={{marginRight: '20%'}}
           initialValues={initialValues}
           form={form}
           onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="Task Title"
              rules={[{ required: true, message: "Please give the task a name!" }]}
            >
              <Input placeholder="Write something." />
            </Form.Item>
            <Form.Item 
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: 'Choose a type!'
                }
              ]}
            >
              <Radio.Group buttonStyle="outline">
                <Radio.Button value="Task">Task</Radio.Button>
                <Radio.Button value="Bug">Bug</Radio.Button>
                <Radio.Button value="Epic">Epic</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="doers"
              label="Assign To"
              rules={[
                {
                  required: true,
                  message: 'Choose at least one member!'
                }
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select the members to do this task."
                style={{ width: '100%' }}
              >
                {users.length !== 0 && users.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          {alert.visible && <ShowAlert alert={alert} />}
        </Modal>
        </>
        )}
      </Draggable>
    )
}

export default Task
