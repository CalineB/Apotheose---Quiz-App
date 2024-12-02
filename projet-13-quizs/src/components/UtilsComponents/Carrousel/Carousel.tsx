import { useId, useState } from 'react';
import './styles.scss';
import { useAppSelector } from '../../../hooks/redux';

function Carousel({
  children,
  classname,
}: {
  children: JSX.Element[];
  classname?: string;
}) {
  const dark = useAppSelector((state) => state.dark.dark);
  const [style, setStyle] = useState({ transform: 'translateX(0%)' });
  const [value, setValue] = useState(0);
  const [nextValue, setNextValue] = useState(value + 1);
  const [prevValue, setPrevValue] = useState(value - 1);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [touchMove, setTouchMove] = useState<number | null>(null);

  const next = () => {
    if (nextValue < children.length) {
      setValue(nextValue);
      setStyle({ transform: `translateX(-${nextValue * 100}%)` });
      setNextValue(nextValue + 1);
      setPrevValue(prevValue + 1);
    } else {
      setValue(0);
      setStyle({ transform: `translateX(-0%)` });
      setNextValue(1);
      setPrevValue(-1);
    }
  };

  const prev = () => {
    if (prevValue > -1) {
      setValue(prevValue);
      setTimeout(() => {
        setStyle({ transform: `translateX(-${prevValue * 100}%)` });
      }, 100);
      setPrevValue(prevValue - 1);
      setNextValue(nextValue - 1);
    } else {
      setValue(children.length - 1);
      setTimeout(() => {
        setStyle({ transform: `translateX(-${(children.length - 1) * 100}%)` });
      }, 100);
      setPrevValue(children.length - 2);
      setNextValue(children.length);
    }
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return null;
    }
    const currentTouch = e.touches[0].clientX;
    setTouchMove(currentTouch);
  };
  const handleTouchEnd = () => {
    const touchDown = touchPosition;
    const currentTouch = touchMove;
    if (touchDown === null || currentTouch === null) {
      return null;
    }
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      next();
    }
    if (diff < -5) {
      prev();
    }
    setTouchPosition(null);
    return setTouchMove(null);
  };

  const childMap = children.map((child, index) => {
    return (
      <div
        key={index}
        style={{
          ...style,
          left: `${index * 100}%`,
          right: `${index * 100}%`,
        }}
        className="Carousel-Children"
        onTouchStart={(e) => {
          handleTouch(e);
        }}
        onTouchMove={(e) => {
          handleTouchMove(e);
        }}
        onTouchEnd={() => {
          handleTouchEnd();
        }}
      >
        {child}
      </div>
    );
  });

  const pagination = children.map((child, index) => {
    return (
      <span
        aria-label="pagination"
        key={Math.round(Math.random() * 30000)}
        className={`Carousel-Pagination ${index === value ? 'isActive' : ''} ${
          dark ? 'white' : ''
        }`}
      />
    );
  });

  return (
    <div className={`Carousel ${classname} ${dark ? 'text-white' : ''}`}>
      <button
        className="Carousel-prev"
        type="button"
        onClick={() => {
          prev();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      {childMap}
      <button
        className="Carousel-next"
        type="button"
        onClick={() => {
          next();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
      <div className="Carousel-pageContainer">{pagination}</div>
    </div>
  );
}

export default Carousel;
