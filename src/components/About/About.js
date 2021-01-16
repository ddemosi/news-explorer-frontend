import React from 'react';

const About = () => {
  return (
    <section className="about">
      <div className="about__width">
        <div className="about__image"></div>
        <div className="about__text-container">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            Danny is an electronic music producer, mix engineer, and web developer
            from Salt Lake City, Utah. While his first love is making dance music,
            Danny loves to program web apps, especially using front end frameworks
            like Vue 3 and ReactJS.
        </p>
          <p className="about__text">
            Danny is currently pursuing a career in tech working part-time for
            Adobe Systems as a security contractor. He's also building his own
            company with his brother, Matt, that builds web apps that assists
            people that are trying to pursue full-time careers as freelancers.
        </p>
        </div>
      </div>
    </section>
  );
}

export default About;