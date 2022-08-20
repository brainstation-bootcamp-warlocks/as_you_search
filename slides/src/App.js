import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import slides from './slides';
import './App.css';

const getImageStyle = (imageCount) => ({
  // width: `${String(800 / imageCount)}px`,
  height: '250px'
});

const Images = ({ images }) => {
  return (
    <header>
      {images.map(image => <img src={image} style={getImageStyle(images.length)}/>)}
    </header>
  );
}

const IntroSlide = (props) => {

  const {
    title,
    description,
    images
  } = props;

  return (
    <main>

      <h1>{title}</h1>
      <Images images={images}/>
      <section>
        <h4>
          {description}
        </h4>
      </section>
    </main>
  );
};

const QuestionSlide = (props) => {

  const {
    question,
    choices,
    images    
  } = props;

  return (
    <main>
      <Images images={images}/>
      <h1>{question}</h1>
      <section>
        <ul>
          {choices.map(choice => <li>{choice}</li>)}
        </ul>
      </section>
    </main>
  );
};

const Slide = (props) => {
  const {
    data: {
      type,
      title,
      description,
      question,
      choices,
      images,
      video,
    }
  } = props;

  if (type === 'intro') {
    return <IntroSlide title={title} description={description} images={images} />;
  } else if (type === 'question') {
    return <QuestionSlide question={question} choices={choices} images={images} />;
  } else if (type === 'video') {
    return <VideoSlide video={video} title={title} />;
  } else {
    return 'invalid slide!';
  }
};

const VideoSlide = ({ video, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <iframe
        width="1120"
        height="650"
        src={video}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      >
      </iframe>
    </div>
  )
};

function App() {

  const [state, setState] = useState({ slideIndex: 0 });

  const getNext = (slideIndex, setState, slidesCount) => () => {
    if (slideIndex === slidesCount - 1) {
      return;
    }
    setState({ slideIndex: slideIndex + 1 });
  };
  const getPrev = (slideIndex, setState, slides) => () => {
    if (slideIndex === 0) {
      return;
    }
    setState({ slideIndex: slideIndex - 1 });
  };

  const { slideIndex } = state;

  return (
    <div className="App">
      <header>
      </header>
      <button onClick={getPrev(state.slideIndex, setState)}>{"<-"}</button>
      <button onClick={getNext(state.slideIndex, setState, slides.length)}>{"->"}</button>
      <Slide slides={slides} slideIndex={slideIndex} data={slides[slideIndex]} />
    </div>
  );
}

export default App;
