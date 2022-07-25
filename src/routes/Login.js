import React, { useState, useEffect} from 'react';
import Popup from '../components/Popup'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../images/Logo.png";
import styled from "styled-components";
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios'

const Logo = styled.span`
    margin-top: 20px;
    margin-left: 30px;
    display: flex;
`;

const theme = createTheme();

export default function Login() {
  const useGetData = () => {
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const [account, setAccount] = useState({
        nickname: "",
        password: "",
    });

    const onAccountHandler = (event) => {
      setAccount({
          ...account,
          [event.target.name]: event.target.value,
      });
    }
    
    const onSubmit = (event) => {
      event.preventDefault();
      //잘 등록 되는지 콘솔로 확인
      const data = new FormData(event.currentTarget);
      console.log({
        nickname: data.get('nickname'),
        password: data.get('password'),
      });
      // 위 주석부터 여기까지 나중에 지울 예정
      if(!(account.nickname && account.password)){
        setPopup({open: true, title: "로그인 에러!", message: "전부 입력하셔야 합니다."});
      }
     else{
      postData();
     }
    };

    const postData = async () => {
      const postUrl = "/members/login/";
      const postValue = {
        nickname: account.nickname,
        password: account.password,
      }
      await axios.post(postUrl, postValue)
      .then((response) => {
          if (response.status === 400) {
            setPopup({open: true, title: "실패!", message: (response.data.message)});
          }
          
          else if (response.status === 200){
            localStorage.clear();
            localStorage.setItem("token", response.data.access);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            setPopup({open: true, title: "성공!", message: "안녕하세요! "+(response.data.username)+"님!", callback: function(){
              navigate("/",{replace:true});
            }});
          }
          
      }).catch(function(error){
        console.log(error);
      });
    }

    return {
      onAccountHandler,
      onSubmit,
      popup,
      setPopup,
    }
  }  

  const navigate = useNavigate();
  const { onAccountHandler, onSubmit, popup, setPopup } = useGetData();
 
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      navigate("/",{replace:true});
    } 
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Popup open = {popup.open} setPopup = {setPopup} title = {popup.title} message = {popup.message} callback = {popup.callback}/>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/1500x1300/?clinic)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
            <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>  
                  <Grid item xs={12}>
                    <TextField 
                      required
                      fullWidth
                      type="id"
                      id="nickname"                
                      name="nickname"
                      label="아이디"
                      autoFocus
                      onChange={onAccountHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호"
                      onChange={onAccountHandler}
                    />
                  </Grid>
                </Grid>
                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                  color = "success">
                  로그인
                </Button>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item >
                    <Link to="/Signup" style={{ textDecoration: 'none', color:'#168d63' }} variant="body2"> 
                      {"회원가입"}
                    </Link>
                  </Grid>
                </Grid>
              </FormControl>
              <br/><br/>
              <Logo>
              <Link to="/" style={{ textDecoration: 'none' }}>
                  <img width="400px" height="100px" classname="camture" src={logo} alt="wrapkit" />
              </Link>
            </Logo>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}