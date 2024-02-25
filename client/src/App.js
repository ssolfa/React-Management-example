import * as React from 'react';
import { Component } from 'react';
import CustomerAdd from './Components/CustomerAdd';
import Customer from '/Users/solmee/Desktop/react/management-example/client/src/Components/Customer.js';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//프로그래스바 라이브러리 추가하기
import CircularProgress from  '@material-ui/core/CircularProgress';


//cs적용하기
import {ThemeProvider, withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles=theme=>({
  root:{
    width:"100%",
    minWidth: 1080
  },
  //프로그래스바
  progress: {
    marginTop:"20%",
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});



/*
리액트의 component life cycle을 가지고 있다. 
1) constructor() 
2) componentWillMount()
3) render()
4) componentDidMount()
// props or state => 변경되는 경우에는 shouldComponentUpdate()함수가 사용되어서 실질적으로 다시 render 함수 불러와서 뷰 갱신한다. 
*/




//고객정보를 서버에 접속해서 가져올 수 있도록 해야한다. (데이터가 변경될 수 있음)
//props는 변경될 수 없는 데이터를 명시할때 사용 & state 는 변경될 수 있는 데이터를 명시할 때 사용한다. 
class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword:''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword:''
    });
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }
  // state={
  //   customers : "",
  //   //프로그래스바
  //   completed : 0 //퍼센트를 알려주는것
  // }

  //실제 api 서버에 접근하도록 하기 (componentDidMount : 데이터 받아오는 작업)
  componentDidMount(){
    //프로그래스 바
    this.timer=setInterval(this.progress, 20); //0.02초마다 한번씩 프로그래스 함수 실행되도록 설정 
    //컴포넌트 준비 완료
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
}

  //api 불러오기 (비동기적 수행)
  //const : 변수
  callApi = async() =>{
    const response = await fetch('/api/customers');//로컬호스트 접근
    const body = await response.json();
    return body;
  }
  


  //프로그래스 애니매이션 효과
  progress =() => {
    const {completed} =this.state;
    this.setState({completed:completed >=100 ? 0 : completed +1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render(){
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      })
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> 
      });
    }
    const {classes} =this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return(
      <div className={classes.root}>
         <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
            <Paper className={classes.paper}> 
              <Table className={classes.table}> 
                <TableHead>
                  <TableRow>
                    {/* {cellList.map( c =>{
                        return <TableCell className={classes.tableHead}> {c} </TableCell>
                    })} */}
                    {cellList.map((c, index) => ( // index를 이용하여 고유한 key 제공
                      <TableCell key={index} className={classes.tableHead}>{c}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                    {this.state.customers ? 
                      filteredComponents(this.state.customers) :
                    <TableRow>
                      <TableCell colSpan="6" align="center">
                        <CircularProgress className={classes.progress} variant="indeterminate" value={this.state.completed}/>
                      </TableCell>
                    </TableRow>
                    }
                </TableBody>
              </Table>
          </Paper>
        </div>

    );
  }
}

export default withStyles(styles)(App);