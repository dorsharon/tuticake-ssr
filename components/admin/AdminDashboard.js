import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ProductsManagementTable from './ProductsManagementTable';
import http from '../../utils/HttpClient';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { AUTHORIZE_ADMIN_ACCESS, getFunctionUrl } from '../../utils/Firebase';

export default function AdminDashboard() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');

    const handleSubmit = async () => {
        const response = await http.post(getFunctionUrl(AUTHORIZE_ADMIN_ACCESS), {
            password: passwordValue,
        });
        setIsAuthorized(response.status === 200);
    };

    return (
        <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
            <Typography variant={'h2'}>ניהול האתר</Typography>

            {isAuthorized ? (
                <>
                    <ProductsManagementTable />
                </>
            ) : (
                <>
                    <TextField
                        placeholder={'Password'}
                        type={'password'}
                        value={passwordValue}
                        onChange={e => setPasswordValue(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </>
            )}
        </Grid>
    );
}
