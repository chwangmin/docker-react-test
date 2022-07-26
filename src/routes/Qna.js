import React, { useEffect, useState } from "react";
import Header from "../components/Header"
import Popup from '../components/Popup'
import Card from 'react-bootstrap/Card'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button'
import ReactButton from 'react-bootstrap/Button'
import Container from '@mui/material/Container';
import styled from "styled-components";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import {Formik } from "formik";
import BootstrapForm from "react-bootstrap/Form";
import axios from 'axios'

const Wrapper = styled.div`
    height: auto;
    width: 80%;
    margin:0 auto;
    border-radius: 0px;
    margin-bottom : 50px;
`;

export default function Qna(){
  const useGetData = () => { //질문 수정이랑 삭제, 답변 작성, 수정/삭제 로그인 안하면 못하는 거 추가
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const [Question, setQuestion] = useState("");
    const [Answer, setAnswer] = useState("");
    const [user, setUser] = useState("")
    const {diseaseid, qnaid} = useParams();
    const navigate = useNavigate();
    
    const getUserData = async () => {
      const postUrl = "/user";
      await axios.get(postUrl)
      .then((response) => {
          setUser(response.data);
          console.log(response.data);
          console.log("성공");
      }).catch(function(error){
          console.log("실패");
      });
  }

    const getQuestion = async () => {
      const postUrl = `/condition/${diseaseid}/question/${qnaid}`;
      await axios.get(postUrl)
      .then((response) => {
        setQuestion(response.data);
        console.log(response.data);
        console.log("질문 가져오기 성공");
      }).catch(function(error){
        console.log(error);
      });
    }

    const deleteQuestion = async () => {
      const postUrl = `/condition/${diseaseid}/question/${qnaid}`;
      /*
      const postValue = {
        q_id : `${qnaid}`
      }
      */
      await axios.delete(postUrl)
      .then((response) => {
        setPopup({open: true, title: "성공!", message: (response.data.message), callback: function(){
          navigate(`/infodisease/${diseaseid}`,{replace:true});
        }}); 
        console.log("질문 삭제 성공");
      }).catch(function(error){
        console.log(error);
      });
    }

    const getAnswer = async () => {
      const postUrl = `/condition/${diseaseid}/question/${qnaid}/answer/${qnaid}`;
      await axios.get(postUrl)
      .then((response) => {
        setAnswer(response.data);
        console.log(response.data);
        console.log("답변 가져오기 성공");
      }).catch(function(error){
        console.log(error);
      });
    }

    const deleteAnswer = async () => {
      const postUrl = `/condition/${diseaseid}/question/${qnaid}/answer/${qnaid}`;
      /*
      const postValue = {
        a_id : `${qnaid}`
      }
      */
      await axios.delete(postUrl)
      .then((response) => {
        setPopup({open: true, title: "성공!", message: (response.data.message), callback: function(){
          navigate(`/infodisease/${diseaseid}`,{replace:true});
        }}); 
        console.log("답변 삭제 성공");
      }).catch(function(error){
        console.log(error);
      });
    }
    
    useEffect(()=>{
      getUserData();
      getQuestion()
      getAnswer()
    },[]);

    return {
      popup,
      setPopup,
      Question,
      Answer,
      deleteQuestion,
      deleteAnswer,
      qnaid,
    }
  }

  const location = useLocation();
  const {popup, setPopup, Question, Answer, deleteQuestion, deleteAnswer, qnaid } = useGetData();
  

    return (
        <>
            <div>
            <Popup open = {popup.open} setPopup = {setPopup} title = {popup.title} message = {popup.message} callback = {popup.callback}/>
                <Header />
                <br /><br /><br /><br /><br />   
                <Wrapper>
                    <Typography variant="h2" gutterBottom component="div" align="center" style={{ textDecoration: 'none', color:'#168d63' }}>
                          질문 & 답변 상세정보
                    </Typography> 
                    <Container maxWidth={"xl"}>
                      <Grid container spacing={8}>
                        <Grid item xs={12}>
                          <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                                증상 질문
                          </Typography>                    
                          <Box sx={{ width: '100%'}}>
                            <Paper elevation={3}>
                            <Typography variant="h4" gutterBottom component="div" padding="10px 30px">
                              {Question.content}
                            </Typography>
                            <hr/>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                              <Typography variant="h6" gutterBottom component="div" padding="10px 20px">
                                생성일자 : {Question.created_at}
                              </Typography>
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="h6" gutterBottom component="div" padding="10px 10px">
                                수정일자 : {Question.modified_at}
                              </Typography>
                              </Grid>
                            </Grid>
                            </Paper>
                          </Box>
                        </Grid>
                        {/* {user.id === Question.user ? (
                          <Grid item xs={6}>
                            <Link to={`${location.pathname}/../../question/${qnaid}`} style={{ textDecoration: 'none' }}>
                              <Button 
                              style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                              variant="success"
                              >
                                질문 수정
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item xs={6}>
                            <Button 
                            style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                            variant="danger"
                            onClick={deleteQuestion}
                            >
                              질문 삭제
                            </Button>
                          </Grid>
                        ) : <></> } */}
                        <Grid item xs={6}>
                          <Link to={`${location.pathname}/../../question/${qnaid}`} style={{ textDecoration: 'none' }}>
                            <Button 
                            style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                            variant="success">
                              질문 수정
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item xs={6}>
                          <Button 
                          style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                          variant="danger">
                            질문 삭제
                          </Button>
                        </Grid>

                        {/* {Answer ? (
                          <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                                  증상 답변
                            </Typography>                    
                            <Box sx={{ width: '100%'}}>
                              <Paper elevation={3}>
                              <Typography variant="h4" gutterBottom component="div" padding="20px 30px">
                                답변이 없습니다.
                              </Typography>
                              </Paper>
                            </Box>
                          </Grid>
                          {user.doctor_flag === true ? (
                            <Grid item xs={12} align="center">
                              <Link to={`${location.pathname}/answer`} style={{ textDecoration: 'none' }}>
                                <Button 
                                style={{fontSize: "40px", textTransform: "none", width: "50%", height: "100px" }} 
                                variant="success">
                                  답변 작성
                                </Button>
                              </Link>
                            </Grid>
                          ): <></>}
                        )  
                        : (
                          <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                                  증상 답변
                            </Typography>                    
                            <Box sx={{ width: '100%'}}>
                              <Paper elevation={3}>
                              <Typography variant="h4" gutterBottom component="div" padding="20px 30px">
                                {Answer.content}
                              </Typography>
                              </Paper>
                            </Box>
                          </Grid>
                          { user.id === Answer.user ? (
                            <Grid item xs={6}>
                              <Link to={`${location.pathname}/answer`} style={{ textDecoration: 'none' }}>
                                <Button 
                                style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                                variant="success"
                                >
                                  답변 수정
                                </Button>
                              </Link>
                            </Grid>
                            <Grid item xs={6}>
                              <Button 
                              style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                              variant="danger"
                              onClick={deleteAnswer}
                              >
                                답변 삭제
                              </Button>
                            </Grid>
                          ): <></> }
                        )
                        } */}
                        <Grid item xs={12}>
                          <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                                증상 답변
                          </Typography>                    
                          <Box sx={{ width: '100%'}}>
                            <Paper elevation={3}>
                            <Typography variant="h4" gutterBottom component="div" padding="20px 30px">
                              답변이 없습니다.
                            </Typography>
                            </Paper>
                          </Box>
                        </Grid>
                        <Grid item xs={12} align="center">
                          <Link to={`${location.pathname}/answer`} style={{ textDecoration: 'none' }}>
                            <Button 
                            style={{fontSize: "40px", textTransform: "none", width: "50%", height: "100px" }} 
                            variant="success">
                              답변 작성
                            </Button>
                          </Link>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                                증상 답변
                          </Typography>                    
                          <Box sx={{ width: '100%'}}>
                            <Paper elevation={3}>
                            <Typography variant="h4" gutterBottom component="div" padding="20px 30px">
                              답변입니다
                            </Typography>
                            </Paper>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Link to={`${location.pathname}/answer/3`} style={{ textDecoration: 'none' }}>
                            <Button 
                            style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                            variant="success">
                              답변 수정
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item xs={6}>
                          <Button 
                          style={{fontSize: "40px", textTransform: "none", width: "100%", height: "100px" }} 
                          variant="danger">
                            답변 삭제
                          </Button>
                        </Grid>

                      </Grid>
                    </Container>
                </Wrapper>
            </div>
        </>
      );
}