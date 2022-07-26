import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Popup from '../components/Popup'
import Header from "../components/Header"
import Button from 'react-bootstrap/Button'
import styled from "styled-components";
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Link} from "react-router-dom";

const Wrapper = styled.div`
  height: auto;
  width: 80%;
  margin:0 auto;
  text-align: center;
  border-radius: 0px;
  padding-bottom: 20px;
`;

//임시 더미데이터
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '여드름',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
  ];

 // 이건 좀 수정해야됨
 export default function Judgment(){
    const useGetData = () => {
      const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
      const [authTokens, setAuthTokens] = useState("");

      useEffect(() => {
        if (localStorage.getItem('token') !== null){
          setAuthTokens(true);
        }
        else {
          setAuthTokens(false);
        }
      }, [localStorage.getItem('token')])

      const postScrap = async () => {
        const postUrl = "/archive";
        const postValue = {
          //condition : condition.kr_name,
          condition : itemData.title,
        }
        await axios.post(postUrl, postValue)
        .then((response) => {
            if (response) {
              setPopup({open: true, title: "성공!", message: "스크랩 되었습니다."});
            }                    
        }).catch(function(error){
          console.log(error);
        });
      }

      return {
        popup,
        setPopup,
        authTokens,
        postScrap,
      }
    }

    const { popup, setPopup, authTokens, postScrap } = useGetData();

    return(
        <div>
            <Popup open = {popup.open} setPopup = {setPopup} title = {popup.title} message = {popup.message} callback = {popup.callback}/>
            <Header />
            <br/><br/><br/><br/><br/>
            <Wrapper>
            <Container maxWidth={"xl"}>
                <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                  판단 결과
                </Typography>
                <br/>
                <Grid container spacing={10} align="left">
                    <Grid item xs={6}>
                        <img src="https://source.unsplash.com/random"  width='100%' height='1000px'/>
                    </Grid>                    
                    <Grid item xs={6} align="left">
                        <ImageList sx={{ width: '120%', height: 900 }} cols={3}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                <img
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        <Typography variant="h2" gutterBottom component="div" align="left">
                            이 환부는 "
                            <Link to="/Infodisease/3" style={{ textDecoration: 'none', color:'#168d63' }} variant="body2"> 
                                {itemData[0].title}
                            </Link> 
                            " 으로 보여집니다.
                        </Typography>                  
                      </Grid>
                </Grid> 
                <br/><br/><br/>
                {authTokens ? (
                <Grid item xs={12} align="right">
                  <Link to="/Scrap" style={{ textDecoration: 'none' }}>
                    <Button                     
                      style={{fontSize: "60px", textTransform: "none", padding: "30px 40px" }} 
                      variant="outline-success">
                          스크랩 하기
                    </Button>
                  </Link>
                </Grid>
                )
                : (<></>) }
                </Container>               
            </Wrapper>
        </div>
    );
}
