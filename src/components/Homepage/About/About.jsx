import React from "react";
import img from '../../../assets/About/hands.jpg';
import styles from "../About/About.module.css";

const About = () => {
  return (
    <div className={styles.aboutTitle}>
      <div>O nas</div>
      <div className={styles.container}>
        <div>
            <img src={img} alt="hands" className={styles.photo}/>
        </div>
        <div className={styles.paragraphs}>
        <p>Nasza firma to inicjatywa osób z pasją do przyrody i troską o naszą planetę. Wierzymy, że małe kroki mogą prowadzić do wielkich zmian, dlatego założyliśmy firmę, która umożliwia każdemu z Was zasadzenie drzewa jako wyjątkowego prezentu dla bliskich. Nasza misja to nie tylko sadzenie drzew, ale także budowanie świadomości ekologicznej i walka ze zmianami klimatycznymi. Razem tworzymy zielone oazy, które przynoszą korzyści nie tylko nam, ale i przyszłym pokoleniom. Dołącz do nas i wspólnie zróbmy coś dobrego dla naszej planety!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
