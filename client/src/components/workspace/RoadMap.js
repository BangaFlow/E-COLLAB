import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  PageHeader, 
  Tag, 
  List, 
} from 'antd'
import { DragDropContext } from 'react-beautiful-dnd'
import getColumnsFetch from './getColumns_fetch'
import updateOneColumnFetch from './updateColumn_fetch'
import updateTwoColumnFetch from './updateTwoColumns_fetch'
import Column from './column'

// Breadcrumb routes
const routes = [
    {
      path: "",
      breadcrumbName: "Home",
    },
    {
      path: "roles",
      breadcrumbName: "Workspace",
    },
    {
      breadcrumbName: "Road Map",
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

function RoadMap() {

    const [data, setData] = useState([])
    const onDragEnd = result => {
    // TODO: reorder our column
      const { destination, source, draggableId } = result

      if(!destination) {
        return
      }
      if(
        destination.droppableId === source.droppableId 
        && destination.index === source.index
      ) {
        return
      }
      
      const start = data.find(col => col.id === source.droppableId)
      const finish = data.find(col => col.id === destination.droppableId)

      // Reorder same column
      if(start === finish) {
        const newTasksIds = Array.from(start.taskIds)
        newTasksIds.splice(source.index, 1)
        newTasksIds.splice(destination.index, 0, draggableId)
  
        updateOneColumnFetch(start.id, JSON.stringify(newTasksIds))
  
        const newCols = data.map( col => {
          if(col.id === source.droppableId) {
            col = {
              ...start,
              taskIds: newTasksIds,
            }
          }
          return col
        })
  
        setData(newCols)
        return
      }

      // Move items between columns
      const startTaskIds = Array.from(start.taskIds)
      const startTasks = Array.from(start.tasks)
      startTaskIds.splice(source.index, 1)
      const newTasks = startTasks.filter(task => task.id !== draggableId)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
        tasks: newTasks
      }

      const finishTaskIds = Array.from(finish.taskIds)
      const finishTasks = Array.from(finish.tasks)
      finishTaskIds.splice(destination.index, 0, draggableId)
      finishTasks.splice(0, 0, startTasks.find(task => task.id === draggableId))
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
        tasks: finishTasks

      }

      const newData = data.map( col => {
        if(col.id === start.id) {
          updateTwoColumnFetch(start.id, JSON.stringify(startTaskIds), JSON.stringify(newTasks.map(task => task.id)))
          col = newStart
        }
        if(col.id === finish.id) {
          updateTwoColumnFetch(finish.id, JSON.stringify(finishTaskIds), JSON.stringify(finishTasks.map(task => task.id)))
          col = newFinish
        }
        return col
      })
      // console.log(newData)
      setData(newData)
    }

    // Fetch users at first render & on users list change
    useEffect(() => {
      getColumnsFetch().then((data) => setData(data.columns))
    }, [])

    return (
      <>
      <PageHeader
        title="Road Map"
        className="site-page-header"
        subTitle="This is a subtitle"
        tags={<Tag color="blue">Running</Tag>}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
        style={{ marginBottom: "2em" }}
        breadcrumb={{ routes, itemRender }}
      ></PageHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <List
        style={{left: "3%",width: "95%"}}
        grid={{
            gutter: 50,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Column key={item.id} toParent={{column: data, changeData:(items) => setData(items)}} column={item} tasks={item.taskIds.map(taskId => item.tasks.find(task => task.id === taskId ))} />
            </List.Item>
          )}
        />
      </DragDropContext>
      </>
    )
}

export default RoadMap
