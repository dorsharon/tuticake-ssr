import http from '../../../utils/http';
import { getFunctionUrl } from '../../../utils/Firebase';
import { getCanUseWebp } from '../../../utils/BrowserSupport';

export default async (req, res) => {
    const result = await http.get(getFunctionUrl('getCupDessertExampleImages'), {
        webp: await getCanUseWebp(),
    });

    res.status(200).send(result);
};
