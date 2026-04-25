import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: Readonly<ImgHTMLAttributes<HTMLImageElement>>) {
    return (
        <img {...props} src="/logo.svg" alt="Mini-POS logo" />
    );
}
