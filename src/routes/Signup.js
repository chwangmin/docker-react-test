import React, { useState, useEffect} from 'react';
import Popup from '../components/Popup'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components";
import logo from "../images/Logo.png";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

const Logo = styled.span`
    margin-top: 20px;
    margin-left: 30px;
    display: flex;
`;

const theme = createTheme();

export default function Signup() {
  const useGetData = () => {
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const [isdoctor, setIsdoctor] = useState(false);
    const [account, setAccount] = useState({
        nickname: "",
        password: "",
        email: "",
        confirmpassword: "",
    });

    const onAccountHandler = (event) => {
      setAccount({
          ...account,
          [event.target.name]: event.target.value,
      });
    }

    const onChangeDoctor = ((event) => {
      setIsdoctor(event.target.checked);
    });

    const postData = async () => {
      const postUrl = "/members/register/";
      const postValue = {     
        nickname: account.nickname,   
        password: account.password,
        email: account.email,
        doctor_flag: isdoctor,
      }
      await axios.post(postUrl, postValue)  
      .then((response) => {
          if (response.status === 200) {
            localStorage.clear();
            setPopup({open: true, title: "성공!", message: (response.data.message), callback: function(){
              navigate("/login",{replace:true});
            }});
          } else if(response.status === 400){
            setPopup({open: true, title: "실패!", message: (response.data.message)});
          }
      }).catch(function(error){
        console.log(error);
      });
    }

    //이게 handleSignup역할을 함
    const onSubmit = (event) => {
      event.preventDefault()
      //잘 등록 되는지 콘솔로 확인
      console.log({
        nickname: account.nickname,
        email: account.email,
        password: account.password,
        confirmpassword: account.confirmpassword,
        doctor_flag: isdoctor,
      });
      // 위 주석부터 여기까지 나중에 지울 예정

      if(!(account.nickname && account.email && account.password && account.confirmpassword)){
        setPopup({open: true, title: "회원가입 에러!", message: "전부 입력하셔야 합니다."});
      }
      else if(account.password !== account.confirmpassword) {
        setPopup({open: true, title: "회원가입 에러!", message: "비밀번호와 비밀번호확인은 같아야 합니다."});
      }
      else{
        postData();
      }
    }

    return{
      onAccountHandler,
      onSubmit,
      onChangeDoctor,
      isdoctor,
      popup,
      setPopup,
    }
  }

  const navigate = useNavigate();
  const { onAccountHandler, onSubmit, onChangeDoctor, isdoctor, popup, setPopup  } = useGetData();

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
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }} >
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={8}>
                  <TextField 
                    required
                    fullWidth
                    id="nickname"
                    label="아이디"
                    name="nickname"
                    type="id"
                    autoFocus
                    onChange={onAccountHandler}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={onAccountHandler}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                    onChange={onAccountHandler}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    label="비밀번호 확인"
                    onChange={onAccountHandler}
                  />
                </Grid>
                <Grid item xs={8}>
                  <FormControlLabel
                    control={<Checkbox id="doctor_flag" name="doctor_flag" color="success" checked={isdoctor} onChange={onChangeDoctor}/>}
                    label="의사인 경우 체크하세요"
                  />
                </Grid>
                <Grid item xs={8}>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    color = "success">
                    회원가입
                    </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
          <Logo>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img width="400px" height="100px" classname="camture" src={logo} alt="wrapkit" />
              </Link>
          </Logo>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};