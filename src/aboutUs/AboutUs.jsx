import '../navbar/navbar.css'

const AboutUs=()=>{
    return(
        <div className='about_info'>
             <div className="about_us">
          <div className="details">
            <p className="title_para">ABOUT US</p>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut rerum
              ut officia temporibus repudiandae porro cumque laudantium tenetur
              quod inventore, dolores, iste magnam ad distinctio eveniet
              voluptatibus, corporis maiores neque? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Aperiam sapiente fugiat tenetur{" "}
              <br />
              <br /> delectus nisi atque debitis? Autem, incidunt dignissimos
              provident quod ut ullam sint neque est, eaque illum laudantium.
              Accusamus! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Mollitia voluptate quibusdam nam, repellendus numquam
              voluptatem expedita et libero magni non debitis molestias pariatur
              maxime quod deleniti corrupti sequi provident dolores?
            </p>
            <button className="readmore_btn">READ MORE</button>
          </div>
          <div className="image">
            <img src="./image/about-img.png" alt="" />
          </div>
        </div>

        </div>
    )
}
export default AboutUs