import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../landing-page';
import AdminDashboard from '../admin/AdminDashboard';
import Cakes from '../cakes/Cakes';
import CakeProductDetails from '../cakes/CakeProductDetails';
import CupDesserts from '../cup-desserts/CupDesserts';
import BoxSets from '../box-sets/BoxSets';

export default function Router() {
    return (
        <Switch>
            <Route exact path={'/'}>
                <LandingPage />
            </Route>

            <Route exact path={'/admin'}>
                <AdminDashboard />
            </Route>

            <Route exact path={'/products/cakes'}>
                <Cakes />
            </Route>

            <Route exact path={'/products/cakes/:productId'}>
                <CakeProductDetails />
            </Route>

            <Route exact path={'/products/cup-desserts'}>
                <CupDesserts />
            </Route>

            <Route exact path={'/products/box-sets'}>
                <BoxSets />
            </Route>
        </Switch>
    );
}
