import React, { useEffect, useState } from 'react';
import '../../../tailwind.css';
import Tooltip from '../Tooltip';
import styles from './CountDownTimer.module.css';

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
        <div className={styles.text2}>
          <p className={styles.text}>
            Gratulujemy! 
            <Tooltip message="Ten wyjątkowy prezent jest dostępny tylko raz na 3 miesiące. Nasze drzewko to unikalny i ponadczasowy prezent!">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-white text-black border border-gray-500 h-10 w-10 text-center text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 ml-2"
              >
                i
              </button>
            </Tooltip>
          </p>
          <p className={styles.text}>Już niedługo będziesz mieć możliwość obdarowania kolejnej osoby:</p>
          <span>
            {timeLeft.months}m:{formatTime(timeLeft.days)}d:{formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s
          </span>
        </div>
      )}
    </div>
  );
};

export default CountDownTimer;