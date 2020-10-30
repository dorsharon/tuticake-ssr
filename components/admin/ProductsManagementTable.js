import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import http from '../../utils/HttpClient';
import { getFunctionUrl } from '../../utils/Firebase';

export default function ProductsManagementTable() {
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        const response = await http.get(getFunctionUrl(''));
        setProducts(response);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (products.length === 0) {
        return null;
    }

    return (
        <>
            <Typography variant={'h4'}>ניהול מוצרים</Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">שם (עברית)</TableCell>
                        <TableCell align="right">שם (אנגלית)</TableCell>
                        <TableCell align="right">תיאור (עברית)</TableCell>
                        <TableCell align="right">תיאור (אנגלית)</TableCell>
                        <TableCell align="right">מחיר</TableCell>
                        <TableCell align="right">חלבי</TableCell>
                        <TableCell align="right">ללא גלוטן</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.map(
                        ({
                            id,
                            nameHe,
                            nameEn,
                            descriptionHe,
                            descriptionEn,
                            price,
                            isDairy,
                            isGlutenFree,
                        }) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row">
                                    {nameHe}
                                </TableCell>
                                <TableCell align="right">{nameEn}</TableCell>
                                <TableCell align="right">{descriptionHe}</TableCell>
                                <TableCell align="right">{descriptionEn}</TableCell>
                                <TableCell align="right">{price}</TableCell>
                                <TableCell align="right">{isDairy}</TableCell>
                                <TableCell align="right">{isGlutenFree}</TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </>
    );
}
