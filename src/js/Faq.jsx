import React, { useState, useEffect, useRef } from "react";
import Midashi from "./common/Midashi";
import BackgroundText from "./common/Backtext";
import data from "./common/data.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const faqs = data.faqs;
function FAQItem({ question, answer, isOpen, onToggle }) {
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  useEffect(() => {
    const question = questionRef.current;

    // GSAP アニメーションの設定
    gsap.fromTo(
      question,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: question,
          start: "top 90%", // セクションがビューポートの90%位置に来たら開始
          // toggleActions: "play pause resume reset",
        },
      }
    );
  }, []);
  useEffect(() => {
    const answer = answerRef.current;
    gsap.to(answer, {
      scale: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: answer,
        // toggleActions: "play pause resume reset",
      },
    });
  }, [isOpen]);
  return (
    <>
      <div className="faq_container">
        <p
          className={`faq-question ${
            isOpen ? "faq-questionon" : "faq-questionoff"
          }`}
          onClick={onToggle}
          ref={questionRef}
        >
          <span className="faq-q">Q</span>
          {question}
          <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
        </p>

        {isOpen && (
          <div className="faq-answer" ref={answerRef}>
            {answer.split(/(?<=[。])/).map((line, i) => (
              <React.Fragment key={i}>
                {line} <br />{" "}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const Faq = () => {
  const [active, handler] = useState(null);
  const sectionRef = useRef(null);

  const handle = (x) => {
    handler(active === x ? null : x);
  };
  useEffect(() => {
    const section = sectionRef.current;

    // GSAP アニメーションの設定
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // セクションがビューポートの80%位置に来たら開始
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
  return (
    <section ref={sectionRef} id="faq" className="faq">
      <Midashi x={8} />
      <BackgroundText x={5} />
      <div className="faq_box">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={active === index}
            onToggle={() => handle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Faq;
