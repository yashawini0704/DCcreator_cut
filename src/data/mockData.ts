import { Film, Song } from '../types';

// Mock films data - will be replaced with actual data from database
export const films: Film[] = [
  {
    id: '1',
    film_id: 'DCF1',
    center: 'TNP',
    dc_film_url: 'https://drive.google.com/file/d/example1',
    votes: 0,
    favorites: 0,
  },
  {
    id: '2',
    film_id: 'DCF2',
    center: 'KOLLU',
    dc_film_url: 'https://drive.google.com/file/d/example2',
    votes: 0,
    favorites: 0,
  },
  {
    id: '3',
    film_id: 'DCF3',
    center: 'KAUP',
    dc_film_url: 'https://drive.google.com/file/d/example3',
    votes: 0,
    favorites: 0,
  },
  {
    id: '4',
    film_id: 'DCF4',
    center: 'VPM',
    dc_film_url: 'https://drive.google.com/file/d/example4',
    votes: 0,
    favorites: 0,
  },
];

// Mock songs data - will be replaced with actual data from database
export const songs: Song[] = [
  {
    id: '1',
    song_id: 'DCSO1',
    center: 'TNP',
    dc_song_url: 'https://drive.google.com/file/d/1oBiQAdn5n50hHFucmMnwgGgi4I1bdNZS/view?usp=drive_open',
    votes: 0,
    favorites: 0,
  },
  {
    id: '2',
    song_id: 'DCSO2',
    center: 'KOLLU',
    dc_song_url: 'https://drive.google.com/file/d/1DY5UGOUvf7fq9XG0aNglMfoju03rQRnn/view?usp=drivesdk',
    votes: 0,
    favorites: 0,
  },
  {
    id: '3',
    song_id: 'DCSO3',
    center: 'TNP',
    dc_song_url: 'https://drive.google.com/drive/folders/1H0T3PJ5W85ohRnjX76KsiV3G82SjUEcP',
    votes: 0,
    favorites: 0,
  },
  {
    id: '4',
    song_id: 'DCSO4',
    center: 'KOLLU',
    dc_song_url: 'https://drive.google.com/file/d/14-2uswBOQyUsXxvh-vqDs4c4b0szUbeC/view',
    votes: 0,
    favorites: 0,
  },
];