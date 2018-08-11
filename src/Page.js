import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';

class Page extends React.Component{
    loginCheck(){
        let user = localStorage.getItem('user');
        console.log(user)
        return user;
    }
    render(){
        //登录判断
        //this.loginCheck();
        let url = this.loginCheck()!=null?'/app/dashboard/index':'/login';
        return(
            <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to={url} push />} />        
                <Route path="/app" component={App} />
                <Route path="/404" component={NotFound} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
            </Router>  
        )
    }
}


export default Page