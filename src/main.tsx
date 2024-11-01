/*
 * @Author: xiaosihan 
 * @Date: 2022-08-20 17:08:13 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2023-03-28 19:18:24
 */
import hashHistory from '@hashHistory';
import ReactDOM from 'react-dom/client';
import { Route, Routes, unstable_HistoryRouter as Router } from 'react-router-dom';
import './index.css';
import 'antd-mobile/es/global';
import loadable from "@loadable/component";
import { Suspense } from 'react';
import { Spin } from 'antd';
import LoadingWapper from '@components/LoadingWapper';

const Home = loadable(() => import("./views/home/Home"));

const Root = window.Root || (window.Root = ReactDOM.createRoot(document.getElementById('root')!));

Root.render(
    <LoadingWapper >
        <Router history={hashHistory} >
                <Suspense fallback={<Spin size="large" />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
        </Router>
    </LoadingWapper>

);

//@ts-ignore
console.log("前端发版时间", process.env.BUILD_TIME);