import React, { useState } from "react";
import Header from "../components/Header"
import Popup from '../components/Popup'
import Card from 'react-bootstrap/Card'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReactButton from 'react-bootstrap/Button'
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Formik } from "formik";
import BootstrapForm from "react-bootstrap/Form";
import axios from 'axios'

const MaterialForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const Formquestion = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 32px;
    min-width: 1000px;
    border-radius: 8px;
    margin: 10px;
`;


export default function Answer(){
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const [fileImage, setFileImage] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
    const saveFileImage  = (event) => {
      setFileImage(URL.createObjectURL(event.target.files[0]));
      const file = event.target.files[0];
      console.log(file);
    };
  
    const deleteFileImage = (event) => {
      URL.revokeObjectURL(fileImage);
      setFileImage('');
    };

    const onContentHandler = (event) => {
        setContent(event.target.value);
      }
  
    const onSubmit = (event) => {
      event.preventDefault();
      //잘 등록 되는지 콘솔로 확인
      console.log({
        content : content,
        img: fileImage,
      })
  
      if(!(content)){
        setPopup({open: true, title: "에러!", message: "내용을 입력해 주세요!"});
      }
      else {
        postData();
      }
    }
  
    const postData = async () => {
      const postUrl = "/boards/";
      const postValue = {
        content : content,
        img: fileImage,
      }
      // console.log(postVal);
      await axios.post(postUrl, postValue)
      .then((response) => {
          if (response.data.status === "fail") {
              alert(response.data.message);
          }
          else if (response.data.status === "success"){
              localStorage.clear();
              alert(response.data.message);
              navigate("/",{replace:true});
          }
      });
    }

    return (
        <MaterialForm>
            <Popup open = {popup.open} setPopup = {setPopup} title = {popup.title} message = {popup.message} callback = {popup.callback}/>            
            <Header/>

            <Typography variant="h2" gutterBottom component="div" align="center" style={{ textDecoration: 'none', color:'#168d63' }}>
              증상 질문에 대한 답변
            </Typography>

            <Formik>
            {() => (
                <Paper elevation={6}>
                    <Formquestion noValidate onSubmit={onSubmit}>
                        <Box height={20} />
                        <TextField
                            id="filled-multiline-static"
                            label="답변 내용"
                            multiline
                            minRows={20}
                            placeholder="답변을 적으세요."
                            variant="filled"
                            inputProps={{style: {fontSize: 20}}} 
                            InputLabelProps={{style: {fontSize: 20}}} 
                            onChange={onContentHandler}
                        />
                        <Box height={20} />
                            <Grid item xs={12} >
                                <BootstrapForm.Group controlId="formFileLg" className="mb-3">
                                <BootstrapForm.Label style={{fontSize: "30px"}}>(선택사항) 참고 사진을 선택하세요</BootstrapForm.Label>
                                <Grid container spacing={2}>
                                    <Grid item xs={9} >
                                    <BootstrapForm.Control type="file" size="lg" name="img" accept="image/*" onChange={saveFileImage}/>
                                    </Grid>   
                                    <Grid item xs={3} >
                                    <ReactButton
                                        style={{fontSize: "20px", textTransform: "none", padding: "10px 20px" }}
                                        variant="secondary" 
                                        onClick={() => deleteFileImage()}>
                                        삭제
                                    </ReactButton>
                                    </Grid>     
                                </Grid>
                                </BootstrapForm.Group>
                            </Grid>
                        <Box width="50%" height="40%" >
                            {fileImage ? <img className="diseaseImage" alt="diseaseImage" src={fileImage} width="100%" height="100%"/> : <br/>}
                        </Box>           
                        
                        <Box height={30} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button style={{fontSize: "20px"}} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large" color = "success">
                                    작성 완료!
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Link to="/Infodisease" style={{ textDecoration: 'none' }}>
                                    <Button style={{fontSize: "20px"}} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large" color = "error">
                                        작성 취소
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Formquestion>
                </Paper>
            )}
            </Formik>
      </MaterialForm>
    );
}