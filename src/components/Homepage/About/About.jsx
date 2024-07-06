import React from "react";
import img from '../../../assets/About/hands.jpg';
import styles from "../About/About.module.css";

const About = () => {
  return (
    <div className={styles.aboutTitle}>
      <div>O nas</div>
      <div className={styles.container}>
        <div className={styles.img} alt="hands">
        </div>
        <div className={styles.paragraphs}>
        <p>Nasza firma to inicjatywa osób z&nbsp;pasją do&nbsp;przyrody i&nbsp;troską o&nbsp;naszą planetę. Wierzymy, że&nbsp;małe kroki mogą prowadzić do&nbsp;wielkich zmian, dlatego założyliśmy firmę, która umożliwia każdemu z&nbsp;Was zasadzenie drzewa jako wyjątkowego prezentu dla bliskich. Nasza misja to nie&nbsp;tylko sadzenie drzew, ale&nbsp;także budowanie świadomości ekologicznej i&nbsp;walka ze zmianami klimatycznymi. Razem tworzymy zielone oazy, które przynoszą korzyści nie tylko nam, ale&nbsp;i&nbsp;przyszłym pokoleniom. Dołącz do&nbsp;nas i&nbsp;wspólnie zróbmy coś dobrego dla naszej planety!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
