// src/constants/zodiacSigns.ts
import { ZodiacSign } from '../types/horoscope'

// 이미지 import
import ariesImg from '../assets/images/양자리@3x.png';
import taurusImg from '../assets/images/황소자리@3x.png';
import geminiImg from '../assets/images/쌍둥이자리@3x.png';
import cancerImg from '../assets/images/게자리@3x.png';
import leoImg from '../assets/images/사자자리@3x.png';
import virgoImg from '../assets/images/처녀자리@3x.png';
import libraImg from '../assets/images/천칭자리@3x.png';
import scorpioImg from '../assets/images/전갈자리@3x.png';
import sagittariusImg from '../assets/images/사수자리@3x.png';
import capricornImg from '../assets/images/염소자리@3x.png';
import aquariusImg from '../assets/images/물병자리@3x.png';
import piscesImg from '../assets/images/물고기자리@3x.png';

export const zodiacSigns: ZodiacSign[] = [
  { name: '양자리', image: ariesImg, period: '3/21~4/19' },
  { name: '황소자리', image: taurusImg, period: '4/20~5/20' },
  { name: '쌍둥이자리', image: geminiImg, period: '5/21~6/21' },
  { name: '게자리', image: cancerImg, period: '6/22~7/22' },
  { name: '사자자리', image: leoImg, period: '7/23~8/22' },
  { name: '처녀자리', image: virgoImg, period: '8/23~9/22' },
  { name: '천칭자리', image: libraImg, period: '9/23~10/22' },
  { name: '전갈자리', image: scorpioImg, period: '10/23~11/21' },
  { name: '사수자리', image: sagittariusImg, period: '11/22~12/21' },
  { name: '염소자리', image: capricornImg, period: '12/22~1/19' },
  { name: '물병자리', image: aquariusImg, period: '1/20~2/18' },
  { name: '물고기자리', image: piscesImg, period: '2/19~3/20' }
];