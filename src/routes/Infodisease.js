import React, {useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header"
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Link, useParams, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Wrapper = styled.div`
    height: auto;
    width: 80%;
    margin:0 auto;
    border-radius: 0px;
    margin-bottom : 50px;
`;

const QnaData = [
  {
    contentquestion: '나는 읽기 쉬운 마음이야 당신도 스윽 훑고 가셔요 달랠 길 없는 외로운 마음 있지 머물다 가셔요 음 내게 긴 여운을 남겨줘요 사랑을 사랑을 해줘요 할 수 있다면 그럴 수만 있다면 새하얀 빛으로 그댈 비춰 줄게요 그러다 밤이 찾아오면 우리 둘만의 비밀을 새겨요 추억할 그 밤 위에 갈피를 꽂고 선 남몰래 펼쳐보아요',
    contentanswer: '나의 자라나는 마음을 못 본채 꺾어 버릴 수는 없네 미련 남길바엔 그리워 아픈 게 나아 서둘러 안겨본 그 품은 따스할 테니 그러다 밤이 찾아오면 우리 둘만의 비밀을 새겨요 추억할 그 밤 위에 갈피를 꽂고 선 남몰래 펼쳐보아요 언젠가 또 그날이 온대도 우린 서둘러 뒤돌지 말아요 마주보던 그대로 뒷걸음치면서 서로의 안녕을 보아요 피고 지는 마음을 알아요 다시 돌아온 계절도 난 한 동안 새 활짝 피었다 질래 또 한번 영원히 그럼에도 내 사랑은 또 같은 꿈을 꾸고 그럼에도 꾸던 꿈을 미루진 않을래',
  },
  {
    contentquestion: '난 이렇게 지내요 그대 떠나간 그 자리에 그런대로 살아요 이제 무뎌진 마음이겨우 아무렇지 않은데 다시 오려 하나요',
    contentanswer: '다시 스미듯 그대가 나쁜 그대가 사랑한 그대가 돌아오려나 아스라이 떠난 그대 기억이 고스란히 남아 미워지잖아 그대 떠나 자리만 가지런히 남아 돌아와 아주 처음같이 나를 안아줘 지금 이 순간에 나의 그대여 변하지 않은 모습으로 다시 내게로 밀어 려 하지만 내가 좋아하던 그대 미소가 다시 스미듯 그대가 못된 그대가 사랑한 그대가 돌아오려나 아스라이 떠난 그대 기억이  스란히 남아 미워지잖아 그대 떠나간 빈자리만 가지런히 남아  돌아와 아주 처음같이 나를 안아줘 지금 이 순간에  나의 그대  하지  않은 모습으로 다시 내게로  지금 내 곁에  그대로 남아 처음같이  내게 사랑한다고 말을 해줘 내게  떠나가던 길 그 어  에도 내가 보여 후회뿐 이라고 돌아와 아주 처음같이 ',
  },  
  {
    contentquestion: '질문입니다',
    contentanswer: '답변입니다',
  },  
  {
    contentquestion: '질문입니다2',
    contentanswer: '답변입니다2',
  },  
  {
    contentquestion: '질문입니다3',
    contentanswer: '답변입니다3',
  },
];


export default function Infodisease(){
  const useGetData = () => {
    const [Disease, setDisease] = useState("");
    const [Imageurl, setImageurl] = useState("");
    const [Question, setQuestion] = useState("");
    const [authTokens, setAuthTokens] = useState("");
    const [select, setSelect] = useState(1);
    const {diseaseid} = useParams();
    const location = useLocation();

    const onClickone = () => {
      console.log("상세내용입니다.");

      setSelect(1);
    }

    const onClicktwo = () => {
      console.log("Q & A입니다.");

      setSelect(2);
    }

    //질문하기 부분 로그인 안하면 못들어가게 하는거 추가
    const getDisease = async () => {
      const postUrl = `/condition/${diseaseid}/`;
      await axios.get(postUrl)
      .then((response) => {
        setDisease(response.data);
        setImageurl(response.data.conditionMedia[0].img);
        console.log(response.data);
        console.log("성공");
      }).catch(function(error){
        console.log("실패");
      });
    }

    const getQuestion = async () => {
      const postUrl = `/condition/${diseaseid}/question/`;
      await axios.get(postUrl)
      .then((response) => {
        setQuestion(response.data);
        console.log(response.data);
        console.log("성공");
      }).catch(function(error){
        console.log("실패");
      });
    }

    useEffect(()=>{
      getDisease()
      getQuestion()
    },[]);  

    useEffect(() => {
      if (localStorage.getItem('token') !== null){
        setAuthTokens(true);
      }
      else {
        setAuthTokens(false);
      }
    }, [localStorage.getItem('token')])  

    return {
      Disease,
      onClickone,
      onClicktwo,
      select,
      Imageurl,
      location,
      Question,
      authTokens,
    }
  }
  
  const { Disease, onClickone, onClicktwo, select, Imageurl, location, Question, authTokens} = useGetData();

  return (
      <>
          <div>
              <Header />
              <br /><br /><br /><br /><br />
              <Wrapper>
                  <Container maxWidth={"xl"}>
                  <Grid container spacing={8}>
                      <Grid item xs={3.5}>
                      <img src={Imageurl}  width='100%' height='350px'/>
                        <br/> <br/> <br/>
                        <Typography variant="h2" gutterBottom component="div" align="center" style={{ textDecoration: 'none', color:'#168d63' }}>
                          {Disease.kr_name}
                        </Typography>
                        <Typography variant="h5" gutterBottom component="div" align="center" style={{ textDecoration: 'none', color:'#168d63' }}>
                          {Disease.eng_name}
                        </Typography>
                        <br/> <br/> <br/>
                        <Link to={`${location.pathname}/Question`} style={{ textDecoration: 'none' }}>
                          <Button 
                          style={{fontSize: "40px", textTransform: "none", width: "100%", height: "150px" }} 
                          variant="success">
                            질문하러 가기
                          </Button>
                        </Link>
                      </Grid>

                      <Grid item xs={8.5}>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1} style={{width: "100%"}}>
                          <ToggleButton id="tbg-radio-1" value={1} style={{fontSize: "40px"}} variant="success" onClick={onClickone}>
                            설명
                          </ToggleButton>
                          <ToggleButton id="tbg-radio-2" value={2} style={{fontSize: "40px"}} variant="success" onClick={onClicktwo}>
                            Q & A
                          </ToggleButton>
                        </ToggleButtonGroup>
                        <br/><br/><br/><br/>
                          {select === 1 ? (
                            /*
                            <Box sx={{ width: '100%'}}>
                              <Paper elevation={3}>
                                <Typography variant="h4" gutterBottom component="div" padding="20px 30px">
                                  {Disease.description}
                                </Typography>
                              </Paper>
                            </Box>
                            */
                            <Accordion >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>
                                  정의
                                </Typography>
                              </AccordionSummary>                  
                              <AccordionDetails align="center">

                              </AccordionDetails>                                
                            </Accordion>
                            )
                            :
                            (
                            <>
                            {QnaData.map((qnaitem) => (
                              <Accordion >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography>
                                    {qnaitem.contentquestion}
                                  </Typography>
                                </AccordionSummary>                  
                                <AccordionDetails align="center">
                                  <Link to={`${location.pathname}/qna/3`} style={{ textDecoration: 'none' }}>
                                    <Button 
                                      style={{fontSize: "20px", textTransform: "none", padding: "20px 40px" }} 
                                      variant="outline-success">
                                        Q&A 상세 페이지로
                                    </Button>
                                </Link>
                                </AccordionDetails>                                
                              </Accordion>
                            ))}
                            </>
                            )
                          }
                      </Grid>
                  </Grid> 
                  </Container>
              </Wrapper>
          </div>
      </>
    );
}