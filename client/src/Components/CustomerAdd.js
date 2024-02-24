import React from "react";
import axios from 'axios'; // axios 전체를 import

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null, // byte 형태를 의미
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''  // 얘가 파일명
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault(); // 데이터가 서버로부터 전달될 때 오류 방지
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:''
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () =>{
        const url =  '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        // 파일이 포함된 데이터를 보낼 땐 웹 표준에 맞게 바꿔줘야 함!
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return axios.post(url, formData, config); // axios.post를 사용하여 POST 요청을 보냄
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                <br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input>
                <br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input>
                <br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></input>
                <br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input>
                <br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;
