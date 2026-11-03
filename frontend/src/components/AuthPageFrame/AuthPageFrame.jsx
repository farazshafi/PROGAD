import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "../Header/Header";
import { ArrowUpRight, AudioLines } from "lucide-react";
import "./AuthPageFrame.css";

const copy = {
  login: { eyebrow: "WELCOME BACK", title: "Find your frequency.", note: "Your next favorite sound is just around the corner." },
  register: { eyebrow: "JOIN THE COMMUNITY", title: "Sound starts here.", note: "Create your account and make room for better listening." },
  otp: { eyebrow: "ONE LAST STEP", title: "You're almost in.", note: "Enter the verification code to continue securely." },
};

const AuthPageFrame = ({ variant, image, showHeader = true, children }) => {
  const reduceMotion = useReducedMotion();
  const pageCopy = copy[variant];

  return (
    <div className={`auth-screen auth-screen--${variant}`}>
      <div className="auth-screen__ambient auth-screen__ambient--one" />
      <div className="auth-screen__ambient auth-screen__ambient--two" />
      {showHeader && <Header />}
      <main className="auth-layout">
        {image && (
          <motion.aside
            className="auth-visual"
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <img src={image} alt="Premium headphones" />
            <div className="auth-visual__shade" />
            <div className="auth-visual__content">
              <div className="auth-mark"><AudioLines size={20} /> PROGAD</div>
              <span className="auth-visual__eyebrow">{pageCopy.eyebrow}</span>
              <h2>{pageCopy.title}</h2>
              <p>{pageCopy.note}</p>
              <span className="auth-visual__link">MADE FOR THE WAY YOU LISTEN <ArrowUpRight size={14} /></span>
            </div>
            <div className="auth-visual__orb" />
          </motion.aside>
        )}
        <motion.section
          className="auth-card"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: image && !reduceMotion ? 0.08 : 0 }}
        >
          {!image && (
            <div className="auth-card__brand"><AudioLines size={18} /> PROGAD</div>
          )}
          {children}
        </motion.section>
      </main>
      <div className="auth-screen__footer">PROGAD <span>·</span> LISTEN CLOSER</div>
    </div>
  );
};

export default AuthPageFrame;
