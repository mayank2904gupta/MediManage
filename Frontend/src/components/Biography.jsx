import React from 'react'

function Biography({imageUrl}) {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt="about biography" />
      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus dolorum accusamus eos optio iure a provident. Deleniti dignissimos consectetur voluptate facilis rem sapiente sequi, voluptates, repudiandae ex eius, sint praesentium cupiditate veniam at minima veritatis magnam culpa! Beatae ducimus quis id optio quam fugit rem fuga, rerum nostrum est adipisci!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, perspiciatis?</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, laboriosam! Dolor nam porro non dolores ratione quidem quos magnam asperiores rerum consectetur laborum, qui nesciunt fugit similique, facere velit labore. Temporibus voluptas obcaecati quas in?</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, sed.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography
