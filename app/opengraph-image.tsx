/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function opengraphImage() {
  return new ImageResponse(
    (
      <div className='relative' style={{ display: 'flex' }}>
        <img
          alt='Glossy-Gift'
          src={
            'https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/24/2022/06/boneka-beruang.jpg'
          }
        />
      </div>
    ),
    size
  );
}
