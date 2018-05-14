import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Image for testing</h2>
        <picture style={{ display: 'block' }}>
          <source
            srcSet="https://cdn-us-cf2.yottaa.net/555a305b2bb0ac71b9002d22/8da650303f06013513b1026173a6dedd.yottaa.net/v~22.e5.0.0/Simon%20Website/ABOUT/845/2000x400.jpg?yocs=q_&amp;yoloc=us"
            media="(min-width: 2000px)"
          />
          <source
            srcSet="https://cdn-us-cf2.yottaa.net/555a305b2bb0ac71b9002d22/8da650303f06013513b1026173a6dedd.yottaa.net/v~22.e5.0.0/Simon%20Website/ABOUT/845/1200x400.jpg?yocs=q_&amp;yoloc=us"
            media="(min-width: 1200px)"
          />
          <source
            srcSet="https://cdn-us-cf2.yottaa.net/555a305b2bb0ac71b9002d22/8da650303f06013513b1026173a6dedd.yottaa.net/v~22.e5.0.0/Simon%20Website/ABOUT/845/1024x400.jpg?yocs=q_&amp;yoloc=us"
            media="(min-width: 1024px)"
          />
          <source
            srcSet="https://cdn-us-cf2.yottaa.net/555a305b2bb0ac71b9002d22/8da650303f06013513b1026173a6dedd.yottaa.net/v~22.e5.0.0/Simon%20Website/ABOUT/845/992x400.jpg?yocs=q_&amp;yoloc=us"
            media="(min-width: 992px)"
          />
          <source
            srcSet="https://cdn-us-cf2.yottaa.net/555a305b2bb0ac71b9002d22/8da650303f06013513b1026173a6dedd.yottaa.net/v~22.e5.0.0/Simon%20Website/ABOUT/845/768x300.jpg?yocs=q_&amp;yoloc=us"
            media="(min-width: 768px)"
          />
          <img
            src="https://cdn-us-cf2.yottaa.net/555a305b2bb0ac71b9002d22/8da650303f06013513b1026173a6dedd.yottaa.net/v~22.e5.0.0/Simon%20Website/ABOUT/845/320x300.jpg?yocs=q_&amp;yoloc=us"
            alt="King of Prussia®"
            className="img-full"
          />
        </picture>
      </div>
      <button type="button">Button for Tab Testing</button>
    </div>
  );
};

export default Home;
