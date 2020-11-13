import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../landing-page';
import AdminDashboard from '../admin/AdminDashboard';
import Index from '../cakes';
import CakeProductDetails from '../cakes/CakeProductDetails';
import CupDesserts from '../cup-desserts';
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
                <Index />
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
