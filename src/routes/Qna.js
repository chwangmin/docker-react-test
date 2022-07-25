import React, { useState } from "react";
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
import {Link, useNavigate, useLocation} from "react-router-dom";
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
  const location = useLocation();
  //질문 수정이랑 삭제, 답변 작성, 수정/삭제 로그인 안하면 못하는 거 추가

    return (
        <>
            <div>
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
                              질문입니다
                            </Typography>
                            <hr/>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                              <Typography variant="h6" gutterBottom component="div" padding="10px 20px">
                                생성일자 : 
                              </Typography>
                              </Grid>
                              <Grid item xs={6}>
                              <Typography variant="h6" gutterBottom component="div" padding="10px 10px">
                                수정일자 :
                              </Typography>
                              </Grid>
                            </Grid>
                            </Paper>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Link to="/Question" style={{ textDecoration: 'none' }}>
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
                          <Link to={`${location.pathname}/qna/3`} style={{ textDecoration: 'none' }}>
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