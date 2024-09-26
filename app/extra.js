'use client'
import { useEffect, useState } from 'react'
import { Box, Typography, Stack , Button , Modal ,TextField} from '@mui/material'
import {firestore} from '@/firebase'
import { collection, getDocs, query } from 'firebase/firestore'
//import { transform } from 'next/dist/build/swc'

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap: 3,
  display:'flex',
  flexDirection:'column',

}


export default function Home() {
  const [pantry,setPantry] =useState( [] )
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [itemName ,setItemName] =useState('')
    const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
       pantryList.push(doc.id)
      })
    console.log(pantryList)
     setPantry(pantryList)
    
    }
   useEffect(() => {
    updatePantry()
  }, [])
  
  const addItem=async(item)=> {
    await collection('pantry').setDoc({[item]:true})
    updatePantry()
    setItemName('')
    
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap ={3}
    >


<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx ={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Grocery
          </Typography>
          <Stack width ="300px" direction ={'row'} spacing={2} alignItems="center">
        <TextField 
        id="outlined-basic"
        label="Item" 
        variant="outlined"
        fullWidth 
        value ={itemName} 
        onChange={(e)=>setItemName(e.target.value)}
        />
        <Button
         variant ="outlined"
          onClick={()=>{
          addItem(itemName)
          setItemName('')
          handleClose()
        }} sx={{width:'100px'}}>Add</Button>
        </Stack>
          
        </Box>
      </Modal>
     
      <Button variant="contained" onClick ={handleOpen}>Add</Button>
      <Box border ={'1px solid #333'}  width="300px" display="flex" flexDirection="column" alignItems="center">
      <Box
        width="100px"
        //height="100px"
        bgcolor="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="1px solid #333"
        mb={2} 
        p={2}
        ></Box>
      
        <Typography variant="h2" color="#333" textAlign="center">
          Pantry Items
        </Typography>
       
      </Box>

      <Stack width="300%" height="400px" spacing={2} overflow={"auto"}>
        {pantry.map((i) => (
          <Box
            key={i}
            width="100%"
            minheight="150px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#f0f0f0"
            border="1px solid #ccc" // Optional styling
          >
            <Typography variant="h5" color="#333" textAlign="center">
              {i.charAt(0).toUpperCase() + i.slice(1)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}