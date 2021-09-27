import React,{useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import Alert from '@mui/material/Alert';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';

import  './style.css'
import { Snackbar } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoList = () => {
    const [task, setTask] = useState('');
    const [updateIndex, setUpdateIndex] = useState(0)
    const [taskList, setTaskList] = useState(['Wake up early morning','Go for morning walk','Assign yourself daily task']);
    const [flag, setFlag] = useState(false)
    const [complete, setComplete] = useState(false)
    const [add, setAdd] = useState(false)
    const [Edit, setEdit] = useState(false)
    const [alertMeg, setAlertMeg] = useState(false)
    const [del, setDel] = useState(false)
                                                                     

    
    const ctaHandler = () =>{
        if(task != ''){
            const newTodo = task
            setTaskList([...taskList , newTodo])
            setAdd(true)
        }else{
            setAlertMeg(true)
        }
        setTask('')
    }
    const deleteHandler = (id) =>{
        const todo = taskList.filter((work , i)=>{
            if(i !== id){
                return work
            }
        }
        )
        setDel(true)
        setTaskList([...todo])
    }

    const editHandler = (item , id) =>{
        setUpdateIndex(id)
        setTask(item)
        setFlag(true)
    }
    const ctaUpdateHandler = () =>{
        
        if(task != ""){
            let updateTask = task 
            let newTask = taskList.map((tasks , id)=>{
                if(updateIndex === id){
                    return updateTask
                }
                else{
                    return tasks
                }
            })
            setTaskList([...newTask]);
            setEdit(true) 
            setTask('')
        }else{
            setAlertMeg(true)
        }
        setFlag(false)
        
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setComplete(false);
      };
      const alertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertMeg(false);
      };
      const addClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAdd(false);
      };
      const editClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setEdit(false);
      };
      const delClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setDel(false);
      };


    const List = taskList.map((item ,id) =>
    <li>
        <Checkbox {...label} color="success" onClick={()=>setComplete(true)} />
        <Snackbar open={complete} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Task is completed Successfully
        </Alert>
        </Snackbar>
        {item}
    <DeleteIcon onClick={()=>deleteHandler(id)} className='list-button' color = 'error' />
    <Snackbar anchorOrigin={{ vertical: 'bootom', horizontal: 'right'}}
                    open={del}
                    onClose={delClose}
                    autoHideDuration={6000}>
                <Alert severity="error" variant="filled" sx={{ width: '100%' }} icon={<DeleteIcon fontSize='inherit'/>}>
                    Task is Successfully Deleted 
                </Alert>
            </Snackbar>
    <EditIcon onClick= {()=>{editHandler(item , id)}} className='list-button' color = 'secondary' />
    <Divider />
    </li>
    );
    
    

    return (
        <div className='body'>
            <div className='container'>
            <h2>Enter your tasks</h2>
            <div className='input'>
            <input type="text" value={task} placeholder='Enter Your Task' onChange={(e)=>setTask(e.target.value)} />
            {flag ?
            <Fab size='medium' onClick={ctaUpdateHandler}>
                <UpdateIcon  />
            </Fab>
            :
            <Fab color="primary" size='medium' onClick={ctaHandler}>
        <AddIcon />
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
                    open={add}
                    onClose={addClose}
                    autoHideDuration={6000}>
                <Alert severity="info" variant="filled" sx={{ width: '100%' }} icon={<AddCircleOutlineRoundedIcon fontSize='inherit'/>}>
                    Task is Successfully Added
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                    open={Edit}
                    onClose={editClose}
                    autoHideDuration={6000}>
                <Alert severity="info" variant="filled" sx={{ width: '100%' }} icon={<EditAttributesIcon fontSize='inherit'/>}>
                    Task is Successfully Edit    
                </Alert>
            </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                    open={alertMeg}
                    onClose={alertClose}
                    autoHideDuration={6000}>
                <Alert severity="warning" variant="filled" sx={{ width: '100%' }}>
                    Please Enter Task!
                </Alert>
            </Snackbar>
      </Fab>
            }
            
            </div>
            <div className='list'>
            <ul>
                {List}
            </ul>
            </div>
            </div>
            
        </div>
    )
}

export default TodoList;
