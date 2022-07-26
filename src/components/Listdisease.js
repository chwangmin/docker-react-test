import React, {useEffect, useState} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Link} from "react-router-dom";

export default function Listdisease() {
  const useGetData = () => {
    const [ListDisease, setListDisease] = useState('');

    const getListDisease = async () => {
      const postUrl = "/condition";
      await axios.get(postUrl)
      .then((response) => {
        setListDisease(response.data);
        console.log("성공");
      }).catch(function(error){
        console.log("실패");
      });
    }

    return {
      ListDisease,
      getListDisease,
    }
  }
  
  const { ListDisease, getListDisease  } = useGetData();
  useEffect(()=>{
    getListDisease()
  },[]);

  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {ListDisease && ListDisease.map((disease) => (
            <>
            <Link to={`/infodisease/${disease.eng_name}`} style={{ textDecoration: 'none', color:'black'}}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={<Typography variant="h5" component="div" align="left" style={{textDecoration: 'none' }}>{disease.kr_name}</Typography>}/>
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            </>
          ))} 
        </List>
      </nav>
    </Box>
  );
}