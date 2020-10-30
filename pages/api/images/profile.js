import http from '../../../utils/HttpClient';
import { getFunctionUrl } from '../../../utils/Firebase';
import { getCanUseWebp } from '../../../utils/BrowserSupport';

export default async (req, res) => {
    const result = (
        await http.get(getFunctionUrl('getProfileImage'), {
            webp: await getCanUseWebp(),
        })
    )[0];

    res.status(200).send(result);
};
