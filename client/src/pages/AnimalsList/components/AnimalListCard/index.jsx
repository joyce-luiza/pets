import { Carousel } from "antd";
import "remixicon/fonts/remixicon.css";
import styles from "./styles.module.css";
import moment from "moment";
import { useRef, useState } from "react";
import { ANIMAL_SEX } from "../../../../constants";

export default function AnimalListCard({
  name,
  birthDate,
  sex,
  city,
  state,
  files = [],
}) {
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handleAfterChange = (current) => {
    setCurrentIndex(current);
  };

  const getLifetime = (date) => {
    const inputDate = moment(date);
    const currentDate = moment();
    const years = currentDate.diff(inputDate, "years");
    const months = currentDate.diff(inputDate, "months");
    const days = currentDate.diff(inputDate, "days");

    if (years >= 1) {
      return `${years} ${years > 1 ? "anos" : "ano"}`;
    } else if (months >= 1) {
      const exactMonths = months % 12;
      return `${exactMonths} ${exactMonths > 1 ? "meses" : "mês"}`;
    } else {
      return `${days} ${days > 1 ? "dias" : "dia"}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselContainer}>
        {currentIndex > 0 && (
          <div
            className={styles.arrow}
            onClick={handlePrev}
            style={{ left: 10 }}
          >
            <i className="ri-arrow-left-s-line"></i>
          </div>
        )}

        <Carousel
          className={styles.carousel}
          ref={carouselRef}
          infinite={false}
          dotPosition="bottom"
          draggable
          afterChange={handleAfterChange}
        >
          {files.length &&
            files.map((file, index) => (
              <img
                src={file.fileUrl}
                key={`${name}-${index}`}
                alt={`${name} ${index}`}
              />
            ))}
        </Carousel>

        {currentIndex < 3 && files.length > 2 && (
          <div
            className={styles.arrow}
            onClick={handleNext}
            style={{ right: 10 }}
          >
            <i className="ri-arrow-right-s-line"></i>
          </div>
        )}
      </div>

      <div className={styles.detailsContainer}>
        <span className={styles.title}>{name}</span>

        <div className={styles.details}>
          <div className={styles.topicGroup}>
            <div className={styles.topic}>
              <i className="ri-calendar-line" style={{ color: "#4435ab" }}></i>
              <span>{getLifetime(birthDate)}</span>
            </div>

            <div className={styles.topic}>
              <i
                className={`${ANIMAL_SEX[sex] === ANIMAL_SEX.FEMALE ? "ri-women-line" : "ri-men-line"}`}
                style={{ color: "#4435ab" }}
              ></i>
              <span>{ANIMAL_SEX[sex]}</span>
            </div>
          </div>

          <div className={styles.topic}>
            <i className="ri-map-pin-2-line" style={{ color: "#4435ab" }}></i>
            <span>
              {city}, {state}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
