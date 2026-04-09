"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { MonthTheme } from "@/data/monthThemes";
import styles from "./HeroImage.module.css";

interface HeroImageProps {
  theme: MonthTheme;
  isFlipping: boolean;
  flipDir: "left" | "right";
}

const SEASON_PHRASES: Record<string, string> = {
  winter: "Embrace the quiet season",
  spring: "Let nature bloom",
  summer: "Chase the golden light",
  autumn: "Savor every falling leaf",
};

export default function HeroImage({ theme, isFlipping, flipDir }: HeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      image.style.transform = `scale(1.08) translate(${x * -12}px, ${y * -8}px)`;
    };

    const handleMouseLeave = () => {
      image.style.transform = "scale(1.05) translate(0, 0)";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.heroWrapper} ref={containerRef}>
      {/* Image with parallax container */}
      <div
        ref={imageRef}
        className={`${styles.heroImage} ${isFlipping ? styles[`flip-${flipDir}`] : ""}`}
      >
        <Image
          src={theme.imageSrc}
          alt={`${theme.name} landscape`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Month name and season phrase */}
      <div
        className={`${styles.monthLabel} ${isFlipping ? styles.labelFlipping : ""}`}
      >
        <span className={styles.seasonTag}>{theme.season}</span>
        <h2 className={styles.monthName}>{theme.name}</h2>
        <p className={styles.seasonPhrase}>{SEASON_PHRASES[theme.season]}</p>
      </div>

      {/* Decorative corner accent */}
      <div className={styles.cornerAccent} aria-hidden="true" />
    </div>
  );
}
