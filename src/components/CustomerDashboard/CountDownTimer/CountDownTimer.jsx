import React, { useEffect, useState } from 'react';
import styles from './CountDownTimer.module.css';
import '../../../tailwind.css';
import {
  Ripple,
  Tooltip,
  initTWE,
} from "tw-elements";

initTWE({ Ripple, Tooltip });

const CountDownTimer = ({ latestOrderDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (latestOrderDate) {
      const startDate = new Date(latestOrderDate);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 3);
      if (endDate.getDate() !== startDate.getDate()) {
        endDate.setDate(0);
      }
      setEndTime(endDate.getTime());
    }
  }, [latestOrderDate]);

  const calculateTimeLeft = () => {
    if (!endTime) return {};

    const now = new Date().getTime();
    const difference = endTime - now;

    let timeLeft = {};
    if (difference > 0) {
      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      timeLeft = {
        months,
        days,
        hours,
        minutes,
        seconds,
      };
    } else {
      timeLeft = {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div className={styles.container}>
      {!latestOrderDate ? (
        <p className={styles.text}>Czekamy na Twoje pierwsze zamówienie!</p>
      ) : (
        <>
          <p>
            Gratulujemy! 
            <a
              href="#"
              className="inline-block rounded-full bg-white px-4 py-1 pb-1 pt-1 text-s font-bold leading-normal text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 ml-2"
              data-twe-toggle="tooltip"
              data-twe-placement="top"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              title="Ten wyjątkowy prezent jest dostępny tylko raz na 3 miesiące. Nasze drzewko to unikalny i ponadczasowy prezent!">
              i
            </a>
          </p>
          <p className={styles.text}>Już niedługo będziesz mieć możliwość obdarowania kolejnej osoby:</p>
          <span>
            {timeLeft.months}m:{formatTime(timeLeft.days)}d:{formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s
          </span>
        </>
      )}
    </div>
  );
};

export default CountDownTimer;