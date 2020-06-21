import React, { useState } from 'react'
import TextLoop from 'react-text-loop'
import { 
  Space,
  Tag,
  Typography,
  Form,
  Modal,
  Input,
  Radio,
  Select,
  Alert,
  message
} from 'antd'
import { 
  ClockCircleOutlined, 
  SyncOutlined, 
  CheckCircleOutlined, 
  // EllipsisOutlined,
  PlusOutlined
} from '@ant-design/icons'
import './style.css'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'
import updateTwoColumnFetch from './updateTwoColumns_fetch'
import createTaskFetch from './createTask_fetch'
import deleteTaskFetch from './deleteTask_fetch'
import { useSelector } from 'react-redux'

const { Text } = Typography
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
  <TextLoop interval={3000} mask>
    <div>{alert.message}</div>
    <div>No further inserts?</div>
    <div>Click the X icon to close this window.</div>
  </TextLoop>
  }
  type={alert.type} banner /> )
}

function Column({toParent, column, tasks}) {
    const { title } = column
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const users =  useSelector(state => state.profile.teams[0].members)
    const [alert, setAlert] = useState({visible: false, message: '', type: ''})
    const newTaskIds = Array.from(column.taskIds)

    const showModal = async () => {
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

    // For the form inside the create modal
    const onFinish = async (values) => {
      console.log("These are form values :", values)
      await createTaskFetch(values.title, values.type, JSON.stringify(values.doers))
      .then(async data => {
        const newTasks = Array.from(column.tasks)
        newTaskIds.splice(newTaskIds.length, 0, data.createTask.id)
        newTasks.splice(newTasks.length, 0, data.createTask)
        await updateTwoColumnFetch(column.id, JSON.stringify(newTaskIds), JSON.stringify(newTasks.map(task => task.id)))
        const newCols = toParent.column.map( col => {
          if(col.id === column.id) {
            col = {
              ...column,
              taskIds: newTaskIds,
              tasks: newTasks,
            }
          }
          return col
        })
        toParent.changeData(newCols)
      })
      form.resetFields()
      setAlert({visible: true, message: "Task has been added successfuly!", type: "success" })
    }

    // For task deletion
    const deleteTask = async (taskId, index) => {
      const oldTasks = Array.from(column.tasks)
      newTaskIds.splice(index, 1)
      const newTasks = oldTasks.filter(task => task.id !== taskId)
      await updateTwoColumnFetch(column.id, JSON.stringify(newTaskIds), JSON.stringify(newTasks.map(task => task.id)))
      await deleteTaskFetch(taskId)
      const newCols = toParent.column.map( col => {
        if(col.id === column.id) {
          col = {
            ...column,
            taskIds: newTaskIds,
            tasks: newTasks,
          }
        }
        return col
      })
      toParent.changeData(newCols)
      message.loading({ content: 'Deleting Task...', key: 'updatable' });
      setTimeout(() => {
        message.success({ content: 'Task deleted successfuly!', key: 'updatable', duration: 2 });
      }, 500)
    }

    const updateParents = async (id, newValues) => {
      const newTasks = Array.from(column.tasks)
      const taskIndex = newTasks.findIndex(task => task.id === id)
      const newDoers = newValues.doers.map(doerId => users.find(user => doerId === user.id))
      newTasks.splice(taskIndex, 0, {id, title: newValues.title, type: newValues.type, doers: newDoers})
      const newCols = toParent.column.map( col => {
          if(col.id === column.id) {
            col = {
              ...column,
              tasks: newTasks,
            }
          }
          return col
        })
      toParent.changeData(newCols)
    }

    return (
      <>
        <div>
          <Space>
            <Tag style={{borderRadius: "7px", color: "#4A4A4A", fontWeight: "bold", fontSize: "0.82rem"}}
            icon={title === "Not Started" 
            ? <ClockCircleOutlined /> 
            : title === "In Progress"
            ? <SyncOutlined spin /> 
            : <CheckCircleOutlined />} 
            color={title === "Not Started"
            ? "#FFC7C7" 
            : title === "In Progress"
            ? "#FBEECC" 
            : "#CDE7E1"}
            >
              {title}
            </Tag>
          <Text disabled strong>{tasks && tasks.length}</Text>
          </Space>
          <Space style={{float: "right"}}>
            {/* <EllipsisOutlined className="hoverable" style={{fontSize: "1.4rem", color: "#bbb"}}/> */}
            <PlusOutlined className="hoverable" onClick={showModal} style={{fontSize: "1.3rem", color: "#bbb"}} />
          </Space>
        </div>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{background: snapshot.isDraggingOver ? '#CDE7E1' : null}}
            >
              {tasks && tasks.map((task, index) => <Task key={task.id} task={task} index={index} deleteTask={{task: (id, index) => deleteTask(id, index)}} updateParents={(id, newValues) => updateParents(id, newValues)} />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
    )
}

export default Column
