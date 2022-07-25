import React, {useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header"
import Popup from '../components/Popup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from "styled-components";
import {Link} from "react-router-dom";

const Scrapitem = styled.div`
    height: auto;
    width: 70%;
    margin:0 auto;
    border-radius: 0px;
    margin-bottom : 50px;
`;

const cardData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '여드름',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Fern',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      link : '/',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      link : '/',
    },
  ];

export default function Scrap(){
  const useGetData = () => {
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const [ListScrap, setListScrap] = useState("");
    const [ScrapId, setScrapId] = useState("");

    const getListScrap = async () => {
      const postUrl = "/archive/";
      await axios.get(postUrl)
      .then((response) => {
        setListScrap(response.data);
        console.log(response.data);
        console.log("성공");
      }).catch(function(error){
        console.log(error);
      });
    }

    const deleteScrap = async () => {
      const postUrl = `/archive/${ScrapId}/`;
      await axios.delete(postUrl)
      .then((response) => {
        setPopup({open: true, title: "성공!", message: (response.data.message)});
        setScrapId(null);
        console.log("삭제 성공");
      }).catch(function(error){
        console.log(error);
      });
    }

    useEffect(()=>{
      getListScrap()
    },[]);

    return {
      ListScrap,
      popup,
      setPopup,
      deleteScrap,
      setScrapId,
    }
  }
  
  const { ListScrap, popup, setPopup, deleteScrap, setScrapId } = useGetData();

/*
    return (
      <>
          <div>
            <Popup open = {popup.open} setPopup = {setPopup} title = {popup.title} message = {popup.message} callback = {popup.callback}/>

              <Header />
              <br /><br /><br /><br /><br />
              <Scrapitem>
                  <Container maxWidth={"false"}>
                      <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                              스크랩 기록
                      </Typography>
                      <br />
                      <Grid container spacing={8} >
                          {ListScrap.map((scrap) => (
                              <Grid item xl={3} lg={6} sm={12}>
                                  <Card border='dark'>
                                    <Link to={`/infodisease/${scrap.condition.id}`} style={{ textDecoration: 'none', color:'black'}}>
                                      <Card.Img variant="top" src={scrap.condition.conditionMedia[0].img}/>
                                    </Link>
                                      <Card.Body align='center'>
                                          <Card.Title style={{ fontSize:'30px'}}>{scrap.condition.kr_name}</Card.Title>
                                          <Button
                                            style={{fontSize: "20px", textTransform: "none", padding: "10px 50px" }}
                                            variant="danger" 
                                            align-item="center"
                                            onClick={ () => {
                                              setScrapId(scrap.id)
                                              deleteScrap() 
                                            }
                                            }>
                                            삭제
                                          </Button>    
                                      </Card.Body>                                                                          
                                  </Card>                                    
                              </Grid>
                          ))}
                      </Grid>
                  </Container>
              </Scrapitem>
          </div>
      </>
  );
*/
    return (
        <>
            <div>
                <Header />
                <br /><br /><br /><br /><br />
                <Scrapitem>
                    <Container maxWidth={"false"}>
                        <Typography variant="h2" gutterBottom component="div" align="left" style={{ textDecoration: 'none', color:'#168d63' }}>
                                스크랩 기록
                        </Typography>
                        <br />
                        <Grid container spacing={8} >
                            {cardData.map((data) => (
                                <Grid item xl={3} lg={6} sm={12}>
                                    <Card border='dark'>
                                      <Link to={data.link} style={{ textDecoration: 'none', color:'black'}}>
                                        <Card.Img variant="top" src={data.img}/>
                                      </Link>
                                        <Card.Body align='center'>
                                            <Card.Title style={{ fontSize:'30px'}}>{data.title}</Card.Title>
                                            <Button
                                              style={{fontSize: "20px", textTransform: "none", padding: "10px 50px" }}
                                              variant="danger" 
                                              align-item="center"
                                              /*onClick={() => deleteFileImage()} */>
                                              삭제
                                            </Button>    
                                        </Card.Body>                                                                          
                                    </Card>                                    
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Scrapitem>
            </div>
        </>
    );
}