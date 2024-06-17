import React, { useEffect, useState } from 'react';
import styles from '../CountDownTimer/CountDownTimer.module.css';

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [endTime] = useState(() => {
    const now = new Date();
    const endDate = new Date(now.setMonth(now.getMonth() + 3));
    return endDate.getTime();
  });

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = endTime - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
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
      <p>Gratulujemy! <span className={styles.info} data-tooltip="Ten wyjątkowy prezent jest dostępny tylko raz na 3 miesiące. Nasze drzewko to unikalny i ponadczasowy prezent!">i</span></p>
      <p className={styles.text}>Już niedługo będziesz mieć możliwość obdarowania kolejnej osoby:</p>
      <span>
        {timeLeft.months}m:{formatTime(timeLeft.days)}d:{formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s
      </span>
    </div>
  );
};

export default CountDownTimer;
