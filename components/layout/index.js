import React from 'react';
import UpperNavBar from './nav-bar/UpperNavBar';
import BottomNavBar from './nav-bar/BottomNavBar';
import Footer from './Footer';
import styled from 'styled-components';
import Router from './Router';

const MainLayoutWrapper = styled.div`
    display: grid;
    grid-template-rows: minmax(auto, 200px) 1fr 50px;
`;

const MainContent = styled.main`
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
`;

const MainLayout = () => (
    <MainLayoutWrapper>
        {/*<UpperNavBar />*/}

        <MainContent>
            {/*<Router />*/}
        </MainContent>

        <Footer />

        {/*<BottomNavBar />*/}
    </MainLayoutWrapper>
);

export default MainLayout;
