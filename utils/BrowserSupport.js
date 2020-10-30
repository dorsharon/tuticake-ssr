let canUseWebp = null;

export const getCanUseWebp = async () => {
    return new Promise(resolve => {
        if (canUseWebp !== null) {
            resolve(canUseWebp);
        }

        const image = new Image();
        image.onload = () => {
            canUseWebp = true;
            resolve(true);
        };
        image.onerror = () => {
            canUseWebp = false;
            resolve(false);
        };
        image.src = 'http://www.gstatic.com/webp/gallery/1.webp';
    });
};
