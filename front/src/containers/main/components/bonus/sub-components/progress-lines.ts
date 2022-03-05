import { IDesktopLineProps } from './progress-line';
import { IMobileLineProps } from './progress-line';

const DESKTOP_LINE: IDesktopLineProps[] = [
    {
        topPos: "50px",
        money: 0,
    }, 
    {
        topPos: "0px",
        leftPos: "23%",
        imgLine: "./images/main/bonus/line.png",
        percent: "+0.3%",
        money: 500,
    },
    {
        topPos: "0px",
        leftPos: "48%",
        imgLine: "./images/main/bonus/line.png",
        percent: "+0.5%",
        money: 1500,
    },
    {
        topPos: "0px",
        leftPos: "73%",
        imgLine: "./images/main/bonus/line.png",
        percent: "+1.3%",
        money: 2500,
    },
    {
        topPos: "40px",
        leftPos: "97%",
        percent: "+1.5%",
        money: 5000,
    },
];

const MOBILE_LINE: IMobileLineProps[] = [
    {
        money: 0,
        margin: '1rem 0',
    }, 
    {
        percent: "+0.3%",
        money: 500,
        margin: '1.3rem 0',
    },
    {
        percent: "+0.5%",
        money: 1500,
        margin: '1.3rem 0',
    },
    {
        percent: "+1.3%",
        money: 2500,
        margin: '1.3rem 0',
    },
    {
        percent: "+1.5%",
        money: 5000,
        margin: '0.7rem 0',
    },
];

export { DESKTOP_LINE, MOBILE_LINE }