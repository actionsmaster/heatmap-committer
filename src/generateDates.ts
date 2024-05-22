import { createCanvas, loadImage } from 'canvas';
import * as fs from 'fs';
import { format, addDays } from 'date-fns';

const width = 53; // 53 weeks
const height = 7; // 7 days

const text = '9AM 9PM';
const startDate = new Date('2023-01-01');

const generateDates = (text: string, startDate: Date) => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'black';
    ctx.font = '6px sans-serif';
    ctx.fillText(text, 0, 6);

    const imageData = ctx.getImageData(0, 0, width, height);
    const dates: Date[] = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            if (imageData.data[index] === 0) {
                const day = y + x * 7;
                const date = addDays(startDate, day);
                dates.push(date);
            }
        }
    }

    return dates;
};

const dates = generateDates(text, startDate);
const formattedDates = dates.map(date => format(date, "yyyy-MM-dd'T'HH:mm:ss"));
fs.writeFileSync('dates.txt', formattedDates.join('\n'));

console.log('Dates generated and saved to dates.txt');
